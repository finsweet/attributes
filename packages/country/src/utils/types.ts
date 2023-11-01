export interface CountryData {
  flags: Flags;
  name: Name;
  cca2: string;
  idd: Idd;
  currencies: Currency;
}

interface Currency {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

interface Flags {
  png: string;
  svg: string;
}

interface Idd {
  root: Root;
  suffixes: string[];
}

interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

interface NativeName {
  official: string;
  common: string;
}

enum Root {
  Empty = '',
  The1 = '+1',
  The2 = '+2',
  The3 = '+3',
  The4 = '+4',
  The5 = '+5',
  The6 = '+6',
  The7 = '+7',
  The8 = '+8',
  The9 = '+9',
}

export type DropdownItem = CountryData & {
  element: HTMLElement;
};
