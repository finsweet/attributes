import type {
  AttributeSchema,
  AttributeSchemaConditions,
  AttributeSchemaCondition,
  AttributeMainCondition,
  AttributeElementSchema,
  DOMSelector,
} from '@global/types/schema';
import { createSchemaSelectorFromSchema, getSchemaItem } from '@src/services/Attributes/Schema/SchemaService';
import {
  assertElementIsParentOfElement,
  assertElementIsParentOfElements,
} from '@src/services/DOM/Assertions/AssertionsService';
import type { SchemaSelector, SchemaSettings } from '@src/types/Schema.types';

import AttributeIsNotParentOfError from './Errors/AttributeIsNotParentOfError';

export function isParentOf(
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
    assertElementIsParentOfElements(elementSelector.elements, flatSelectors);
  } catch (e) {
    isValid = false;
  }

  if (!isValid) {
    const isParentOfConditions: AttributeSchemaCondition[] = conditions.filter(
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
            assertElementIsParentOfElement(
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
            assertElementIsParentOfElement(elementSelector.getElementSelector(), conditionSchemaSelector);
            return false;
          } catch {
            return true;
          }
        }

        return false;
      }
    );

    const isParentOfSelectors: DOMSelector[][] = isParentOfConditions.map((condition: AttributeSchemaCondition) => {
      const typeCondition = condition as AttributeMainCondition;

      if (typeCondition.type === 'element') {
        const elementSchema = getSchemaItem(schema, 'elements', typeCondition.element) as AttributeElementSchema;
        return elementSchema.appliedTo;
      }

      if (typeCondition.type === 'selector') {
        return typeCondition.selector;
      }

      throw new Error('Condition out of bounds');
    });

    if (isParentOfSelectors.length <= 0) {
      throw new Error('Unexpected error: not parent of condition is empty.');
    }
    throw new AttributeIsNotParentOfError(elementSelector, isParentOfSelectors);
  }
  return true;
}
