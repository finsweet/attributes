import { findTextNode } from '@finsweet/ts-utils';
import { COPY_CLIP_ATTRIBUTE } from '@global/constants/attributes';
import { getInstanceIndex } from '@global/helpers';
import type ClipboardJS from 'clipboard';

import { ATTRIBUTES, DEFAULT_SUCCESS_DURATION, DEFAULT_SUCCESS_CSS_CLASS, getSelector } from './constants';
import { createClipboardJsInstance } from './factory';

// Constants destructuring
const {
  element: { key: elementKey },
  text: { key: textKey },
  successMessage: { key: successMessageKey },
  successDuration: { key: successDurationKey },
  successClass: { key: successClassKey },
} = ATTRIBUTES;

/**
 * Inits the copy to clipboard functionality.
 */
export const init = (): [NodeListOf<Element>, ClipboardJS['destroy'][]] => {
  const copyTriggers = document.querySelectorAll(getSelector('element', 'trigger', { operator: 'prefixed' }));

  const destroyCallbacks: ClipboardJS['destroy'][] = [];

  for (const trigger of copyTriggers) {
    if (!(trigger instanceof HTMLElement)) continue;

    // Get attributes
    const textToCopy = trigger.getAttribute(textKey);
    const successMessage = trigger.getAttribute(successMessageKey);
    const successDuration = +(trigger.getAttribute(successDurationKey) || DEFAULT_SUCCESS_DURATION);
    const successClass = trigger.getAttribute(successClassKey) || DEFAULT_SUCCESS_CSS_CLASS;

    // Get the instance index
    const instanceIndex = getInstanceIndex(trigger, elementKey);

    // Get the target to be copied, if existing
    const siblingTarget = trigger.parentElement?.querySelector(
      getSelector('element', 'sibling', { operator: 'prefixed' })
    );

    const target = siblingTarget || document.querySelector(getSelector('element', 'target', { instanceIndex }));

    // Store the text node and the original text
    const textNode = findTextNode(trigger);
    const originalText = textNode ? textNode.textContent : undefined;

    // Create options object
    destroyCallbacks.push(
      createClipboardJsInstance({
        trigger,
        target,
        textToCopy,
        originalText,
        textNode,
        successDuration,
        successMessage,
        successClass,
      })
    );
  }

  window.fsAttributes[COPY_CLIP_ATTRIBUTE].resolve?.([copyTriggers, destroyCallbacks]);

  return [copyTriggers, destroyCallbacks];
};
