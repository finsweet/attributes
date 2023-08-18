import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [] as const satisfies AttributeElements;

export const SETTINGS = {
  listener: { key: 'listener' },
  class: { key: 'class' },
  instance: { key: 'instance' },
} as const satisfies AttributeSettings;
