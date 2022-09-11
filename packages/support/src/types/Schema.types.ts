import type { SupportedAttributeData } from '@finsweet/attributes-docs/src/utils/types';
import type {
  AttributeSchemaCondition,
  DOMSelector,
  AttributeElementSchema,
  AttributeSettingSchema,
  AttributeFieldSchema,
} from '@global/types/schema';

export type SCHEMA_ITEM_TYPES = 'settings' | 'elements' | 'fields';

export interface SchemaSettings {
  key: string;
  instance: number;
}

export interface AttributeLoaded extends SupportedAttributeData {
  loaded: boolean;
  schemaFile: string;
  scriptFile: string;
}

/**
 * Defines the Schema selector used in assertions services
 */
export interface SchemaSelector {
  attribute: string;
  value: string;
  initial: boolean;
  elements: HTMLElement[];
  setAttribute(attribute: string): void;
  setValue(value: string): void;
  getItemLabel: () => 'Element' | 'Setting';
  getAttribute: () => string;
  getValue: () => string;
  getElementSelector: () => string;
  getAttributeSelector: () => string;
  getPrettierSelector: () => string;
  getSelectors: (selectors: string[]) => string;
  getElementKey(): string;
  getInitial(): boolean;
}

export interface AttributeSchemaConditionNormalize {
  normalizeSelector: string;
  condition: AttributeSchemaCondition;
}

export type AppliedToSelector = (SchemaSelector | DOMSelector)[];

export interface ElementItemSelector {
  elementAttribute: AttributeElementSchema;
  elementSelector: SchemaSelector;
}

export interface ElementUI extends AttributeElementSchema {
  settings: AttributeSettingSchema[];
}

export interface FieldUI extends AttributeFieldSchema {
  settings: AttributeSettingSchema[];
  elements: AttributeElementSchema[];
}

export interface SchemaUI {
  requiredElements: ElementUI[];
  fields: FieldUI[];
  notRequiredElements: ElementUI[];
  settings: AttributeSettingSchema[];
  requiredInstance: boolean;
}
