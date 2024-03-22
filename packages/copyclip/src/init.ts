import {
  findTextNode,
  type FsAttributeInit,
  isHTMLElement,
  isNotEmpty,
  parseNumericAttribute,
  waitWebflowReady,
} from '@finsweet/attributes-utils';

import { createClipboardJsInstance } from './factory';
import { DEFAULT_SUCCESS_CSS_CLASS, DEFAULT_SUCCESS_DURATION } from './utils/constants';
import { getAttribute, getInstance, queryAllElements, queryElement } from './utils/selectors';

/**
 * Inits the copy to clipboard functionality.
 */
export const init: FsAttributeInit = async () => {
  await await waitWebflowReady();

  const copyTriggers = queryAllElements('click');

  const clipboardInstances = copyTriggers
    .map((trigger) => {
      if (!isHTMLElement(trigger)) return;

      // Get attributes

      const textToCopy = getAttribute(trigger, 'text');
      const successMessage = getAttribute(trigger, 'message');
      const successDuration = parseNumericAttribute(getAttribute(trigger, 'duration'), DEFAULT_SUCCESS_DURATION);
      const successClass = getAttribute(trigger, 'active') || DEFAULT_SUCCESS_CSS_CLASS;

      // Get the instance index
      const instance = getInstance(trigger);

      // Get the target to be copied, if existing
      const siblingTarget = trigger.parentElement
        ? queryElement('copy-sibling', { scope: trigger.parentElement })
        : null;

      const target = siblingTarget || queryElement('copy-this', { instance });

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

  return {
    result: clipboardInstances,
    destroy() {
      for (const clipboardInstance of clipboardInstances) {
        clipboardInstance.destroy();
      }
    },
  };
};
