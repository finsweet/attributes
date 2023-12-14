import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  'text',
  'content',
] as const satisfies AttributeElements;

export const SETTINGS = {
  loop: { key: 'loop', values: { true: 'true' } },
  speed: { key: 'speed' },
  effect: {
    key: 'effect',
    values: {
      backspace: 'backspace',
      fadeout: 'fade-out',
    },
  },
  backspacespeed: { key: 'backspacespeed' },
  fadeoutspeed: { key: 'fadeoutspeed' },
  pausebefore: { key: 'pausebefore' },
  pauseafter: { key: 'pauseafter' },
  visiblethreshold: { key: 'visiblethreshold' },
  showcursor: { key: 'showcursor', values: { true: 'true' } },
  whenvisible: { key: 'whenvisible', values: { true: 'true' } },
  cursorcharacter: { key: 'cursorcharacter' },
} as const satisfies AttributeSettings;
