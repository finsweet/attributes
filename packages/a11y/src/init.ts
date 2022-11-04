import {
  A11Y_ATTRIBUTE,
  ACCORDION_ATTRIBUTE,
  CMS_ATTRIBUTE_ATTRIBUTE,
  INPUT_COUNTER_ATTRIBUTE,
  MODAL_ATTRIBUTE,
} from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { observeAriaControls } from './actions/aria-controls';
import { handleKeyboardEvents } from './actions/keyboard';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE, MODAL_ATTRIBUTE, INPUT_COUNTER_ATTRIBUTE, ACCORDION_ATTRIBUTE);

  const keyboardCleanup = handleKeyboardEvents();
  const observersCleanup = observeAriaControls();

  return finalizeAttribute(A11Y_ATTRIBUTE, undefined, () => {
    keyboardCleanup();
    observersCleanup();
  });
};
