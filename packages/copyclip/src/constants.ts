import { generateDynamicAttibuteValue, generateSelectors } from '@global/factory';

export const ATTRIBUTE = 'copyclip';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const TRIGGER_ELEMENT_KEY = 'click';
export const TARGET_ELEMENT_KEY = 'copy-this';
export const SIBLING_ELEMENT_KEY = 'copy-sibling';
export const TEXT_SETTING_KEY = 'text';
export const SUCCESS_MESSAGE_SETTING_KEY = 'message';
export const SUCESSS_DURATION_SETTING_KEY = 'duration';
export const SUCESSS_CLASS_SETTING_KEY = 'active';

export const ATTRIBUTES = {
  /**
   * Defines an element that will act as trigger or target based on its value.
   */
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines an element to act as the copy trigger.
       */
      trigger: TRIGGER_ELEMENT_KEY,

      /**
       * Defines an element to act as the copy target.
       */
      target: generateDynamicAttibuteValue(TARGET_ELEMENT_KEY),

      /**
       * Defines a sibling element to act as the copy target.
       */
      sibling: SIBLING_ELEMENT_KEY,
    },
  },

  /**
   * Defines the text that will be copied to the clipboard.
   */
  text: { key: `${ATTRIBUTES_PREFIX}-${TEXT_SETTING_KEY}` },

  /**
   * Defines the message that will be displayed on success.
   * Applicable both on elements and the `<script>` tag.
   * If applied to the `<script>` tag, all elements will inherit this attribute.
   */
  successMessage: { key: `${ATTRIBUTES_PREFIX}-${SUCCESS_MESSAGE_SETTING_KEY}` },

  /**
   * Defines the duration of the success state.
   * Applicable both on elements and the `<script>` tag.
   * If applied to the `<script>` tag, all elements will inherit this attribute.
   */
  successDuration: { key: `${ATTRIBUTES_PREFIX}-${SUCESSS_DURATION_SETTING_KEY}` },

  /**
   * Defines the CSS Class added to the trigger on the success state.
   * Applicable both on elements and the `<script>` tag.
   * If applied to the `<script>` tag, all elements will inherit this attribute.
   */
  successClass: { key: `${ATTRIBUTES_PREFIX}-${SUCESSS_CLASS_SETTING_KEY}` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const DEFAULT_SUCCESS_DURATION = 1000 as const;
export const DEFAULT_SUCCESS_CSS_CLASS = `${ATTRIBUTES_PREFIX}_active` as const;
