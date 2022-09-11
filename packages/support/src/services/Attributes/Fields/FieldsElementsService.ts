import type { AttributeSchema, AttributeElementSchema } from '@global/types/schema';
import { elementAppliedTo } from '@src/services/Attributes/AppliedTo/AppliedToService';
import useElementsConditions from '@src/services/Attributes/Conditions/ConditionsService';
import { elementExists, elementDuplicated, domElementExists } from '@src/services/Attributes/Exists/ExistsService';
import {
  getSchemaItem,
  createSchemaSelectorFromItem,
  createSchemaSelectorFromSchema,
} from '@src/services/Attributes/Schema/SchemaService';
import { queryAllElements } from '@src/services/DOM/Queries/QueriesService';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaInputFieldElement, InputChannel, SchemaInput, SchemaInputField } from '@src/types/Input.types';
import type { SchemaSettings } from '@src/types/Schema.types';

/**
 * Run assertions on item of type Element to check if it meets expectations.
 *
 * @param inputFieldElement
 * @param schema
 * @param schemaSettings
 * @returns
 */
export function validateFieldElement(
  inputFieldElement: SchemaInputFieldElement,
  fieldChannel: InputChannel,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): SchemaInput {
  const elementSchema = getSchemaItem(schema, 'elements', inputFieldElement.element) as AttributeElementSchema;
  const elementSelector = createSchemaSelectorFromItem(
    elementSchema,
    'elements',
    inputFieldElement.element,
    schemaSettings
  );

  const fieldInput = fieldChannel.input as SchemaInputField;

  const fieldSelector = createSchemaSelectorFromSchema(
    schema,
    'fields',
    fieldInput.field,
    schemaSettings,
    fieldInput.identifier
  );

  const { appliedTo, conditions } = elementSchema;

  const htmlElements = queryAllElements(elementSelector.getSelectors([fieldSelector.getElementSelector()], ''));

  try {
    domElementExists(elementSelector, appliedTo);
    elementExists(elementSelector, htmlElements, appliedTo);

    if (
      (elementSchema as AttributeElementSchema).requiresInstance === true &&
      (elementSchema as AttributeElementSchema).multiplesInInstance === false
    ) {
      elementDuplicated(htmlElements, elementSelector);
    }

    elementSelector.setElements(Array.from(htmlElements));

    if (appliedTo && Array.isArray(appliedTo) && appliedTo.length > 0) {
      elementAppliedTo(htmlElements, appliedTo, elementSelector);
    }

    if (conditions && conditions.length > 0) {
      useElementsConditions(elementSelector, conditions, schema, schemaSettings);
    }
  } catch (error: unknown) {
    if (error instanceof AbstractSchemaError) {
      return {
        ...inputFieldElement,
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
    ...inputFieldElement,
    validation: {
      status: true,
      messages: [
        {
          message: `Yup! Element ${elementSelector.getPrettierSelector()} correctly setup.`,
          type: 'success',
        },
      ],
    },
  };
}
