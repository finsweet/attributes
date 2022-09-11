import type {
  AttributeSchema,
  AttributeElementSchema,
  AttributeSettingSchema,
  AttributeFieldSchema,
  AttributeSettingCondition,
  AttributeSettingConditionSetting,
  AttributeSchemaCondition,
} from '@global/types/schema';
import SchemaSelector from '@src/services/Selector/SchemaSelector';
import type { SchemaInput } from '@src/types/Input.types';
import type { SchemaSettings, SCHEMA_ITEM_TYPES } from '@src/types/Schema.types';

/**
 * Create the SchemaSelector for elements
 *
 * @param element key of the element
 * @param schemaSettings schema settings
 * @param requiresInstance boolean if the element requires an instance
 * @returns
 */
export function createElementSelector(
  element: string,
  schemaSettings: SchemaSettings,
  requiresInstance: boolean,
  caseInsensitive = false
): SchemaSelector {
  const { key, instance } = schemaSettings;

  const selectorAttr = `fs-${key}-element`;
  const selectorValue = instance > 1 && requiresInstance ? `${element}-${instance}` : element;

  return new SchemaSelector(selectorAttr, selectorValue, instance === 1, caseInsensitive);
}

/**
 * Create the ISchemaAttribute for settings
 *
 * @param setting key of the setting
 * @param option value of the setting
 * @param key schema setting key
 * @returns
 */
export function createSettingSelector(setting: string, option: string | null, key: string): SchemaSelector {
  const selectorAttr = `fs-${key}-${setting}`;
  const selectorValue = option || '';

  return new SchemaSelector(selectorAttr, selectorValue);
}

/**
 * Get Schema Item from the AttributeSchema by SCHEMA_ITEM_TYPES type and schema item key.
 *
 * @param schema AttributeSchema
 * @param type elements | settings
 * @param schemaItemKey key of the elements or settings
 * @returns
 */
export function getSchemaItem(
  schema: AttributeSchema,
  type: SCHEMA_ITEM_TYPES,
  schemaItemKey: string
): AttributeElementSchema | AttributeSettingSchema | AttributeFieldSchema {
  // Find items of the schema type
  const attributesByType = schema[type];

  if (!attributesByType) {
    throw new Error(`Missing attribute type ${type} in schema`);
  }

  // Find items by schema item key
  const attributeElement = (attributesByType as unknown as { key: string }[]).find(
    (attribute) => attribute.key === schemaItemKey
  );

  if (!attributeElement) {
    throw new Error(`Missing ${type} with key ${schemaItemKey} in schema`);
  }

  // return as Field
  if (type === 'fields') {
    return attributeElement as AttributeFieldSchema;
  }

  // return as Element
  if (type === 'elements') {
    return attributeElement as AttributeElementSchema;
  }

  // return as Setting
  return attributeElement as AttributeSettingSchema;
}

/**
 * Handle AttributeSchema for elements and settings by AttributeElementSchema or AttributeSettingSchema
 */
export function createSchemaSelectorFromItem(
  schemaItem: AttributeElementSchema | AttributeSettingSchema | AttributeFieldSchema,
  schemaType: string,
  attributeKey: string,
  schemaSettings: SchemaSettings,
  option: string | null = null
) {
  switch (schemaType) {
    case 'elements': {
      const { requiresInstance, caseInsensitive } = schemaItem as AttributeElementSchema;
      return createElementSelector(attributeKey, schemaSettings, requiresInstance, caseInsensitive);
    }

    case 'settings':
    case 'fields': {
      return createSettingSelector(attributeKey, option, schemaSettings.key);
    }

    default: {
      throw new Error(`Unknown schema type ${schemaType}`);
    }
  }
}

/**
 * Find the schema AttributeElementSchema or AttributeSettingSchema
 * by the schema key and schema item key and return the schema selector
 */
export function createSchemaSelectorFromSchema(
  schema: AttributeSchema,
  schemaType: 'elements' | 'settings' | 'fields',
  attributeKey: string | undefined,
  schemaSettings: SchemaSettings,
  option?: string | null
) {
  if (!attributeKey) {
    throw new Error('Missing schema Key');
  }
  const schemaItem = getSchemaItem(schema, schemaType, attributeKey);

  if (!schemaItem) {
    throw new Error(`Missing schema element ${schemaType} ${attributeKey}`);
  }

  return createSchemaSelectorFromItem(schemaItem, schemaType, attributeKey, schemaSettings, option);
}

/**
 * Check if AttributeSettingSchema match the schema settings condition.
 */
export function checkSettingCondition(
  elementOrSetting: AttributeSettingSchema | AttributeElementSchema,
  form: SchemaInput[],
  config: SchemaSettings
): boolean {
  let localEnable = true;

  if (!elementOrSetting || !elementOrSetting.conditions || elementOrSetting.conditions.length === 0) {
    return localEnable;
  }

  const conditions = elementOrSetting.conditions.filter((condition) => condition.condition === 'settings');

  if (!conditions || conditions.length === 0) {
    return localEnable;
  }

  conditions.forEach((condition: AttributeSchemaCondition) => {
    const conditionsSettings = (condition as AttributeSettingCondition).settings;

    conditionsSettings.forEach((conditionSetting: AttributeSettingConditionSetting) => {
      const settingInForm = form.find(
        (item) =>
          (item.type === 'elementSetting' || item.type === 'fieldSetting') &&
          item.setting == conditionSetting.key &&
          item.option === conditionSetting.value &&
          item.instance === config.instance &&
          item.key === config.key &&
          item.enable === true
      );

      if (!settingInForm) {
        localEnable = false;
      }
    });
  });

  return localEnable;
}
