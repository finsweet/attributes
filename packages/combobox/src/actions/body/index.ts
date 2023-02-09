import type { Settings } from '../../utils/types';

/**
 * This handles mouse movements on the body element and manipulates dropdown list pointer events.
 * @param e MouseEvent
 * @param  settings {@link Settings}
 */
export const handleBodyMouseMovements = (e: MouseEvent, settings: Settings) => {
  if (settings.navListElement.style.pointerEvents === 'none') {
    settings.navListElement.style.pointerEvents = 'auto';
  }
};
