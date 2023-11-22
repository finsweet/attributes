import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = ['change', 'trigger'] as const satisfies AttributeElements;

export const SETTINGS = {
  delay: { key: 'delay' },
} as const satisfies AttributeSettings;
