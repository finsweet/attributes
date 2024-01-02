import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = ['listener'] as const satisfies AttributeElements;

export const SETTINGS = {
  class: { key: 'class' },
  instance: { key: 'instance' },
} as const satisfies AttributeSettings;
