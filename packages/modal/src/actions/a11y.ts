import { isVisible } from '@finsweet/ts-utils';

import {
  ARIA_CONTROLS_KEY,
  ARIA_EXPANDED_KEY,
  ARIA_HASPOPUP_KEY,
  ARIA_HIDDEN_KEY,
  ARIA_MODAL_KEY,
  ARIA_MODAL_VALUES,
  ARIA_ROLE_KEY,
  ARIA_ROLE_VALUES,
  ARIA_ROLEDESCRIPTION_KEY,
  TABINDEX_KEY,
} from '$global/constants/a11y';
import { ensureUniqueId } from '$global/helpers';

/**
 * Sets A11Y Attributes to a modal.
 * @param modalElement
 * @param openTriggers
 * @param closeTriggers
 */
export const setModalA11Y = (modalElement: HTMLElement, openTriggers: Element[], closeTriggers: Element[]) => {
  const modalId = ensureUniqueId(modalElement);
  const expanded = isVisible(modalElement);

  modalElement.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.dialog);
  modalElement.setAttribute(ARIA_MODAL_KEY, ARIA_MODAL_VALUES.true);

  for (const trigger of [...openTriggers, ...closeTriggers]) {
    if (trigger.hasAttribute(ARIA_HIDDEN_KEY)) continue;

    ensureUniqueId(trigger);

    const action = openTriggers.includes(trigger) ? 'open' : 'close';

    trigger.setAttribute(TABINDEX_KEY, '0');
    trigger.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.button);
    trigger.setAttribute(ARIA_CONTROLS_KEY, modalId);
    trigger.setAttribute(ARIA_HASPOPUP_KEY, ARIA_ROLE_VALUES.dialog);
    trigger.setAttribute(ARIA_EXPANDED_KEY, String(expanded));

    if (!trigger.hasAttribute(ARIA_ROLEDESCRIPTION_KEY)) {
      trigger.setAttribute(ARIA_ROLEDESCRIPTION_KEY, `${action}-modal-trigger`);
    }
  }
};
