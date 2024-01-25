import type { animations, Easings } from '@finsweet/attributes-utils';
import { computePosition, flip, offset, shift } from '@floating-ui/dom';

import { hideTooltip, showTooltip } from './controls';

let tooltipOpen = false; // Moved outside the function to maintain state across events

/**
 * Updates the position of the tooltip based on mouse coordinates and shows it.
 * @param clientX The X coordinate of the mouse.
 * @param clientY The Y coordinate of the mouse.
 * @param target The target element to which the tooltip is attached.
 * @param tooltip The tooltip element to be positioned.
 * @param animation The animation type for showing and hiding the tooltip.
 */
const updateTooltipPosition = (
  clientX: number,
  clientY: number,
  tooltip: HTMLElement,
  animation: keyof typeof animations,
  easing: Easings[number] | undefined,
  duration: number | undefined
) => {
  const virtualEl = {
    getBoundingClientRect: () => ({
      width: 0,
      height: 0,
      x: clientX,
      y: clientY,
      left: clientX,
      right: clientX,
      top: clientY,
      bottom: clientY,
    }),
  };

  computePosition(virtualEl, tooltip, {
    placement: 'right-start',
    middleware: [offset(5), flip(), shift()],
  }).then(({ x, y }) => {
    Object.assign(tooltip.style, {
      top: `${y}px`,
      left: `${x}px`,
    });
  });

  if (!tooltipOpen) {
    showTooltip(animation, easing, duration, tooltip);
    tooltipOpen = true;
  }
};

/**
 * Sets up the virtual tooltip for the target element. Adds mouse event listeners
 * for positioning and showing/hiding the tooltip.
 * @param target The target element to which the tooltip is attached.
 * @param tooltip The tooltip element.
 * @param animation The animation type for showing and hiding the tooltip.
 * @returns A function to clean up the event listeners.
 */
export const setupVirtualTooltip = (
  target: HTMLElement,
  tooltip: HTMLElement,
  animation: keyof typeof animations,
  easing: Easings[number] | undefined,
  duration: number | undefined
) => {
  const mouseMoveHandler = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    updateTooltipPosition(clientX, clientY, tooltip, animation, easing, duration);
  };

  const mouseLeaveHandler = () => {
    hideTooltip(animation, easing, duration, tooltip);
    tooltipOpen = false;
  };

  target.addEventListener('mousemove', mouseMoveHandler);
  target.addEventListener('mouseleave', mouseLeaveHandler);

  return () => {
    target.removeEventListener('mousemove', mouseMoveHandler);
    target.removeEventListener('mouseleave', mouseLeaveHandler);
  };
};
