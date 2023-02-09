import {
  ARIA_CONTROLS_KEY,
  ARIA_LABEL_KEY,
  ARIA_LABELLEDBY_KEY,
  ARIA_ROLE_KEY,
  ARIA_ROLE_VALUES,
  TABINDEX_KEY,
} from '$global/constants/a11y';
import { ensureUniqueId } from '$global/helpers';

/**
 * Sets the correspondent aria attributes to the elements.
 * @param trigger
 * @param content
 */
export const setAccordionA11y = (trigger: HTMLElement, content: HTMLElement) => {
  const triggerId = ensureUniqueId(trigger);
  const contentId = ensureUniqueId(content);

  trigger.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.button);
  trigger.setAttribute(ARIA_CONTROLS_KEY, contentId);
  trigger.setAttribute(TABINDEX_KEY, '0');

  if (!content.hasAttribute(ARIA_LABELLEDBY_KEY) && !content.hasAttribute(ARIA_LABEL_KEY)) {
    content.setAttribute(ARIA_LABELLEDBY_KEY, triggerId);
  }
};
