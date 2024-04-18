/**
 * Rotates an arrow element based on its placement.
 * @param {string} placement - The placement of the arrow ('top', 'bottom', 'left', 'right').
 */
export const rotateArrow = (placement: 'top' | 'bottom' | 'left' | 'right') => {
  if (placement === 'top') return 'rotate(0deg)';
  if (placement === 'bottom') return 'rotate(180deg)';
  if (placement === 'left') return 'rotate(-90deg)';
  if (placement === 'right') return 'rotate(90deg)';

  return 'rotate(0deg)';
};
