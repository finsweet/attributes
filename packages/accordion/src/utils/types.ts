import type { SETTINGS } from './constants';

export interface AccordionData {
  accordion: HTMLElement;
  controls: {
    destroy: () => void;
    open: () => void;
    close: () => void;
    isOpen: () => boolean;
  };
}

export interface AccordionGroupData {
  group: HTMLElement;
  single: boolean;
  initial: InitialState;
  accordions: AccordionData[];
  activeClass: string;
}

type InitialValues = (typeof SETTINGS)['initial']['values'];

export type InitialState = InitialValues[keyof InitialValues] | number[] | undefined;
