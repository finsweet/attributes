import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  'tabs',
  'menu',
  'content',
  'scroll-anchor',
  'name',
  'timer-interaction',
] as const satisfies AttributeElements;

export const SETTINGS = {
  effect: { key: 'effect', values: { fade: 'fade', slideup: 'slide-up', slidedown: 'slide-down' } },
  querytabs: { key: 'querytabs', values: { true: 'true' } },
  activeclass: { key: 'activeclass' },
  timer: { key: 'timer' },
  timerstopclick: { key: 'timerstopclick' },
  timerstart: { key: 'timerstart', values: { scrollintoview: 'scroll-into-view', load: 'load', click: 'click' } },
} as const satisfies AttributeSettings;
