import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * The target for the before and after slider component.
   */
  'wrapper',
  /**
   * The before image for the before and after slider component.
   */
  'before',
  /**
   * The after image for the before and after slider component.
   */
  'after',
  /**
   * The handle for the before and after slider component.
   */
  'handle',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * The mode of the before and after slider component.
   */
  mode: {
    key: 'mode',
    values: { drag: 'drag', hover: 'hover' },
  },
  /**
   * The instance number
   */
  instance: {
    key: 'instance',
  },
} as const satisfies AttributeSettings;
