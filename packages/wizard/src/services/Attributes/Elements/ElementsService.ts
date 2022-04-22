import { getSchemaItem, createSchemaSelectorFromItem } from '@src/services/Attributes/Schema/SchemaService';
import { elementExists, elementDuplicated, domElementExists } from '@src/services/Attributes/Exists/ExistsService';
import { elementAppliedTo } from '@src/services/Attributes/AppliedTo/AppliedToService';
import useElementsConditions from '@src/services/Attributes/Conditions/ConditionsService';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import { queryAllElements } from '@src/services/DOM/Queries/QueriesService';
import type { AttributeSchema, AttributeElementSchema } from '@global/types/schema';
import type { SchemaInputElement, InputChannel } from '@src/types/Input.types';
import type { SchemaSettings } from '@src/types/Schema.types';

/**
 * Run assertions on item of type Element to check if it meets expectations.
 *
 * @param inputElement
 * @param schema
 * @param schemaSettings
 * @returns
 */
export function validateElement(
  inputElement: SchemaInputElement,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): InputChannel {

  const elementSchema = getSchemaItem(schema, 'elements', inputElement.element) as AttributeElementSchema;
  const elementSelector = createSchemaSelectorFromItem(
    elementSchema,
    'elements',
    inputElement.element,
    schemaSettings
  );

  const { appliedTo, conditions } = elementSchema;


  const htmlElements = queryAllElements(elementSelector.getElementSelector());

  try {

    domElementExists(elementSelector, appliedTo);
    elementExists(elementSelector, htmlElements, appliedTo);

    if (
      (elementSchema as AttributeElementSchema).requiresInstance === true
      && (elementSchema as AttributeElementSchema).multiplesInInstance === false
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
        domElement: Array.from(htmlElements),
        input: {
          ...inputElement,
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
      }

    } else {
      throw error;
    }
  }

  return {
    domElement: Array.from(htmlElements),
    input: {
      ...inputElement,
      validation: {
        status: true,
        messages: [
          {
            message: `Yup! Element ${elementSelector.getPrettierSelector()} correctly setup.`,
            type: 'success',
          }
        ]
      }
    }
  }
}
