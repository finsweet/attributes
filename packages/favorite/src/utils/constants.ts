import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines an Swiper elements.
   */
  'list',
  'remove',
] as const satisfies AttributeElements;

export const SETTINGS = {
  key: { key: 'key' },
  field: { key: 'field' },
  active: { key: 'active' },
} as const satisfies AttributeSettings;
