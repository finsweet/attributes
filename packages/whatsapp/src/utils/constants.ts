import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines a button element.
   */
  'button',
  /**
   * Defines a phone element
   */
  'phone',
  /**
   * Defines a message element.
   */
  'message',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines the WhatsApp phone number.
   */
  phone: {
    key: 'phone',
  },
  /**
   * Defines the WhatsApp message.
   */
  message: {
    key: 'message',
  },
} as const satisfies AttributeSettings;

/**
 * Defines the WhatsApp base URL.
 */
export const WHATSAPP_BASE_URL = 'https://wa.me';
