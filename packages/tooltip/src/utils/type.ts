import type { animations } from '@finsweet/attributes-utils';

export type TooltipInstance = {
  target: HTMLElement;
  tooltip: HTMLElement;
  arrowElement: HTMLElement | undefined;
  cleanup: () => void;
};

export type GlobalSettings = {
  animation?: keyof typeof animations;
  placement?: string;
  offset?: string;
  listener?: 'hover' | 'click';
  flip?: string;
};
