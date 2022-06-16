import type {
  AttributeElementSchema,
  AttributeSchema,
  AttributeSettingSchema,
  AttributeSchemaSettingAppliedTo,
  AttributeSchemaConditions,
  AttributeValue,
} from '@global/types/schema';
import { elementSettingAppliedTo, elementsSameNode } from '@src/services/Attributes/AppliedTo/AppliedToService';
import conditionsService from '@src/services/Attributes/Conditions/ConditionsService';
import { elementSettingExists } from '@src/services/Attributes/Exists/ExistsService';
import {
  getSchemaItem,
  createSchemaSelectorFromItem,
  createSchemaSelectorFromSchema,
} from '@src/services/Attributes/Schema/SchemaService';
import valuesService from '@src/services/Attributes/Values/ValuesService';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaInputElementSetting, InputChannel } from '@src/types/Input.types';
import type { SchemaSettings, ElementItemSelector, SchemaSelector } from '@src/types/Schema.types';

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

  // console.log('validate setting');
  const { appliedTo, conditions, value } = settingSchema;

  const settingSelector = createSchemaSelectorFromItem(
    settingSchema,
    'settings',
    inputSetting.setting,
    schemaSettings,
    inputSetting.option
  );

  const isDefault = value.default === inputSetting.option && inputSetting.option != '';

  try {
    const elementsSelectors: ElementItemSelector[] = appliedToSelectors(
      appliedTo.elements,
      inputSetting,
      schema,
      schemaSettings
    );

    if (isDefault) {
      validateDefaultSetting(
        inputSetting,
        element,
        settingSelector,
        elementsSelectors,
        appliedTo,
        conditions,
        value,
        schema,
        schemaSettings
      );
    } else {
      validateCustomSetting(
        inputSetting,
        element,
        settingSelector,
        elementsSelectors,
        appliedTo,
        conditions,
        value,
        schema,
        schemaSettings
      );
    }
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
      return appliedToElement === input.element;
    })
    .map((appliedToElement: string) => {
      const elementItem = getSchemaItem(schema, 'elements', appliedToElement) as AttributeElementSchema;

      const elementSelector = createSchemaSelectorFromSchema(
        schema,
        'elements',
        appliedToElement,
        schemaSettings,
        null
      );

      return {
        elementAttribute: elementItem,
        elementSelector: elementSelector,
      };
    });
}

export function validateCustomSetting(
  inputSetting: SchemaInputElementSetting,
  inputChannel: InputChannel,
  settingSelector: SchemaSelector,
  elementsSelectors: ElementItemSelector[],
  appliedTo: AttributeSchemaSettingAppliedTo,
  conditions: AttributeSchemaConditions,
  value: AttributeValue,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
) {
  elementSettingExists(inputChannel.domElements, settingSelector, elementsSelectors, false);

  if (appliedTo && appliedTo.elements) {
    const appliedToElement = elementSettingAppliedTo(settingSelector, elementsSelectors);

    if (appliedToElement && inputChannel.domElements) {
      elementsSameNode([appliedToElement], inputChannel.domElements);
    }
  }

  if (conditions && conditions.length > 0) {
    conditionsService(settingSelector, conditions, schema, schemaSettings);
  }

  valuesService(
    settingSelector,
    value,
    inputSetting.option,
    elementsSelectors.map((value: ElementItemSelector) => value.elementSelector)
  );
}

export function validateDefaultSetting(
  inputSetting: SchemaInputElementSetting,
  inputChannel: InputChannel,
  settingSelector: SchemaSelector,
  elementsSelectors: ElementItemSelector[],
  appliedTo: AttributeSchemaSettingAppliedTo,
  conditions: AttributeSchemaConditions,
  value: AttributeValue,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
) {
  const isAttributeFound = elementSettingExists(inputChannel.domElements, settingSelector, elementsSelectors, true);

  if (appliedTo && appliedTo.elements && isAttributeFound) {
    const appliedToElement = elementSettingAppliedTo(settingSelector, elementsSelectors);

    if (appliedToElement && inputChannel.domElements) {
      elementsSameNode([appliedToElement], inputChannel.domElements);
    }
  }

  if (conditions && conditions.length > 0 && isAttributeFound) {
    conditionsService(settingSelector, conditions, schema, schemaSettings);
  }

  if (isAttributeFound) {
    valuesService(
      settingSelector,
      value,
      inputSetting.option,
      elementsSelectors.map((value: ElementItemSelector) => value.elementSelector)
    );
  }
}
