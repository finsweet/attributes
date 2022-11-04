import { INPUT_COUNTER_ATTRIBUTE } from '$global/constants/attributes';
import { generateDynamicAttibuteValue, generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${INPUT_COUNTER_ATTRIBUTE}`;

export const INPUT_ELEMENT_KEY = 'input';
export const INCREMENT_ELEMENT_KEY = 'increment';
export const DECREMENT_ELEMENT_KEY = 'decrement';
export const RESET_ELEMENT_KEY = 'reset';
export const STYLE_ELEMENT_KEY = 'style';

export const INITIAL_SETTING_KEY = 'initial';
export const SHOW_ARROWS_SETTING_KEY = 'showarrows';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines the input element.
       */
      input: generateDynamicAttibuteValue(INPUT_ELEMENT_KEY),

      /**
       * Defines an increment button.
       */
      increment: generateDynamicAttibuteValue(INCREMENT_ELEMENT_KEY),

      /**
       * Defines an decrement button.
       */
      decrement: generateDynamicAttibuteValue(DECREMENT_ELEMENT_KEY),

      /**
       * Defines a reset button.
       */
      reset: generateDynamicAttibuteValue(RESET_ELEMENT_KEY),

      /**
       * Defines the stylesheet that contains the hide arrows CSS.
       */
      style: STYLE_ELEMENT_KEY,
    },
  },

  /**
   * Defines the initial value for the numeric input.
   */
  initial: {
    key: `${ATTRIBUTES_PREFIX}-${INITIAL_SETTING_KEY}`,
  },

  /**
   * Defines if the native number input arrows should be displayed.
   */
  showArrows: {
    key: `${ATTRIBUTES_PREFIX}-${SHOW_ARROWS_SETTING_KEY}`,
  },
} as const;

export const [getSelector, queryElement, getAttribute] = generateSelectors(ATTRIBUTES);

export const HIDE_ARROWS_STYLE = `<style ${ATTRIBUTES.element.key}="${STYLE_ELEMENT_KEY}">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>`;
