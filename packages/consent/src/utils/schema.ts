import type { Schema, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  mode: {
    ...SETTINGS.mode,
    name: 'Opt-in',
    description:
      'Opt-in means the user must explicitly “opt-in” to cookies before they are loaded on the page. Opt-out means cookies are loaded immediately and they can “opt-out” of the loaded cookies.',
    type: 'select',
  },

  source: {
    ...SETTINGS.source,
    name: 'Source',
    description: 'Defines the source of the cookie banner',
    type: 'text',
  },
  updated: {
    ...SETTINGS.updated,
    name: 'Updated',
    description: 'When cookie is updated, this attribute will be set to true and stored in cookies',
    type: 'boolean',
  },
  domain: {
    ...SETTINGS.domain,
    name: 'Domain',
    description: 'The domain of the cookie',
    type: 'text',
  },
  type: {
    ...SETTINGS.type,
    name: 'Type',
    description: 'The type of the cookie',
    type: 'text',
  },
  categories: {
    name: 'Category',
    description: 'The category of the cookie',
    values: {
      personalization: 'personalization',
      marketing: 'marketing',
      analytics: 'analytics',
    },
    type: 'select',
    key: 'categories',
  },
  category: {
    name: 'Category',
    description: 'The category of the cookie',
    values: {
      personalization: 'personalization',
      marketing: 'marketing',
      analytics: 'analytics',
    },
    type: 'select',
    key: 'category',
  },
  scroll: {
    ...SETTINGS.scroll,
    name: 'Disable Scroll',
    description: 'Controls body locks and page scrolling when the Banner is visible',
    type: 'boolean',
  },
  display: {
    values: {
      block: 'block',
      inline: 'inline',
      grid: 'grid',
      'inline-block': 'inline-block',
      flex: 'flex',
    },
    key: 'display',
    type: 'select',
    name: 'Display',
    description: 'Controls the display property when no interaction is used for displaying the component',
  },
  expires: {
    ...SETTINGS.expires,
    name: 'Expires',
    description: 'The expiration period of the cookie (default is 180 days)',
    type: 'text',
  },
  endpoint: {
    ...SETTINGS.endpoint,
    name: 'Endpoint',
    description: 'Optionally send consents to an API endpoint to store consent records',
    type: 'text',
  },
  placeholder: {
    ...SETTINGS.placeholder,
    name: 'Placeholder',
    description: 'Placeholder text for the input field',
    type: 'text',
  },
  src: {
    ...SETTINGS.src,
    name: 'Script Source',
    description: 'The source url of the script',
    type: 'text',
  },
  resetix: {
    ...SETTINGS.resetix,
    name: 'Webflow IX',
    description: 'if set to true, `restartWebflow(["ix2"])` will be called after the consent is updated',
    type: 'boolean',
  },
  animation: {
    ...SETTINGS.animation,
    name: 'Animation',
    description: 'Default animation for the component. Defaults to no animations if not set.',
    type: 'select',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [],
  elements: [
    {
      key: 'banner',
      name: 'Banner',
      description: 'Bottom banner',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.scroll, SCHEMA_SETTINGS.display, SCHEMA_SETTINGS.animation],
    },
    {
      key: 'preferences',
      name: 'Preferences',
      description: 'Modal Form containing all the preferences and form',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.scroll, SCHEMA_SETTINGS.display, SCHEMA_SETTINGS.animation],
    },
    {
      key: 'open-preferences',
      name: 'Open Preferences',
      description: 'Toggles preferences modal',
      allowedTypes: ['Link'],
    },
    {
      key: 'fixed-preferences',
      name: 'Fixed Preferences',
      description: 'Toggles preferences modal.',
      allowedTypes: ['Link'],
      settings: [SCHEMA_SETTINGS.display, SCHEMA_SETTINGS.animation],
    },
    {
      key: 'allow',
      name: 'Allow',
      description: 'Allow cookies',
      allowedTypes: ['Link'],
    },
    {
      key: 'deny',
      name: 'Decline',
      description: 'Decline cookies',
      allowedTypes: ['Link'],
    },
    {
      key: 'close',
      name: 'Close',
      description: 'Close preferences modal',
      allowedTypes: ['Link'],
    },
    {
      key: 'submit',
      name: 'Submit',
      description: 'Submit preferences form',
      allowedTypes: ['Link'],
    },
  ],
};
