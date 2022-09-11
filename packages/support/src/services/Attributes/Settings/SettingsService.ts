import type {
  AttributeSchema,
  AttributeSettingSchema,
  AttributeSchemaConditions,
  AttributeValue,
  DOMSelector,
} from '@global/types/schema';
import { elementAppliedTo } from '@src/services/Attributes/AppliedTo/AppliedToService';
import conditionsService, { filterElementsByConditions } from '@src/services/Attributes/Conditions/ConditionsService';
import { settingExists } from '@src/services/Attributes/Exists/ExistsService';
import { getSchemaItem, createSchemaSelectorFromItem } from '@src/services/Attributes/Schema/SchemaService';
import { checkSettingValue } from '@src/services/Attributes/Values/ValuesService';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaInputSetting, SchemaInput } from '@src/types/Input.types';
import type { SchemaSettings, SchemaSelector } from '@src/types/Schema.types';

export function validateSetting(
  inputSetting: SchemaInputSetting,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): SchemaInput {
  const settingSchema = getSchemaItem(schema, 'settings', inputSetting.setting) as AttributeSettingSchema;

  const { appliedTo, conditions, value } = settingSchema;

  const settingSelector = createSchemaSelectorFromItem(
    settingSchema,
    'settings',
    inputSetting.setting,
    schemaSettings,
    inputSetting.option
  );

  if (!appliedTo.selectors) {
    throw new Error('Unexpected error: Settings without applied to selectors must belong to elements or fields.');
  }

  try {
    validateDefaultSetting(
      inputSetting,
      settingSelector,
      appliedTo.selectors,
      conditions,
      value,
      schema,
      schemaSettings
    );
  } catch (error) {
    if (error instanceof AbstractSchemaError) {
      return {
        ...inputSetting,
        validation: {
          status: false,
          messages: [
            {
              type: error.type,
              message: error.message,
            },
          ],
        },
      };
    } else {
      throw error;
    }
  }

  return {
    ...inputSetting,
    validation: {
      status: true,
      messages: [
        {
          message: `Yup! Setting ${settingSelector.getPrettierSelector()} correctly setup.`,
          type: 'success',
        },
      ],
    },
  };
}

export function validateDefaultSetting(
  inputSetting: SchemaInputSetting,
  settingSelector: SchemaSelector,
  appliedTo: DOMSelector[],
  conditions: AttributeSchemaConditions,
  value: AttributeValue | AttributeValue[],
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
) {
  const settingsElements = settingExists(settingSelector, appliedTo);
  settingSelector.elements = settingsElements;

  if (appliedTo && appliedTo) {
    elementAppliedTo(settingsElements, appliedTo, settingSelector);
  }

  if (conditions && conditions.length) {
    conditionsService(settingSelector, conditions, schema, schemaSettings);
  }

  const filteredElements = filterElementsByConditions(settingSelector.elements, conditions, schema, schemaSettings);

  filteredElements.forEach((element) => {
    checkSettingValue(element, settingSelector, value, inputSetting.option);
  });

  return true;
}
