import type { AttributeSchema } from '@global/types/schema';
import type {
  AttributeSettingSchema,
  SettingSpecialization,
  AttributeSchemaConditions,
  AttributeValue,
} from '@global/types/schema';
import { elementsSameNode } from '@src/services/Attributes/AppliedTo/AppliedToService';
// import existsService from '@src/services/Attributes/Exists/ExistsService';
// import appliedToService from '@src/services/Attributes/AppliedTo/AppliedToService';
import conditionsService from '@src/services/Attributes/Conditions/ConditionsService';
import {
  getSchemaItem,
  createSchemaSelectorFromItem,
  createSchemaSelectorFromSchema,
} from '@src/services/Attributes/Schema/SchemaService';
import { valueServiceV2 } from '@src/services/Attributes/Values/ValuesService';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type {
  SchemaInput,
  InputChannel,
  SchemaInputFieldSetting,
  SchemaInputField,
  InputValidationMessage,
} from '@src/types/Input.types';
import type { SchemaSelector, SchemaSettings } from '@src/types/Schema.types';

import MissingFieldSettingError from './Errors/MissingFieldSettingError';

interface InstanceConfig {
  value: string;
  isDefault: boolean;
}

export function validateFieldSetting(
  inputSetting: SchemaInputFieldSetting,
  field: InputChannel,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): SchemaInput {
  const settingSchema = getSchemaItem(schema, 'settings', inputSetting.setting) as AttributeSettingSchema;
  const { conditions, value, specializations } = settingSchema;

  const instances: InstanceConfig[] = (specializations &&
    specializations.map((specialization: SettingSpecialization) => ({
      value: specialization.value,
      isDefault: false,
    }))) || [
    { value: inputSetting.option, isDefault: value.default === inputSetting.option && inputSetting.option != '' },
  ];

  const validations = instances.map((instanceConfig: InstanceConfig) => {
    const settingSelector = createSchemaSelectorFromItem(
      settingSchema,
      'settings',
      inputSetting.setting,
      schemaSettings,
      instanceConfig.value
    );

    const fieldSelector = createSchemaSelectorFromSchema(
      schema,
      'fields',
      inputSetting.field,
      schemaSettings,
      (field.input as SchemaInputField).identifier
    );

    try {
      if (instanceConfig.isDefault) {
        validateDefaultSetting(
          fieldSelector,
          settingSelector,
          field,
          instanceConfig,
          conditions,
          value,
          schema,
          schemaSettings
        );
      } else {
        validateCustomSetting(
          fieldSelector,
          settingSelector,
          field,
          instanceConfig,
          conditions,
          value,
          schema,
          schemaSettings
        );
      }

      return null;
    } catch (error) {
      if (error instanceof AbstractSchemaError) {
        return {
          type: error.type,
          message: error.message,
        };
      } else {
        throw error;
      }
    }
  });

  const fieldErrors = validations.filter(
    (fieldApplied) => fieldApplied && fieldApplied.message
  ) as InputValidationMessage[];

  if (fieldErrors.length > 0) {
    return {
      ...inputSetting,
      validation: {
        status: false,
        messages: fieldErrors,
      },
    };
  }

  return {
    ...inputSetting,
    validation: {
      status: true,
      messages: [
        {
          type: 'success',
          message: `Yup! Setting correctly setup.`,
        },
      ],
    },
  };
}

function validateCustomSetting(
  fieldSelector: SchemaSelector,
  settingSelector: SchemaSelector,
  field: InputChannel,
  instanceConfig: InstanceConfig,
  conditions: AttributeSchemaConditions,
  value: AttributeValue,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
) {
  const fieldSettingSelector = `${fieldSelector.getElementSelector()}${settingSelector.getAttributeSelector()}`;
  const elementsNode = document.querySelectorAll<HTMLElement>(fieldSettingSelector);

  const elements = Array.from(elementsNode);

  if (elements.length <= 0 || field.domElements === null) {
    throw new MissingFieldSettingError(settingSelector, fieldSelector);
  }

  if (field.domElements) {
    elementsSameNode(elements, field.domElements);
  }

  if (conditions && conditions.length > 0) {
    conditionsService(settingSelector, conditions, schema, schemaSettings);
  }

  valueServiceV2(elements, settingSelector.getAttribute(), value, instanceConfig.value, settingSelector);
}

//function findMatchedElements()

function validateDefaultSetting(
  fieldSelector: SchemaSelector,
  settingSelector: SchemaSelector,
  field: InputChannel,
  instanceConfig: InstanceConfig,
  conditions: AttributeSchemaConditions,
  value: AttributeValue,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
) {
  const fieldSettingSelector = `${fieldSelector.getElementSelector()}${settingSelector.getAttributeSelector()}`;

  const elementsNode = Array.from(document.querySelectorAll<HTMLElement>(fieldSettingSelector));

  const elements: HTMLElement[] = elementsNode.filter((elementNode: HTMLElement) => {
    return (
      (field.domElements &&
        field.domElements.find((channelElement: HTMLElement) => channelElement.contains(elementNode))) ||
      false
    );
  });

  const isElementFound = elements.length > 0;

  if (field.domElements === null) {
    throw new MissingFieldSettingError(settingSelector, fieldSelector);
  }

  if (field.domElements && elements.length > 0) {
    elementsSameNode(elements, field.domElements);
  }

  if (isElementFound && conditions && conditions.length > 0) {
    conditionsService(settingSelector, conditions, schema, schemaSettings);
  }

  isElementFound &&
    valueServiceV2(elements, settingSelector.getAttribute(), value, instanceConfig.value, settingSelector);
}
