import { type FinsweetAttributeInit } from '@finsweet/attributes-utils';

import { handleClickOrHover, handleKeyPress } from './actions';
import type { SETTINGS } from './utils/constants';
import { isValidCssSelector } from './utils/isValidCssSelector';

/**
 * Inits Keypress events.
 */
export const init: FinsweetAttributeInit<typeof SETTINGS> = async (globalSettings = {}) => {
  if (!globalSettings?.toggle || (!globalSettings?.keycode && !globalSettings?.event)) {
    console.error('Improper keypress attribute config.');

    return;
  }

  const validSelector = isValidCssSelector(globalSettings?.toggle);

  if (!validSelector) {
    console.error(
      'Invalid config. Please use a valid CSS selector value for the fs-keypress-toggle="VALID_CSS_SELECTOR_VALUE" setting.'
    );

    return;
  }

  const toggles = document.querySelectorAll<HTMLElement>(globalSettings?.toggle);

  if (toggles.length) {
    toggles.forEach((element) => {
      element.style.display = 'none';
    });
  }

  const trigger = () => {
    // happens globally
    if (globalSettings?.keycode) {
      handleKeyPress(globalSettings?.keycode, globalSettings.animation, globalSettings.toggle, globalSettings.delay);
    }

    handleClickOrHover(globalSettings.animation);

    return;
  };

  trigger();

  return {
    destroy() {
      trigger();
    },
  };
};
