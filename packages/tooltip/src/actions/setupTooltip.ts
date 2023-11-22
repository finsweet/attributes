import { animations, isNotEmpty } from '@finsweet/attributes-utils';
import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

import { getAttribute, type TooltipInstance } from '../utils';

/**
 * Sets up a tooltip with the specified configuration.
 *
 * @param toggle - The element that triggers the tooltip.
 * @param tooltip - The tooltip element that is displayed.
 * @param arrowElement - The arrow element within the tooltip.
 * @param globalSettings - Global settings for the tooltip behavior and appearance.
 * @returns {TooltipInstance} An object containing the tooltip elements and a cleanup function.
 */
export const setupTooltip = (
  toggle: HTMLElement,
  tooltip: HTMLElement,
  arrowElement: HTMLElement,
  globalSettings: any
): TooltipInstance => {
  const animation: keyof typeof animations = globalSettings.animation || 'fade';
  const placement = getAttribute(toggle, 'placement') || globalSettings.placement || 'top';
  const offsetValue = getAttribute(toggle, 'offset') || globalSettings.offset || 6;
  const listener = getAttribute(toggle, 'listener') || globalSettings.listener || 'hover';
  const canFlip = getAttribute(toggle, 'flip') === 'true' || globalSettings.flip;

  // setup floating ui middleware
  const middleware = [
    offset(offsetValue),
    canFlip
      ? flip({
          fallbackAxisSideDirection: 'start',
          fallbackStrategy: 'bestFit',
        })
      : undefined,
    arrow({ element: arrowElement }),
  ].filter(isNotEmpty);

  const update = () => {
    computePosition(toggle, tooltip, {
      placement,
      middleware,
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      // Accessing the arrow data
      const { x: arrowX, y: arrowY } = middlewareData.arrow as { x: number; y: number };

      const staticSide =
        {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]] || 'bottom';

      Object.assign(arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px',
      });
    });
  };

  const showTooltip = async () => {
    animations[animation].prepareIn(tooltip, { display: 'block' });
    await animations[animation].animateIn(tooltip, { display: 'block' });

    update();
  };

  const hideTooltip = async () => {
    await animations[animation].animateOut(tooltip, { display: 'none' });
  };

  const options = [
    listener === 'click' ? ['click', showTooltip] : undefined,
    listener === 'hover' ? ['mouseenter', showTooltip] : undefined,
    listener === 'hover' ? ['mouseleave', hideTooltip] : undefined,
    listener === 'hover' ? ['focus', showTooltip] : undefined,
    ['blur', hideTooltip],
  ].filter(isNotEmpty);

  options.forEach(([event, listener]) => {
    toggle.addEventListener(
      event as string,

      listener as EventListener
    );
  });

  const cleanup = autoUpdate(toggle, tooltip, update);

  return { toggle, tooltip, arrowElement, cleanup };
};
