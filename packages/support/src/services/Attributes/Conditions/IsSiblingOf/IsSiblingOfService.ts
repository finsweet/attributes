import type {
  AttributeSchema,
  AttributeSchemaConditions,
  AttributeSchemaCondition,
  AttributeMainCondition,
  DOMSelector,
  AttributeElementSchema,
} from '@global/types/schema';
import {
  createSchemaSelectorFromSchema,
  createSchemaSelectorFromItem,
  getSchemaItem,
} from '@src/services/Attributes/Schema/SchemaService';
import {
  assertElementIsSiblingOfElement,
  assertElementIsSiblingOfElements,
} from '@src/services/DOM/Assertions/AssertionsService';
import type { SchemaSelector, SchemaSettings, ElementItemSelector } from '@src/types/Schema.types';

import AttributeIsNotSiblingOfError from './Errors/AttributeIsNotSiblingOfError';

export function isSiblingOf(
  elementSelector: SchemaSelector,
  conditions: AttributeSchemaConditions,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
) {
  const selectors: (string | string[])[] = conditions.map((condition: AttributeSchemaCondition) => {
    const typeCondition = condition as AttributeMainCondition;

    if (typeCondition.type === 'element') {
      const conditionSchemaSelector = createSchemaSelectorFromSchema(
        schema,
        'elements',
        typeCondition.element,
        schemaSettings
      );
      return conditionSchemaSelector.getElementSelector();
    }

    if (typeCondition.type === 'selector') {
      return typeCondition.selector.map((domSelector: DOMSelector) => domSelector.selectors.join(','));
    }

    throw new Error(`Error in bounds of condition`);
  });

  const flatSelectors: string[] = selectors.flat();

  let isValid = true;
  try {
    assertElementIsSiblingOfElements(elementSelector.elements, flatSelectors);
  } catch (e) {
    isValid = false;
  }

  if (!isValid) {
    const notSiblingOfConditions: AttributeSchemaCondition[] = conditions.filter(
      (condition: AttributeSchemaCondition) => {
        const typeCondition = condition as AttributeMainCondition;

        if (typeCondition.type === 'element') {
          const conditionSchemaSelector = createSchemaSelectorFromSchema(
            schema,
            'elements',
            typeCondition.element,
            schemaSettings
          );

          try {
            assertElementIsSiblingOfElement(
              elementSelector.getElementSelector(),
              conditionSchemaSelector.getElementSelector()
            );
            return false;
          } catch {
            return true;
          }
        }

        if (typeCondition.type === 'selector') {
          const conditionSchemaSelector = typeCondition.selector
            .map((domSelector: DOMSelector) => domSelector.selectors.join(','))
            .join(',');

          try {
            assertElementIsSiblingOfElement(elementSelector.getElementSelector(), conditionSchemaSelector);
            return false;
          } catch {
            return true;
          }
        }

        return false;
      }
    );

    const notSiblingOfSelectors: (ElementItemSelector | DOMSelector[])[] = notSiblingOfConditions.map(
      (condition: AttributeSchemaCondition) => {
        const typeCondition = condition as AttributeMainCondition;

        if (typeCondition.type === 'element') {
          const elementSchema = getSchemaItem(schema, 'elements', typeCondition.element) as AttributeElementSchema;
          const elementSelector = createSchemaSelectorFromItem(
            elementSchema,
            'elements',
            typeCondition.element,
            schemaSettings
          );
          return {
            elementSelector: elementSelector,
            elementAttribute: elementSchema,
          };
        }

        if (typeCondition.type === 'selector') {
          return typeCondition.selector;
        }

        throw new Error('Condition out of bounds');
      }
    );

    if (notSiblingOfConditions.length <= 0) {
      throw new Error('Unexpected error: not sibling of condition is empty.');
    }

    throw new AttributeIsNotSiblingOfError(elementSelector, notSiblingOfSelectors);
  }

  return true;
}

// /**
//  * Assert if item is child of element in condition.
//  * Use when item has single isChild condition.
//  */
//  export function isSiblingOfService(elementSelector: SchemaSelector, conditionSelector: SchemaSelector | string) {
//   if (typeof conditionSelector === 'string') {

//     try {
//       assertElementIsSiblingOfElement(elementSelector.getElementSelector(), conditionSelector);
//       return true;
//     } catch {
//       throw new AttributeIsNotSiblingOfSelectorError(elementSelector, conditionSelector);
//     }

//   }

//   try {
//     assertElementIsSiblingOfElement(elementSelector.getElementSelector(), conditionSelector.getElementSelector());
//     return true;
//   } catch {
//     throw new AttributeIsNotSiblingOfElementError(elementSelector, conditionSelector);
//   }

// }
