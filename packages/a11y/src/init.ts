import { A11Y_ATTRIBUTE } from 'global/constants/attributes';

import { observeAriaControls } from './actions/aria-controls';
import { emitClickEvents } from './actions/keyboard';

/**
 * Inits the attribute.
 */
export const init = (): void => {
  emitClickEvents();
  observeAriaControls();

  window.fsAttributes[A11Y_ATTRIBUTE].resolve?.(undefined);
};
