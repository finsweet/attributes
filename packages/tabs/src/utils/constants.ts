import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = ['menu', 'content'] as const satisfies AttributeElements;

export const SETTINGS = {
  setting: { key: 'setting', values: { in: 'IN', out: 'OUT' } },
  querytabs: { key: 'querytabs', values: { true: 'true' } },
  activeclass: { key: 'activeclass' },
} as const satisfies AttributeSettings;
