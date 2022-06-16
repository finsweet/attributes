import type { collectSettings } from '../actions/settings';

export type Settings = NonNullable<ReturnType<typeof collectSettings>>;

export interface OptionData {
  text: string;
  value: string;
  element: HTMLAnchorElement;
  selected: boolean;
  focused: boolean;
  hidden?: boolean;
}

export type OptionsStore = OptionData[];
