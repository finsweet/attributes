import { arrow, autoUpdate, computePosition, flip, offset, type Placement, shift } from '@floating-ui/dom';

import { type TooltipInstance, type TooltipOptions } from '../utils';
import { hideTooltip, showTooltip } from './controls';

// Global reference to the currently visible tooltip
let currentVisibleTooltip: { hide: () => Promise<void> } | null = null;

/**
 * Sets up a tooltip with the specified configuration.
 *
 * @param target - The element that triggers the tooltip.
 * @param tooltip - The tooltip element that is displayed.
 * @param arrowElement - The arrow element within the tooltip.
 * @returns {TooltipInstance} An object containing the tooltip elements and a cleanup function.
 */
export const setupTooltip = (
  target: HTMLElement,
  tooltip: HTMLElement,
  options: TooltipOptions,
  arrowElement?: HTMLElement | null
): TooltipInstance => {
  const placement = 'top' as Placement;
  const arrowPadding = '0';
  const trigger = 'hover';
  const triggerout = 'hover';

  const normalizedArrowPadding = Number(arrowPadding) || 0;

  // setup floating ui middleware
  const middleware = [
    offset(10),
    flip(),
    shift({ padding: 5 }),
    arrowElement ? arrow({ element: arrowElement, padding: normalizedArrowPadding }) : undefined,
  ].filter(Boolean);

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
        });
      }
    });
  };

  const tooltipTrigger = {
    show: () => {
      return showTooltip(options.animation, options.easing, options.duration, tooltip, update);
    },
    hide: () => {
      return hideTooltip(options.animation, options.easing, options.duration, tooltip);
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
    [tooltip, arrowElement].filter(Boolean).forEach((element) => {
      if (!element) return;

      element.addEventListener('mouseenter', async () => {
        await hide();
      });
    });
  }
};
