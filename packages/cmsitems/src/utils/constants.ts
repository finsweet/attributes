import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [] as const satisfies AttributeElements;

export const SETTINGS = {
  //Breakpoints
  mobileportrait: { key: 'mobileportrait' },
  mobilelandscape: { key: 'mobilelandscape' },
  tablet: { key: 'tablet' },
  desktop: { key: 'desktop' },
  '1280': { key: '1280' },
  '1440': { key: '1440' },
  '1920': { key: '1920' },
} as const satisfies AttributeSettings;
