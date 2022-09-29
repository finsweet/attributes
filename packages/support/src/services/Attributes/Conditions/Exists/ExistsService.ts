import type {
  AttributeMainCondition,
  AttributeSchema,
  AttributeSchemaConditions,
  AttributeSchemaCondition,
  DOMSelector,
  AttributeElementSchema,
} from '$global/types/schema';
import ConditionalNotExistsError from '@src/services/Attributes/Conditions/Exists/Errors/ConditionalNotExistsError';
import { createSchemaSelectorFromItem, getSchemaItem } from '@src/services/Attributes/Schema/SchemaService';
import { assertElementExistsOnPage } from '@src/services/DOM/Assertions/AssertionsService';
import type { SchemaSelector, SchemaSettings } from '@src/types/Schema.types';

export function exists(
  elementSelector: SchemaSelector,
  conditions: AttributeSchemaConditions,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
) {
  conditions.forEach((condition: AttributeSchemaCondition) => {
    // Other conditions types should not been allowed.
    if (condition.condition !== 'exists') {
      throw new Error(`Unexpected error: Condition ${condition.condition} not respect bounds of exist condition`);
    }

    const existsCondition = condition as AttributeMainCondition;

    // No exists for selector.
    if (existsCondition.type === 'selector') {
      const domSelectors = existsCondition.selector;

      const existDOMSelector = domSelectors.some((domSelector: DOMSelector) => {
        const selectors = domSelector.selectors;

        const existSelector = selectors.some((selector: string) => {
          try {
            assertElementExistsOnPage(selector);
            return true;
          } catch {
            return false;
          }
        });
        return existSelector;
      });

      if (!existDOMSelector) {
        throw new ConditionalNotExistsError(elementSelector, null, domSelectors);
      }
    }

    if (existsCondition.type === 'element') {
      const existElement = getSchemaItem(schema, 'elements', existsCondition.element) as AttributeElementSchema;
      const existSelector = createSchemaSelectorFromItem(existElement, 'elements', existElement.key, schemaSettings);

      try {
        assertElementExistsOnPage(existSelector.getElementSelector());
        return;
      } catch {
        throw new ConditionalNotExistsError(elementSelector, existSelector, existElement.appliedTo);
      }
    }
  });
}
