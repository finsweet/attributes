import { animations, type Easings, isNotEmpty, normalizeNumber } from '@finsweet/attributes-utils';
import { arrow, autoUpdate, computePosition, flip, offset, type Placement, shift } from '@floating-ui/dom';

import { getAttribute, type GlobalSettings, rotateArrow, type TooltipInstance } from '../utils';
import { hideTooltip, showTooltip } from './controls';
import { setupVirtualTooltip } from './setupVirtualTooltip';

// Global reference to the currently visible tooltip
let currentVisibleTooltip: { hide: () => Promise<void> } | null = null;

/**
 * Sets up a tooltip with the specified configuration.
 *
 * @param target - The element that triggers the tooltip.
 * @param tooltip - The tooltip element that is displayed.
 * @param arrowElement - The arrow element within the tooltip.
 * @param globalSettings - Global settings for the tooltip behavior and appearance.
 * @returns {TooltipInstance} An object containing the tooltip elements and a cleanup function.
 */
export const setupTooltip = (
  target: HTMLElement,
  tooltip: HTMLElement,
  globalSettings: GlobalSettings,
  arrowElement?: HTMLElement | null
): TooltipInstance => {
  const virtual = getAttribute(target, 'virtual') === 'true' || globalSettings.virtual === 'true';
  const animation = (getAttribute(target, 'animation') || globalSettings.animation) as keyof typeof animations;
  const animationEasing = ((getAttribute(target, 'easing') || globalSettings.easing) as Easings[number]) || undefined;
  const animationDuration = Number(getAttribute(target, 'duration') || globalSettings.duration) || undefined;

  if (virtual) {
    const cleanup = setupVirtualTooltip(target, tooltip, animation, animationEasing, animationDuration);

    return { target, tooltip, arrowElement: undefined, cleanup };
  }

  const arrowLen = arrowElement ? arrowElement.offsetWidth : 0;
  const floatingOffset = Math.sqrt(2 * arrowLen ** 2) / 2;
  const placement = (getAttribute(target, 'placement') || globalSettings.placement || 'top') as Placement;
  const arrowPadding = getAttribute(target, 'padding') || globalSettings.padding || '0';
  const offsetValue = getAttribute(target, 'offset') || globalSettings.offset || `${floatingOffset}`;
  const trigger = getAttribute(target, 'trigger') || globalSettings.trigger || 'hover';
  const triggerout = getAttribute(target, 'triggerout') || globalSettings.triggerout || 'hover';
  const canFlip = getAttribute(target, 'flip') === 'true' || globalSettings.flip === 'true';

  // popup needs a width value https://floating-ui.com/docs/computeposition#initial-layout
  tooltip.style.width = 'max-content';
  const normalizedArrowPadding = normalizeNumber(arrowPadding) || 0;

  // setup floating ui middleware
  const middleware = [
    offset(normalizeNumber(offsetValue)),
    canFlip
      ? flip({
          fallbackAxisSideDirection: 'start',
          fallbackStrategy: 'bestFit',
        })
      : undefined,
    shift({ padding: 5 }),
    arrowElement ? arrow({ element: arrowElement, padding: normalizedArrowPadding }) : undefined,
  ].filter(isNotEmpty);

  const update = () => {
    computePosition(target, tooltip, {
      placement,
      middleware,
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (!arrowElement) return;

      const position = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[position] as 'top' | 'right' | 'bottom' | 'left';

      if (middlewareData.arrow) {
        const { x, y } = middlewareData.arrow;
        Object.assign(arrowElement.style, {
          left: x != null ? `${x}px` : '',
          top: y != null ? `${y}px` : '',
          [staticSide]: `${-(arrowElement.offsetWidth + normalizedArrowPadding) / 2}px`,
          transform: rotateArrow(position),
        });
      }
    });
  };

  const tooltipTrigger = {
    show: () => {
      return showTooltip(animation, animationEasing, animationDuration, tooltip, update);
    },
    hide: () => {
      return hideTooltip(animation, animationEasing, animationDuration, tooltip);
    },
  };

  setupTooltipEvents(target, tooltip, tooltipTrigger.show, tooltipTrigger.hide, trigger, triggerout, arrowElement);

  const cleanup = autoUpdate(target, tooltip, update);

  return { target, tooltip, arrowElement, cleanup };
};

/**
 * Attaches event listeners to the target and tooltip elements.
 * @param target The target element that triggers the tooltip.
 * @param tooltip The tooltip element.
 * @param showTooltip Function to show the tooltip.
 * @param hideTooltip Function to hide the tooltip.
 * @param trigger The event that triggers the tooltip.
 * @param triggerout The event that hides the tooltip.
 * @param arrow The arrow element within the tooltip.
 */
const setupTooltipEvents = (
  target: HTMLElement,
  tooltip: HTMLElement,
  showTooltip: () => Promise<void>,
  hideTooltip: () => Promise<void>,
  trigger = 'hover',
  triggerout = 'hover',
  arrowElement?: HTMLElement | null
): void => {
  // Show tooltip logic
  const show = async () => {
    // Hide any currently visible tooltip
    if (currentVisibleTooltip && currentVisibleTooltip.hide !== hideTooltip) {
      await currentVisibleTooltip.hide();
    }
    await showTooltip();
    currentVisibleTooltip = { hide: hideTooltip };
  };

  // Hide tooltip logic
  const hide = async () => {
    if (currentVisibleTooltip && currentVisibleTooltip.hide === hideTooltip) {
      await hideTooltip();
      currentVisibleTooltip = null;
    }
  };

  // Setup event listeners based on trigger and triggerout
  if (trigger === 'click') {
    target.addEventListener('click', show);
  } else {
    target.addEventListener('mouseenter', show);
  }

  if (triggerout === 'click') {
    document.addEventListener('click', async (event) => {
      if (!target.contains(event.target as Node) && !tooltip.contains(event.target as Node)) {
        await hide();
      }
    });
  } else {
    target.addEventListener('mouseleave', hide);
  }

  if (triggerout === 'hover') {
    [tooltip, arrowElement].filter(isNotEmpty).forEach((element) => {
      if (!element) return;

      element.addEventListener('mouseenter', async () => {
        await hide();
      });
    });
  }
};
