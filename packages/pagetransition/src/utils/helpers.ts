/**
 * Creates and appends an overlay element to the document body.
 * @returns The created overlay element.
 */
export const createOverlay = () => {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = '9999';
  overlay.style.background = 'black';
  overlay.style.pointerEvents = 'none';

  overlay.setAttribute('data-testid', 'overlay');

  document.body.appendChild(overlay);

  return overlay;
};
