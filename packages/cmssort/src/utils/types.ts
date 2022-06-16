/**
 * Sorting
 */
export type SortItemsCallback = (addingItems?: boolean | undefined) => Promise<void>;
export type SortingDirection = 'asc' | 'desc';

/**
 * Buttons
 */
export type CSSClasses = Record<SortingDirection, string>;
export interface ButtonState {
  sortKey: string;
  cssClasses: CSSClasses;
  direction?: SortingDirection;
  reverse: boolean;
}
export type ButtonsState = Map<HTMLElement, ButtonState>;

/**
 * Dropdown
 */
export interface DropdownOption {
  element: HTMLAnchorElement;
  sortKey?: string;
  direction?: SortingDirection;
  selected: boolean;
}

export type DropdownOptions = DropdownOption[];

export type DropdownLabelData = {
  element: Element;
  originalHTML: string;
  updateContent: (option: DropdownOption) => void;
};
