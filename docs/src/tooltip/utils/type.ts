import type { animations, Easings } from '@finsweet/attributes-utils';

export type TooltipInstance = {
  target: HTMLElement;
  tooltip: HTMLElement;
  arrowElement?: HTMLElement | null;
  cleanup: () => void;
};

export interface TooltipOptions {
  animation: keyof typeof animations;
  duration: number;
  easing: Easings[number];
  textColor: string;
  themeColor: string;
  targetAttribute: string;
  key: string;
  arrow: boolean;
  badge: boolean;
  outlineOnly: boolean;
}
