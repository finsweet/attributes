import {
  ANY_ELEMENT,
  BUTTON,
  DIV_BLOCK,
  FORM,
  FORM_BLOCK,
  IMAGE,
  INPUT,
  LINK_BLOCK,
  TEXT_BLOCK,
} from 'global/constants/webflow-selectors';

import type { AttributeSchema } from '$global/types/schema';

import {
  FORM_ELEMENT_KEY,
  RESET_ELEMENT_KEY,
  IX_TRIGGER_ELEMENT_KEY,
  RESET_SETTING_KEY,
  PREVENT_RESET_SETTING_KEY,
  RELOAD_SETTING_KEY,
  REDIRECT_SETTING_KEY,
  REDIRECT_URL_SETTING_KEY,
  REDIRECT_NEW_TAB_SETTING_KEY,
  ENHANCE_SETTING_KEY,
  DISABLE_SETTING_KEY,
} from '../src/utils/constants';

export const schema: AttributeSchema = {
  elements: [
    {
      key: FORM_ELEMENT_KEY,
      description: 'Defines a form element.',
      required: true,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [FORM, FORM_BLOCK],
      conditions: [],
    },
    {
      key: RESET_ELEMENT_KEY,
      description: 'Defines an element that, when clicked, should reset the form.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [DIV_BLOCK, TEXT_BLOCK, BUTTON, LINK_BLOCK, IMAGE],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: FORM_ELEMENT_KEY,
        },
      ],
    },
    {
      key: IX_TRIGGER_ELEMENT_KEY,
      description:
        'Defines an element that should be clicked after form submission, triggering a Mouse Click interaction.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [DIV_BLOCK, TEXT_BLOCK, BUTTON, LINK_BLOCK, IMAGE],
      conditions: [
        {
          condition: 'exists',
          type: 'element',
          element: FORM_ELEMENT_KEY,
        },
      ],
    },
  ],
  settings: [
    {
      key: RESET_SETTING_KEY,
      description: 'Defines if the form should reset all inputs after submission.',
      appliedTo: { elements: [FORM_ELEMENT_KEY] },
      conditions: [],
      value: [
        {
          type: 'boolean',
          default: 'true',
        },
        {
          type: 'int',
          default: '',
        },
      ],
    },
    {
      key: PREVENT_RESET_SETTING_KEY,
      description:
        'Defines an element (or a wrapper of multiple elements) that should preserve the value when resetting the form.',
      appliedTo: { selectors: [INPUT, DIV_BLOCK, ANY_ELEMENT] },
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: FORM_ELEMENT_KEY,
        },
      ],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
    {
      key: RELOAD_SETTING_KEY,
      description: 'Defines if the form should reload the page after submission.',
      appliedTo: { elements: [FORM_ELEMENT_KEY] },
      conditions: [],
      value: [
        {
          type: 'boolean',
          default: 'true',
        },
        {
          type: 'int',
          default: '',
        },
      ],
    },
    {
      key: REDIRECT_SETTING_KEY,
      description: 'Defines if the form should redirect after submission.',
      appliedTo: { elements: [FORM_ELEMENT_KEY] },
      conditions: [],
      value: [
        {
          type: 'boolean',
          default: 'true',
        },
        {
          type: 'int',
          default: '',
        },
      ],
    },
    {
      key: REDIRECT_URL_SETTING_KEY,
      description: 'Defines the URL to redirect the user.',
      appliedTo: { elements: [FORM_ELEMENT_KEY] },
      conditions: [],
      value: {
        type: 'string',
        default: '',
      },
    },
    {
      key: REDIRECT_NEW_TAB_SETTING_KEY,
      description: 'Defines the redirect target, either on place or on a new tab.',
      appliedTo: { elements: [FORM_ELEMENT_KEY] },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
    {
      key: DISABLE_SETTING_KEY,
      description: 'Defines if the form should be disabled, preventing all submissions.',
      appliedTo: { elements: [FORM_ELEMENT_KEY] },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
    {
      key: ENHANCE_SETTING_KEY,
      description: 'Sends the data to the form action as a custom JavaScript Fetch instead of reloading the page.',
      appliedTo: { elements: [FORM_ELEMENT_KEY] },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
  ],
};
