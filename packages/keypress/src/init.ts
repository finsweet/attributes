import { type FinsweetAttributeInit } from '@finsweet/attributes-utils';

import { handleKeyPress } from './actions';
import type { SETTINGS } from './utils/constants';
import { isValidCssSelector } from './utils/isValidCssSelector';

/**
 * Inits Keypress events.
 */
export const init: FinsweetAttributeInit<typeof SETTINGS> = async (globalSettings = {}) => {
  const { toggle, keycode, delay } = globalSettings;

  if (!toggle || !keycode) {
    console.error('Improper keypress attribute config.');

    return;
  }

  const validSelector = isValidCssSelector(toggle);

  if (!validSelector) {
    console.error(
      'Invalid config. Please use a valid CSS selector value for the fs-keypress-toggle="VALID_CSS_SELECTOR_VALUE" setting.'
    );

    return;
  }

  const instances = document.querySelectorAll<HTMLElement>(`.${toggle}`);

  if (!instances.length) {
    console.error(`No elements found for the selector ".${toggle}".`);

    return;
  }

  const trigger = () => {
    // keypress happens globally
    handleKeyPress(keycode, instances, toggle, delay);
  };

  trigger();

  return {
    destroy() {
      trigger();
    },
  };
};
