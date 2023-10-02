import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = ['form', 'error-show', 'success-show', 'submit'] as const satisfies AttributeElements;

export const SETTINGS = {
  required: { key: 'required', values: { true: 'true' } },
  errorclass: { key: 'errorclass' },
  successclass: { key: 'successclass' },
  minlength: { key: 'minlength' },
  maxlength: { key: 'maxlength' },
  minvalue: { key: 'minvalue' },
  maxvalue: { key: 'maxvalue' },
  reject: { key: 'reject' },
  debounce: { key: 'debounce' },
} as const satisfies AttributeSettings;
