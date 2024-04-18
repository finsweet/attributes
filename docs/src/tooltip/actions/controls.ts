import { animations, type Easings } from '@finsweet/attributes-utils';

/**
 * Updates accessibility attributes for the tooltip.
 * @param tooltip The tooltip element to be positioned.
 * @param isVisible Whether the tooltip is visible or not.
 */
const updateTooltipAccessibility = (tooltip: HTMLElement, isVisible: boolean) => {
  tooltip.setAttribute('aria-hidden', `${!isVisible}`);
};

// Utility function to hide all tooltips
const hideAllTooltips = async () => {
  const allTooltips = document.querySelectorAll<HTMLDivElement>('[helper-tooltip]');
  for (const tooltip of allTooltips) {
    tooltip.setAttribute('aria-hidden', 'true');
    tooltip.style.display = 'none';
    // await hideTooltip('fadeOut', 'ease', 300, tooltip as HTMLElement);
  }
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
  await hideAllTooltips();

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
