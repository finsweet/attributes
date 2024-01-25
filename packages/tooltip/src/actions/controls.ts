import { animations, type Easings } from '@finsweet/attributes-utils';

/**
 * Updates accessibility attributes for the tooltip.
 * @param tooltip The tooltip element to be positioned.
 * @param isVisible Whether the tooltip is visible or not.
 */
const updateTooltipAccessibility = (tooltip: HTMLElement, isVisible: boolean) => {
  tooltip.setAttribute('aria-hidden', `${!isVisible}`);
};

/**
 * Shows the tooltip with the specified animation if any.
 * @param animation
 * @param tooltip
 * @param func
 * @returns
 */
export const showTooltip = async (
  animation: keyof typeof animations,
  easing: Easings[number] | undefined,
  duration: number | undefined,
  tooltip: HTMLElement,
  func?: () => void
) => {
  if (!animation) {
    tooltip.style.display = 'block';
    updateTooltipAccessibility(tooltip, true);

    if (func) func();

    return;
  }

  animations[animation].prepareIn(tooltip, { display: 'block' });
  await animations[animation].animateIn(tooltip, { display: 'block', duration, easing });
  updateTooltipAccessibility(tooltip, true);

  if (func) func();
};

/**
 * Hides the tooltip with the specified animation if any.
 * @param animation
 * @param tooltip
 * @returns
 */
export const hideTooltip = async (
  animation: keyof typeof animations,
  easing: Easings[number] | undefined,
  duration: number | undefined,
  tooltip: HTMLElement
) => {
  if (!animation) {
    tooltip.style.display = 'none';
    updateTooltipAccessibility(tooltip, false);

    return;
  }

  await animations[animation].animateOut(tooltip, { display: 'none', duration, easing });
  updateTooltipAccessibility(tooltip, false);
};
