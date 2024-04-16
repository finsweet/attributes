export type TooltipInstance = {
  target: HTMLElement;
  tooltip: HTMLElement;
  arrowElement?: HTMLElement | null;
  cleanup: () => void;
};
