import { type AttributeElements } from '@finsweet/attributes-utils';

import type { ConsentKey, Consents } from '../utils';

export const ELEMENTS = [
  /**
   * This is an element example definition.
   */
  'banner',
  'preferences',
  'open-preferences',
  'fixed-preferences',
  'allow',
  'deny',
  'close',
  'submit',
  'interaction',
  'marketing',
  'personalization',
  'analytics',
  'display',
  'cookie-consent',
  'opt-in',
  'disable',
  'placeholder',
  'form',
  'checkbox-essential',
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
   * if set to true, `restartWebflow()` will be called after the consent is updated
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
   * Cookie category
   */
  category: {
    key: 'category',
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
  },

  /**
   * If this attribute is set and no interaction is used for displaying the component, the default fade animation will set this display property.
   */
  display: {
    key: 'display',
    values: {
      block: 'block',
      inline: 'inline',
      grid: 'grid',
      'inline-block': 'inline-block',
      flex: 'flex',
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
 * CSS Classes
 */
export const WEBFLOW_CSS = {
  customCheckbox: 'w-checkbox-input--inputType-custom',
  customRadio: 'w-form-formradioinput--inputType-custom',
  checkedInput: 'w--redirected-checked',
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
  essential: false,
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

export const DEFAULT_COOKIE_MAX_AGE = '180';
