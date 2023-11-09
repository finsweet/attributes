import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines an Swiper elements.
   */
  'list',
  'list-favorite',
  'remove',
  'like',
  'loader',
  'counter',
  'empty',
  'message',
] as const satisfies AttributeElements;

export const SETTINGS = {
  key: { key: 'key' },
  field: { key: 'field' },
  active: { key: 'active' },
} as const satisfies AttributeSettings;

export const ADD_TO_LOCAL_STORAGE = 'addToLocalStorageUpdate';
export const REMOVE_FROM_LOCAL_STORAGE = 'removeFromLocalStorageUpdate';
