import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * This is an element example definition.
   */
  'input',
  'results',
  'loader',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines a setting example definition.
   */
  addclass: {
    key: 'addclass',
  },
} as const satisfies AttributeSettings;
