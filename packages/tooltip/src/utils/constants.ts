import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * This is an element example definition.
   */
  'example',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines a setting example definition.
   */
  example: {
    key: 'example',
    values: { value: 'value' },
  },
} as const satisfies AttributeSettings;
