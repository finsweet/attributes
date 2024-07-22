import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines an event element
   */
  'event',
  /**
   * Defines an event title element
   */
  'title',
  /**
   * Defines an event start date element
   */
  'start',
  /**
   * Defines an event end date element
   */
  'end',
  /**
   * Defines an event timezone element
   */
  'timezone',
  /**
   * Defines an event location element
   */
  'location',
  /**
   * Defines an event description element
   */
  'description',
  /**
   * Defines a google event platform element
   */
  'google',
  /**
   * Defines an outlook event platform element
   */
  'outlook',
  /**
   * Defines an apple event platform element
   */
  'apple',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines a locale setting
   */
  localize: {
    key: 'localize',
    values: { en: 'en' },
  },
  /**
   * Defines an element.
   */
  element: { key: 'element' },
} as const satisfies AttributeSettings;

export const CALENDAR_EVENT_PLATFORMS = {
  google: 'https://www.google.com/calendar/render?action=TEMPLATE',
  outlook: 'https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent',
  apple: 'https://www.icloud.com/calendar/',
} as const;
