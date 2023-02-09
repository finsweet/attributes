import type { ATTRIBUTES } from './constants';

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
  single: boolean;
  initial: InitialState;
  accordions: AccordionData[];
  activeClass: string;
}

type InitialValues = (typeof ATTRIBUTES)['initial']['values'];

export type InitialState = InitialValues[keyof InitialValues] | number[] | undefined;
