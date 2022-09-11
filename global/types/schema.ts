export interface AttributeSchema {
  elements: AttributeElementSchema[];
  settings: AttributeSettingSchema[];
  fields?: AttributeFieldSchema[];
}

export interface DOMSelector {
  label: string;
  selectors: string[];
}

export interface ElementSelector {
  element: string;
  type: 'element';
}

export interface SelectorSelector {
  selector: DOMSelector;
  type: 'selector';
}

export type ParentSelector = (ElementSelector | SelectorSelector)[];

/**
 * Defines the schema for a CMS Collection or CMS Collection Field
 */
export interface AttributeFieldSchema {
  key: string;
  description: string;
  specializations: FieldSpecialization[];
}

/**
 * Defines the field specialization (Multiple places in html can have the same field)
 */
export interface FieldSpecialization {
  label: string;
  key: string;
  appliedTo: InstanceFieldSpecializationAppliedTo[];
}

/**
 * Defines setting specialization (Settings with multiple fields)
 */
export interface SettingSpecialization {
  value: string;
}

type FieldSpecializationTypes = 'default' | 'element' | 'link' | 'component';

/**
 * Defines the model for set field specialization in one place of html
 */
export interface InstanceFieldSpecializationAppliedTo {
  /** Expected parent where the field belong */
  parent: ParentSelector | null;
  /** Expected selectors where the field can belong */
  selectors?: DOMSelector[];
  /** Elements used in field */
  element?: string;
  /** Expected custom key for field */
  key?: string;
  /** Expected custom value for field */
  value?: string;
  /** Specialization type  */
  type: FieldSpecializationTypes;
}

/**
 * Defines the schema for an element attribute (`fs-ATTRIBUTE-element="ELEMENT_KEY"`).
 */
export interface AttributeElementSchema {
  /**
   * Represents an element reference like `fs-ATTRIBUTE-element="ELEMENT_KEY"`
   */
  key: string;

  /**
   * The description of the element.
   */
  description: string;

  /**
   * Defines if it's required to have it defined.
   */
  required: boolean;

  /**
   * Defines the available elements' selector that this attribute can be defined.
   * @example
   * ```
   * ['.w-dyn-list', '.w-dyn-items']
   * ```
   * Means that this attribute can be applied to an element that matches any of both selectors (use [Element.matches()](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches)).
   *
   * If the array is empty, it means that this attribute can be applied to any element on the page.
   */
  appliedTo: DOMSelector[];

  /**
   * Defines if this element requires an instance like `element-1` | `element-2`.
   * If `true`, all conditions that refer this element must also match the instance.
   */
  requiresInstance: boolean;

  /**
   * Defines is element is not unique in HTML. Used when element use same key and can be duplicated.
   */
  multiplesInInstance: boolean;

  /**
   *  Defines if selector is case insensitive
   */
  caseInsensitive?: boolean;

  /**
   * Defines which scopes should validate for multiples instances
   */
  scope?: DOMSelector;

  /**
   * Defines the conditions that this element must match to be valid.
   */
  conditions: AttributeSchemaConditions;
}

// type ConditionsTypes = 'exists' | 'isChildOf' | 'isParentOf' | 'isSiblingOf' | 'link' | 'style';

export type AttributeSchemaCondition =
  | AttributeMainCondition
  | AttributeSettingCondition
  | AttributeLinkCondition
  | AttributeStyleCondition;

export type AttributeSchemaConditions = AttributeSchemaCondition[];

export interface AttributeSchemaSettingAppliedTo {
  /**
   * Defines `ELEMENT_KEY`s from the schema.
   */
  elements?: string[];

  /**
   * Defines the field selectors
   */
  fields?: string[];

  /**
   * Defines applied to specificy specialization
   */
  specializations?: string[];

  /**
   * Defines selectors
   */
  selectors?: DOMSelector[];
}

/**
 * Defines the schema for a setting attribute (`fs-ATTRIBUTE-SETTING_KEY="VALUE"`).
 */
export interface AttributeSettingSchema {
  /**
   * Represents a setting reference like `fs-ATTRIBUTE-SETTING_KEY="SETTING_VALUE"`
   */
  key: string;

  /**
   * The description of the setting.
   */
  description: string;

  /**
   * Defines where this attribute can be applied.
   */
  appliedTo: AttributeSchemaSettingAppliedTo;

  /**
   * The possible SETTING_VALUEs to define.
   */
  value: AttributeValue | AttributeValue[];

  /**
   * Possible behaviors to apply to this setting.
   */
  specializations?: SettingSpecialization[];

  /**
   * The conditions that other elements/settings must match.
   */
  conditions: AttributeSchemaConditions;
}

interface AttributeSettingValue {
  /**
   * Shows if the attribute uses a default value when this setting is not set.
   */
  default?: string;
}

export type AttributeSettingValuePrimitive = AttributeSettingValue & {
  /**
   * The type of the value.
   */
  type: 'string' | 'boolean' | 'int' | 'float' | 'commaSeparatedFloat' | 'commaSeparatedInt' | 'commaSeparatedString';
};

export interface AttributeSettingValueOptionsOption {
  value: string;
  description: string;
}

export type AttributeSettingValueOptions = AttributeSettingValue & {
  /**
   * The type of the value.
   */
  type: 'options';

  /**
   *
   */
  options: Array<AttributeSettingValueOptionsOption>;
};

export type AttributeValue = AttributeSettingValuePrimitive | AttributeSettingValueOptions;

export interface AttributeElementCondition {
  /**
   * Defines an `ELEMENT_KEY` from the schema.
   */
  type: 'element';
  element: string;
}

export interface AttributeSelectorCondition {
  /**
   * Defines an element selector.
   */
  type: 'selector';
  selector: DOMSelector[];
}

export type AttributeMainCondition = (AttributeElementCondition | AttributeSelectorCondition) & {
  /**
   * The type of the value.
   */
  condition: 'exists' | 'isChildOf' | 'isParentOf' | 'isSiblingOf';
};

export type AttributeSettingCondition = AttributeElementCondition & {
  /**
   * The type of the value.
   */
  condition: 'settings';

  settings: Array<AttributeSettingConditionSetting>;
};

export type AttributeLinkCondition = {
  condition: 'hasLink';
};

export type AttributeStyleCondition = {
  condition: 'hasStyle';
  styles: AttributeStyleConditionStyles[];
};

export interface AttributeStyleConditionStyles {
  property: string;
  value: string | number;
}

export type ConditionTypes =
  | AttributeSettingCondition['condition']
  | AttributeMainCondition['condition']
  | AttributeStyleCondition['condition']
  | AttributeLinkCondition['condition'];

export interface AttributeSettingConditionSetting {
  /**
   * Defines a `SETTING_KEY` from the schema.
   */
  key: string;

  /**
   * Defines a setting value from the schema.
   */
  value: string;
}
