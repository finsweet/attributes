import {
  getSchemaItem,
  createSchemaSelectorFromItem,
  createSchemaSelectorFromSchema,
} from '@src/services/Attributes/Schema/SchemaService';
import { elementSettingExists } from '@src/services/Attributes/Exists/ExistsService';
import { elementSettingAppliedTo, elementsSameNode } from '@src/services/Attributes/AppliedTo/AppliedToService';
import conditionsService from '@src/services/Attributes/Conditions/ConditionsService';
import valuesService from '@src/services/Attributes/Values/ValuesService';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaInputElementSetting, InputChannel  } from '@src/types/Input.types';
import type { AttributeElementSchema, AttributeSchema, AttributeSettingSchema } from '@src/global/types/schema';
import type { SchemaSettings, ElementItemSelector } from '@src/types/Schema.types';


function appliedToSelectors(
  appliedTo: string[] | undefined,
  input: SchemaInputElementSetting,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): ElementItemSelector[] {

  if (appliedTo === undefined) {
    return [];
  }
  if (appliedTo.length <= 0) {
    return [];
  }

  return appliedTo
    .filter((appliedToElement: string) => {
      return appliedToElement === input.element
    })
    .map((appliedToElement: string) => {


      const elementItem = getSchemaItem(schema, 'elements', appliedToElement) as AttributeElementSchema;

      const elementSelector = createSchemaSelectorFromSchema(
        schema,
        'elements',
        appliedToElement,
        schemaSettings,
        null,
      );

      return {
        elementAttribute: elementItem,
        elementSelector: elementSelector,
      }


  });
}

/**
 * Run assertions on item of type Settings to check if it meets expectations.
 */
export function validateElementSetting(
  inputSetting: SchemaInputElementSetting,
  element: InputChannel,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): SchemaInputElementSetting {


  const settingSchema = getSchemaItem(schema, 'settings', inputSetting.setting) as AttributeSettingSchema;
  const { appliedTo, conditions, value } = settingSchema;


  const settingSelector = createSchemaSelectorFromItem(
    settingSchema,
    'settings',
    inputSetting.setting,
    schemaSettings,
    inputSetting.option
  );

  try {
    const elementsSelectors: ElementItemSelector[] = appliedToSelectors(appliedTo.elements, inputSetting, schema, schemaSettings);

    elementSettingExists(settingSelector, elementsSelectors);

    if (appliedTo && appliedTo.elements) {

      const appliedToElement = elementSettingAppliedTo(
        settingSelector,
        elementsSelectors,
      );

      if (appliedToElement && element.domElement) {
        elementsSameNode(settingSelector, [appliedToElement], element.domElement);
      }
    }

    if (conditions && conditions.length > 0) {
      conditionsService(settingSelector, conditions, schema, schemaSettings);
    }

    valuesService(settingSelector, value, inputSetting.option, elementsSelectors.map((value: ElementItemSelector) => value.elementSelector));
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
            }
          ]
        }
      }

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
        }
      ]
    }
  }
}
