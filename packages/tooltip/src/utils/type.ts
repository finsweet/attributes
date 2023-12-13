import type { animations } from '@finsweet/attributes-utils';

export type TooltipInstance = {
  target: HTMLElement;
  tooltip: HTMLElement;
  arrowElement?: HTMLElement | null;
  cleanup: () => void;
};

export type GlobalSettings = {
  animation?: keyof typeof animations;
  placement?: string;
  offset?: string;
  trigger?: 'hover' | 'click';
  triggerout?: 'hover' | 'click';
  flip?: string;
  floating?: string;
  padding?: string;
};
