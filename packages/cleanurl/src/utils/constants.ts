import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [] as const satisfies AttributeElements;

export const SETTINGS = {
  query: {
    key: 'query',
    values: {
      enable: 'enable',
      disable: 'disable',
    },
  },
  hash: {
    key: 'hash',
    values: {
      enable: 'enable',
      disable: 'disable',
    },
  },
} as const satisfies AttributeSettings;
