import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = ['menu', 'content', 'scroll-anchor', 'name'] as const satisfies AttributeElements;

export const SETTINGS = {
  effect: { key: 'setting', values: { fade: 'fade', slideup: 'slide-up', slidedown: 'slide-down' } },
  querytabs: { key: 'querytabs', values: { true: 'true' } },
  activeclass: { key: 'activeclass' },
} as const satisfies AttributeSettings;
