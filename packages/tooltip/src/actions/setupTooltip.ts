import { animations, isNotEmpty, normalizeNumber } from '@finsweet/attributes-utils';
import { arrow, autoUpdate, computePosition, flip, offset, type Placement, shift } from '@floating-ui/dom';

import { getAttribute, type GlobalSettings, rotateArrow, type TooltipInstance } from '../utils';

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
  arrowElement?: HTMLElement
): TooltipInstance => {
  const animation = (getAttribute(target, 'animation') || globalSettings.animation) as keyof typeof animations;
  const placement = (getAttribute(target, 'placement') || globalSettings.placement || 'top') as Placement;
  const offsetValue = getAttribute(target, 'offset') || globalSettings.offset;
  const listener = getAttribute(target, 'listener') || globalSettings.listener || 'hover';
  const canFlip = getAttribute(target, 'flip') === 'true' || globalSettings.flip === 'true';

  // popup needs a width value https://floating-ui.com/docs/computeposition#initial-layout
  tooltip.style.width = 'max-content';

  // setup floating ui middleware
  const middleware = [
    offset(offsetValue ? normalizeNumber(offsetValue) : 6),
    canFlip
      ? flip({
          fallbackAxisSideDirection: 'start',
          fallbackStrategy: 'bestFit',
        })
      : undefined,
    shift({ padding: 5 }),
    arrowElement ? arrow({ element: arrowElement }) : undefined,
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

      const { x: arrowX, y: arrowY } = middlewareData.arrow as { x: number; y: number };

      const position = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';

      if (position) {
        rotateArrow(arrowElement, position);
      }

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[position];

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
    if (!animation) {
      tooltip.style.display = 'block';

      update();

      return;
    }

    animations[animation].prepareIn(tooltip, { display: 'block' });
    await animations[animation].animateIn(tooltip, { display: 'block' });

    update();
  };

  const hideTooltip = async () => {
    if (!animation) {
      tooltip.style.display = 'none';

      return;
    }

    await animations[animation].animateOut(tooltip, { display: 'none' });
  };

  const options = [
    listener === 'click' ? ['click', showTooltip] : undefined,
    listener === 'hover' ? ['mouseenter', showTooltip] : undefined,
    // ['focus', showTooltip],
    ['mouseleave', hideTooltip],
    ['blur', hideTooltip],
  ].filter(isNotEmpty);

  options.forEach(([event, listener]) => {
    target.addEventListener(
      event as string,

      listener as EventListener
    );
  });

  const cleanup = autoUpdate(target, tooltip, update);

  return { target, tooltip, arrowElement, cleanup };
};
