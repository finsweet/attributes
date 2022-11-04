import { boolean, optional, record, string, type } from 'superstruct';

import { LAUNCHDARKLY_ATTRIBUTE } from '$global/constants/attributes';
import { generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${LAUNCHDARKLY_ATTRIBUTE}`;

export const LOADER_ELEMENT_KEY = 'loader';
export const DEV_CLIENT_ID_SETTING_KEY = `devclientid`;
export const PROD_CLIENT_ID_SETTING_KEY = `prodclientid`;
export const EVENTS_TO_TRACK_SETTING_KEY = `eventstotrack`;
export const FLAG_SETTING_KEY = `flag`;
export const SHOW_IF_SETTING_KEY = `showif`;
export const SET_PROPERTIES_SETTING_KEY = `setproperties`;
export const CLOAK_SETTING_KEY = `cloak`;

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      loader: LOADER_ELEMENT_KEY,
    },
  },

  /**
   * Defines clientId for the LaunchDarkly environment.
   */
  devClientId: {
    key: `${ATTRIBUTES_PREFIX}-${DEV_CLIENT_ID_SETTING_KEY}`,
  },

  prodClientId: {
    key: `${ATTRIBUTES_PREFIX}-${PROD_CLIENT_ID_SETTING_KEY}`,
  },

  eventsToTrack: {
    key: `${ATTRIBUTES_PREFIX}-${EVENTS_TO_TRACK_SETTING_KEY}`,
  },

  flag: {
    key: `${ATTRIBUTES_PREFIX}-${FLAG_SETTING_KEY}`,
  },

  showIf: {
    key: `${ATTRIBUTES_PREFIX}-${SHOW_IF_SETTING_KEY}`,
  },

  setProperties: {
    key: `${ATTRIBUTES_PREFIX}-${SET_PROPERTIES_SETTING_KEY}`,
  },

  cloak: {
    key: `${ATTRIBUTES_PREFIX}-${CLOAK_SETTING_KEY}`,
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

/**
 * Properties
 */
export const TEXT_PROPERTY = `text`;
export const SRC_PROPERTY = `src`;
export const SRCSET_PROPERTY = `srcset`;
export const SIZES_PROPERTY = `sizes`;
export const VALUE_PROPERTY = `value`;
export const CLASS_PROPERTY = `class`;
export const HTML_PROPERTY = `html`;
export const HREF_PROPERTY = `href`;

/**
 * Defines the JSON Flag Value schema.
 */
export const jsonFlagValueSchema = type({
  show: optional(boolean()),
  properties: optional(record(string(), string())),
});

/**
 * Defines if the current envionment is in the staging domain or in production.
 */
export const IS_STAGING = window.location.origin.includes('webflow.io');
