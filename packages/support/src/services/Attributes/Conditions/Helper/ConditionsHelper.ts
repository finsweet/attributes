import type {
  AttributeSchemaConditions,
  AttributeSchemaCondition,
  AttributeMainCondition,
  DOMSelector,
  AttributeSchema,
} from '$global/types/schema';
import type { SchemaSettings } from '@src/types/Schema.types';
import { createSchemaSelectorFromSchema } from '@src/services/Attributes/Schema/SchemaService';

export function getConditionsSelectors(
  conditions: AttributeSchemaConditions,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): string[] {
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

  return flatSelectors;
}
