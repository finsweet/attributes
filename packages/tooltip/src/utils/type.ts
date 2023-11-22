import type { SETTINGS } from './constants';

export type TooltipInstance = {
  toggle: HTMLElement;
  tooltip: HTMLElement;
  arrowElement: HTMLElement;
  cleanup: () => void;
};

export type ListenerType = 'hover' | 'click';
export type PlacementType =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom'; // Add more as needed

export type GlobalSettingsType = {
  listener?: ListenerType | undefined;
  placement?: PlacementType | undefined;
  offset?: string | undefined;
  flip?: boolean | undefined;
};
