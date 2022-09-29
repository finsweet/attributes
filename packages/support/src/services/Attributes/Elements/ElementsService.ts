import type { AttributeSchema, AttributeElementSchema } from '$global/types/schema';
import { elementAppliedTo } from '@src/services/Attributes/AppliedTo/AppliedToService';
import useElementsConditions from '@src/services/Attributes/Conditions/ConditionsService';
import { elementExists, elementDuplicated, domElementExists } from '@src/services/Attributes/Exists/ExistsService';
import { getSchemaItem, createSchemaSelectorFromItem } from '@src/services/Attributes/Schema/SchemaService';
import { queryAllElements } from '@src/services/DOM/Queries/QueriesService';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
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
  const elementSelector = createSchemaSelectorFromItem(elementSchema, 'elements', inputElement.element, schemaSettings);

  const { appliedTo, conditions, scope } = elementSchema;

  const selector =
    (scope &&
      `${scope.selectors.join(
        ','
      )} ${elementSelector.getElementSelector()}, ${elementSelector.getElementSelector()}`) ||
    elementSelector.getElementSelector();

  const htmlElements = queryAllElements(selector);

  try {
    domElementExists(elementSelector, appliedTo);
    elementExists(elementSelector, htmlElements, appliedTo);

    if (
      (elementSchema as AttributeElementSchema).requiresInstance === true &&
      (elementSchema as AttributeElementSchema).multiplesInInstance === false
    ) {
      elementDuplicated((scope && [htmlElements[0]]) || htmlElements, elementSelector);
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
        domElements: Array.from(htmlElements),
        input: {
          ...inputElement,
          validation: {
            status: false,
            messages: [
              {
                type: error.type,
                message: error.message,
              },
            ],
          },
        },
      };
    } else {
      throw error;
    }
  }

  return {
    domElements: Array.from(htmlElements),
    input: {
      ...inputElement,
      validation: {
        status: true,
        messages: [
          {
            message: `Yup! Element ${elementSelector.getPrettierSelector()} correctly setup.`,
            type: 'success',
          },
        ],
      },
    },
  };
}
