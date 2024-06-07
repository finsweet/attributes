import { type AttributeElements } from '@finsweet/attributes-utils';

import type { ConsentKey, Consents } from '../utils';

export const ELEMENTS = [
  /**
   * Banner element
   */
  'banner',
  /**
   * Preferences banner element
   */
  'preferences',
  /**
   * Open preferences element. This element will open the preferences banner.
   */
  'open-preferences',
  /**
   * Fixed preferences element.
   */
  'fixed-preferences',
  /**
   * Triggers allow preferences
   */
  'allow',
  /**
   * Triggers deny preferences element
   */
  'deny',
  /**
   * Closes preferences banner element
   */
  'close',
  /**
   * Submits preferences selected
   */
  'submit',
  /**
   * Interaction trigger element
   */
  'interaction',
  /**
   * Placeholder element
   */
  'placeholder',
  /**
   * Preferences Form element
   */
  'form',
  /**
   * Preferences Form Checkbox element
   */
  'checkbox-essential',
  /**
   * Preferences Form Checkbox element
   */
  'checkbox-marketing',
  /**
   * Preferences Form Checkbox element
   */
  'checkbox-personalization',
  /**
   * Preferences Form Checkbox element
   */
  'checkbox-analytics',
  /**
   * Internal component element, identifies element that wraps banner elements
   */
  'internal-component',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Animation setting
   */
  animation: {
    key: 'animation',
    values: {
      fade: 'fade',
      'slide-up': 'slide-up',
      'slide-down': 'slide-down',
      'slide-left': 'slide-left',
      'slide-right': 'slide-right',
      grow: 'grow',
      shrink: 'shrink',
      spin: 'spin',
    },
  },
  /**
   * Animation duration
   */
  duration: {
    key: 'duration',
  },
  /**
   * Animation easing
   */
  easing: {
    key: 'easing',
    values: {
      linear: 'linear',
      ease: 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    },
  },

  /**
   * Accepts informational opt-out or opt-in as value
   */
  mode: {
    key: 'mode',
    values: {
      informational: 'informational',
      'opt-out': 'opt-out',
      'opt-in': 'opt-in',
    },
  },

  /**
   * Ensures components (Banner, Manager and Preferences) will be fetched from the specified URL and rendered to the current page.
   */
  source: {
    key: 'source',
  },

  /**
   * if set to true, `restartWebflow(["ix2"])` will be called after the consent is updated
   */
  resetix: {
    key: 'resetix',
  },

  /**
   * When cookie is updated, this attribute will be set to true and stored in cookies
   */
  updated: {
    key: 'updated',
  },

  /**
   *
   */
  domain: {
    key: 'domain',
  },

  /**
   *
   */
  type: {
    key: 'type',
    values: {
      'cookie-consent': 'cookie-consent',
    },
  },

  /**
   *
   */
  categories: {
    key: 'categories',
    values: {
      personalization: 'personalization',
      marketing: 'marketing',
      analytics: 'analytics',
    },
  },

  /**
   * Makes the body locks and page scrolling is disabled when the Banner is visible.
   */
  scroll: {
    key: 'scroll',
    values: {
      disable: 'disable',
    },
  },

  /**
   * Default is 180 days.
   */
  expires: {
    key: 'expires',
  },

  /**
   * Optionally send consents to an API endpoint, so you can store consent records in your database.
   */
  endpoint: {
    key: 'endpoint',
  },

  /**
   *
   */
  placeholder: {
    key: 'placeholder',
  },

  /**
   *
   */
  src: {
    key: 'src',
  },
} as const;

/**
 * Consents
 */
export const OPTIONAL_CONSENTS = ['personalization', 'essential', 'analytics', 'marketing'] as const;
export const UNCATEGORIZED_CONSENT = 'uncategorized';
export const CONSENTS = [...OPTIONAL_CONSENTS, UNCATEGORIZED_CONSENT] as const;

/**
 * Main Key
 */
export const MAIN_KEY = 'fs-consent';

/**
 * Modes
 */
export const MODES = ['informational', 'opt-in', 'opt-out'] as const;

/**
 * Actions
 */
export const ACTIONS = {
  allow: 'allow',
  deny: 'deny',
  submit: 'submit',
} as const;

/**
 * Cookie Keys
 */
export const COOKIE_KEYS = {
  main: MAIN_KEY,
  consentsUpdated: `${MAIN_KEY}-updated`,
};

/**
 * Dynamic Keys
 */
export const DYNAMIC_KEYS = {
  checkbox: (key: ConsentKey): string => `[${MAIN_KEY}-element="checkbox-${key}"]`,
  gtmEvent: (key: ConsentKey): string => `${key}-activated`,
};

/**
 * Google Tag Manager
 */
export const GTM_EVENT_SUFFIX = '-activated';

// Defaults
export const CONSENT_REQUIRED: Consents = Object.freeze({
  analytics: false,
  essential: true,
  marketing: false,
  personalization: false,
  uncategorized: false,
} as const);

export const CONSENT_ALL: Consents = Object.freeze({
  analytics: true,
  essential: true,
  marketing: true,
  personalization: true,
  uncategorized: true,
} as const);

export const DEFAULT_COOKIE_MAX_AGE = 180;
