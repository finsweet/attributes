/**
 * Rotates an arrow element based on its placement.
 * @param {HTMLElement} arrowElement - The arrow element to rotate.
 * @param {string} placement - The placement of the arrow ('top', 'bottom', 'left', 'right').
 */
export const rotateArrow = (arrowElement: HTMLElement, placement: 'top' | 'bottom' | 'left' | 'right') => {
  switch (placement) {
    case 'top':
      arrowElement.style.transform = 'rotate(0deg)';
      break;
    case 'bottom':
      // No rotation needed, as the default is pointing down
      arrowElement.style.transform = 'rotate(180deg)';
      break;
    case 'left':
      arrowElement.style.transform = 'rotate(-90deg)';
      break;
    case 'right':
      arrowElement.style.transform = 'rotate(90deg)';
      break;
    default:
      console.error('Invalid placement');
  }
};
