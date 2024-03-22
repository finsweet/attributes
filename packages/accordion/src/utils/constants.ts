import {
  ACCORDION_ATTRIBUTE,
  type AttributeElements,
  type AttributeSettings,
  LIST_ATTRIBUTE,
} from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines a group of accordion elements.
   */
  'group',

  /**
   * Defines an accordion element.
   */
  'accordion',

  /**
   * Defines a trigger element.
   */
  'trigger',

  /**
   * Defines a content element.
   */
  'content',

  /**
   * Defines an arrow element.
   */
  'arrow',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines if only one accordion can be open in a group at a time.
   */
  single: {
    key: 'single',
    values: { true: 'true' },
  },

  /**
   * Defines the initially open accordions in a group.
   * Accepts both {@link SETTINGS.initial.values.none} or any arbitrary numbers in a comma-separated list.
   */
  initial: {
    key: 'initial',
    values: { none: 'none' },
  },

  /**
   * Defines the active CSS class to add.
   * Defaults to {@link DEFAULT_ACTIVE_CLASS} when not defined.
   */
  active: {
    key: 'active',
  },
} as const satisfies AttributeSettings;

export const DEFAULT_ACTIVE_CLASS = `is-active-${ACCORDION_ATTRIBUTE}`;

export const LIST_ELEMENT_SELECTOR = `[fs-${LIST_ATTRIBUTE}-element="list"]`;
