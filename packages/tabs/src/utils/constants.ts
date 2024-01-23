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
  animation: {
    key: 'animation',
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
  easing: {
    key: 'easing',
    values: {
      linear: 'linear',
      ease: 'ease',
      easein: 'ease-in',
      easeout: 'ease-out',
    },
  },
  duration: { key: 'duration' },
  querytabs: { key: 'querytabs' },
  activeclass: { key: 'activeclass' },
  timer: { key: 'timer' },
  name: { key: 'name' },
  timerstopclick: { key: 'timerstopclick' },
  timerstart: { key: 'timerstart', values: { scrollintoview: 'scroll-into-view', load: 'load', click: 'click' } },
} as const satisfies AttributeSettings;

export const activeTabClass = 'is-tabs-active';
