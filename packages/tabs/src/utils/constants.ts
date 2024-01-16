import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  'menu',
  'content',
  'omit',
  'scroll-anchor',
  'name',
  'tabs',
  'timer-interaction',
] as const satisfies AttributeElements;

export const SETTINGS = {
  effect: {
    key: 'effect',
    values: {
      fade: 'fade',
      slideup: 'slide-up',
      slidedown: 'slide-down',
      slideleft: 'slide-left',
      slideright: 'slide-right',
      grow: 'grow',
      shrink: 'shrink',
      spin: 'spin',
    },
  },
  querytabs: { key: 'querytabs', values: { true: 'true' } },
  activeclass: { key: 'activeclass' },
  easing: {
    key: 'easing',
    values: {
      linear: 'linear',
      ease: 'ease',
      easein: 'ease-in',
      easeout: 'ease-out',
    },
  },
  speed: { key: 'speed' },
  timer: { key: 'timer' },
  name: { key: 'name' },
  timerstopclick: { key: 'timerstopclick' },
  timerstart: { key: 'timerstart', values: { scrollintoview: 'scroll-into-view', load: 'load', click: 'click' } },
} as const satisfies AttributeSettings;

export const activeTabClass = 'is-tabs-active';
