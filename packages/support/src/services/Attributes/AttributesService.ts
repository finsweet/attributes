import type { AttributeSchema, AttributeElementSchema } from '$global/types/schema';
import type { SchemaInput } from '@src/types/Input.types';
import type { SchemaInputFieldSetting, InputChannel } from '@src/types/Input.types';
import type { SchemaSettings } from '@src/types/Schema.types';

import { validateSetting } from './Settings/SettingsService';
import { validateElement } from './Elements/ElementsService';
import { validateElementSetting } from './Elements/ElementsSettingsService';
import { validateFieldElement } from './Fields/FieldsElementsService';
import { validateField } from './Fields/FieldsService';
import { validateFieldSetting } from './Fields/FieldsSettingsService';

/**
 * Validate attributes schema by user input
 *
 * @param schemaInput Array of User Input
 * @param schema Attribute Schema
 * @param schemaSettings Attribute Schema Settings
 * @returns
 */
export async function validateInputForm(
  schemaInput: SchemaInput[],
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): Promise<SchemaInput[]> {
  const elementsAndFields = schemaInput.filter(
    (input: SchemaInput) =>
      (input.type === 'element' || input.type === 'field') &&
      input.instance === schemaSettings.instance &&
      input.key === schemaSettings.key
  );

  const fieldElements = schemaInput.filter(
    (input: SchemaInput) =>
      input.type === 'fieldElement' && input.instance === schemaSettings.instance && input.key === schemaSettings.key
  );

  const settings = schemaInput.filter(
    (input: SchemaInput) =>
      (input.type === 'elementSetting' || input.type === 'fieldSetting' || input.type === 'setting') &&
      input.instance === schemaSettings.instance &&
      input.key === schemaSettings.key &&
      Object.prototype.hasOwnProperty.call(input, 'enable') &&
      (input as SchemaInputFieldSetting).enable === true
  );

  const rest = schemaInput.filter(
    (input: SchemaInput) =>
      input.instance !== schemaSettings.instance ||
      input.key !== schemaSettings.key ||
      (Object.prototype.hasOwnProperty.call(input, 'enable') && (input as SchemaInputFieldSetting).enable === false)
  );

  const promisesElements = elementsAndFields.map(async (input: SchemaInput): Promise<InputChannel> => {
    if (input.type === 'element') {
      return validateElement(input, schema, schemaSettings);
    }

    if (input.type === 'field') {
      return await validateField(input, schema, schemaSettings);
    }

    throw new Error('Type not found');
  });

  const elementsAndFieldsChannel: InputChannel[] = await Promise.all(promisesElements);

  const fieldsElementsChannel = fieldElements.map((input: SchemaInput) => {
    if (input.type === 'fieldElement') {
      const fieldChannel = elementsAndFieldsChannel.find(
        (attributeChannel) =>
          attributeChannel.input.type === 'field' &&
          attributeChannel.input.field === input.field &&
          attributeChannel.input.index === input.index
      );

      // if (fieldChannel?.input.validation?.status === false) {
      //   return input;
      // }

      if (!fieldChannel) {
        throw new Error('Input error, missing field channel');
      }

      return validateFieldElement(input, fieldChannel, schema, schemaSettings);
    }
    throw new Error('Type not found');
  });

  const promisesSettings = settings.map(async (input: SchemaInput) => {
    if (input.type === 'elementSetting') {
      const elementChannel = elementsAndFieldsChannel.find(
        (attributeChannel) =>
          attributeChannel.input.type === 'element' && attributeChannel.input.element === input.element
      );

      if (!elementChannel) {
        throw new Error('Input error, missing element channel');
      }

      return validateElementSetting(input, elementChannel, schema, schemaSettings);
    }

    if (input.type === 'fieldSetting') {
      const fieldChannel = elementsAndFieldsChannel.find(
        (attributeChannel) =>
          attributeChannel.input.type === 'field' &&
          attributeChannel.input.field === input.field &&
          attributeChannel.input.index === input.index
      );

      if (!fieldChannel) {
        throw new Error('Input error, missing field channel');
      }

      return validateFieldSetting(input, fieldChannel, schema, schemaSettings);
    }

    if (input.type === 'setting') {
      return validateSetting(input, schema, schemaSettings);
    }

    throw new Error('Type not found');
  });

  const settingsChannel = await Promise.all(promisesSettings);

  const input = [
    ...elementsAndFieldsChannel.map((attribute: InputChannel) => attribute.input),
    ...fieldsElementsChannel,
    ...settingsChannel,
    ...rest,
  ];

  return input;
}

export function resetInputForm(
  schemaInput: SchemaInput[],
  schemaData: AttributeSchema | null,
  schemaSettings: SchemaSettings
): SchemaInput[] {
  const requiredItems =
    schemaData?.elements
      .filter((element: AttributeElementSchema) => element.required === true)
      .map((element: AttributeElementSchema) => element.key) || [];

  return schemaInput
    .filter((input: SchemaInput) => {
      if (input.instance !== schemaSettings.instance || input.key !== schemaSettings.key) {
        return true;
      }

      if (requiredItems.indexOf(input.key) !== -1) {
        return true;
      }

      if (input.type === 'field') {
        return true;
      }

      return false;
    })
    .map((input: SchemaInput) => {
      if (input.instance !== schemaSettings.instance || input.key !== schemaSettings.key) {
        return input;
      }

      if (input.type === 'fieldSetting' || input.type === 'elementSetting') {
        return {
          ...input,
          enable: false,
          validation: null,
        };
      }

      if (input.type === 'field') {
        return {
          ...input,
          identifier: '',
          specialization: '',
          validation: null,
        };
      }
      return { ...input, validation: null };
    });
}
