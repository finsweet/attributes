import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  'list',
  'item',
  'dropdown',
  'phone-input',
  'flag',
  'full-name',
  'two-letter',
  'calling-code',
  'currency',
] as const satisfies AttributeElements;

export const SETTINGS = {} as const satisfies AttributeSettings;

export const GEOLOCATION_ENDPOINT = 'https://www.cloudflare.com/cdn-cgi/trace';
export const COUNTRIES_ENDPOINT = 'https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags,currencies';
