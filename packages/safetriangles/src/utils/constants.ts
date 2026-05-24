import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines the trigger element for the safe polygon.
   */
  'trigger',

  /**
   * Defines the target element for the safe polygon.
   */
  'target',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines a delay in milliseconds before the safe polygon is applied.
   */
  delay: {
    key: 'delay',
    isNumeric: true,
    defaultValue: '100',
  },

  /**
   * Defines whether to enable debug mode.
   */
  debug: {
    key: 'debug',
    values: ['true'],
  },
} as const satisfies AttributeSettings;
