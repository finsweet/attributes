import type { Schema, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  mode: {
    ...SETTINGS.mode,
    name: 'Opt-in',
    description: 'Defines if the user can opt-in to cookies',
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
    type: 'text',
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
    name: 'Scroll',
    description: 'Controls body locks and page scrolling when the Banner is visible',
    type: 'text',
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
    name: 'Src',
    description: 'The source url of the script',
    type: 'text',
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
      settings: [SCHEMA_SETTINGS.scroll, SCHEMA_SETTINGS.display],
    },
    {
      key: 'preferences',
      name: 'Preferences',
      description: 'Modal Form containing all the preferences and form',
      allowedTypes: ['Block'],
      settings: [SCHEMA_SETTINGS.scroll, SCHEMA_SETTINGS.display],
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
    {
      key: 'interaction',
      name: 'Interaction',
      description: 'When added, it activates webflow interaction to the component',
      allowedTypes: ['Block'],
    },
  ],
};
