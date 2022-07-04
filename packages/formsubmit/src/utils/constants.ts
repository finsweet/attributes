import { generateDynamicAttibuteValue, generateSelectors } from '@global/factory';

export const ATTRIBUTE = 'formsubmit';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const FORM_ELEMENT_KEY = 'form';
export const RESET_ELEMENT_KEY = 'reset';
export const IX_TRIGGER_ELEMENT_KEY = 'ix-trigger';

export const RESET_SETTING_KEY = 'reset';
export const RESET_SETTING_VALUES = { true: 'true' };
export const PREVENT_RESET_SETTING_KEY = 'preventreset';
export const PREVENT_RESET_SETTING_VALUES = { true: 'true' };
export const RELOAD_SETTING_KEY = 'reload';
export const RELOAD_SETTING_VALUES = { true: 'true' };
export const REDIRECT_SETTING_KEY = 'redirect';
export const REDIRECT_SETTING_VALUES = { true: 'true' };
export const REDIRECT_URL_SETTING_KEY = 'redirecturl';
export const REDIRECT_TARGET_SETTING_KEY = 'redirecttarget';
export const REDIRECT_TARGET_SETTING_VALUES = { newTab: 'new-tab' };
export const ENHANCE_SETTING_KEY = 'enhance';
export const ENHANCE_SETTING_VALUES = { true: 'true' };

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a form element.
       */
      form: generateDynamicAttibuteValue(FORM_ELEMENT_KEY),

      /**
       * Defines an element that, when clicked, should reset the form.
       */
      reset: generateDynamicAttibuteValue(RESET_ELEMENT_KEY),

      /**
       * Defines an element that should be clicked after form submission, triggering a Mouse Click interaction.
       */
      ixTrigger: generateDynamicAttibuteValue(IX_TRIGGER_ELEMENT_KEY),
    },
  },

  /**
   * Defines if the form should reset all inputs after submission.
   * If set to true, it resets automatically.
   * If set to a number in miliseconds, it will timeout before resetting.
   */
  reset: {
    key: `${ATTRIBUTES_PREFIX}-${RESET_SETTING_KEY}`,
    values: RESET_SETTING_VALUES,
  },

  /**
   * Defines an element (or a wrapper of multiple elements) that should preserve the value when resetting the form.
   */
  preventReset: {
    key: `${ATTRIBUTES_PREFIX}-${PREVENT_RESET_SETTING_KEY}`,
    values: PREVENT_RESET_SETTING_VALUES,
  },

  /**
   * Defines if the form should reload the page after submission.
   * If set to true, it reloads it automatically.
   * If set to a number in miliseconds, it will timeout before reloading.
   */
  reload: {
    key: `${ATTRIBUTES_PREFIX}-${RELOAD_SETTING_KEY}`,
    values: RELOAD_SETTING_VALUES,
  },

  /**
   * Defines if the form should redirect after submission.
   * If set to true, it redirects automatically.
   * If set to a number in miliseconds, it will timeout before redirecting.
   */
  redirect: {
    key: `${ATTRIBUTES_PREFIX}-${REDIRECT_SETTING_KEY}`,
    values: REDIRECT_SETTING_VALUES,
  },

  /**
   * Defines the URL to redirect the user.
   */
  redirectUrl: {
    key: `${ATTRIBUTES_PREFIX}-${REDIRECT_URL_SETTING_KEY}`,
  },

  /**
   * Defines the redirect target, either on place or on a new tab.
   */
  redirectTarget: {
    key: `${ATTRIBUTES_PREFIX}-${REDIRECT_TARGET_SETTING_KEY}`,
    values: REDIRECT_TARGET_SETTING_VALUES,
  },

  /**
   * Sends the data to the form action as a custom JavaScript Fetch instead of reloading the page.
   */
  enhance: {
    key: `${ATTRIBUTES_PREFIX}-${ENHANCE_SETTING_KEY}`,
    values: ENHANCE_SETTING_VALUES,
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
