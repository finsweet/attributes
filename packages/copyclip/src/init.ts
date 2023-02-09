import { findTextNode, isHTMLElement, isNotEmpty } from '@finsweet/ts-utils';
import type ClipboardJS from 'clipboard';

import { CMS_ATTRIBUTE_ATTRIBUTE, COPY_CLIP_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { getInstanceIndex } from '$global/helpers';

import {
  ATTRIBUTES,
  DEFAULT_SUCCESS_CSS_CLASS,
  DEFAULT_SUCCESS_DURATION,
  getSelector,
  queryElement,
} from './constants';
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
export const init = async (): Promise<ClipboardJS[]> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const copyTriggers = queryElement('trigger', { operator: 'prefixed', all: true });

  const clipboardInstances = copyTriggers
    .map((trigger) => {
      if (!isHTMLElement(trigger)) return;

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

      const target = siblingTarget || queryElement('target', { instanceIndex });

      // Store the text node and the original text
      const textNode = findTextNode(trigger);
      const originalText = textNode ? textNode.textContent : undefined;

      // Create options object
      const clipboardInstance = createClipboardJsInstance({
        trigger,
        target,
        textToCopy,
        originalText,
        textNode,
        successDuration,
        successMessage,
        successClass,
      });

      return clipboardInstance;
    })
    .filter(isNotEmpty);

  return finalizeAttribute(COPY_CLIP_ATTRIBUTE, clipboardInstances, () => {
    for (const clipboardInstance of clipboardInstances) {
      clipboardInstance.destroy();
    }
  });
};
