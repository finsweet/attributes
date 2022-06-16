import type {
  AttributeSchemaConditions,
  AttributeSchemaCondition,
  AttributeStyleCondition,
  AttributeStyleConditionStyles,
} from '@global/types/schema';
import type { SchemaSelector } from '@src/types/Schema.types';

import AttributeNotHasStyleError from './Errors/AttributeNotHasStyleError';

export function hasStyle(elementSelector: SchemaSelector, conditions: AttributeSchemaConditions) {
  conditions.forEach((condition: AttributeSchemaCondition) => {
    if (condition.condition !== 'hasStyle') {
      throw new Error(`Unexpected error: Condition is other than hasStyle: ${condition.condition}`);
    }

    const conditionHasStyle = condition as AttributeStyleCondition;

    const element = document.querySelector<HTMLElement>(elementSelector.getElementSelector());

    if (!element) {
      throw new Error('Unexpected error: Element for hasStyle not found');
    }

    const computedStyles = window.getComputedStyle(element);

    const styles = conditionHasStyle.styles;

    styles.forEach((style: AttributeStyleConditionStyles) => {
      const computedProperty = computedStyles.getPropertyValue(style.property);

      if (computedProperty !== style.value) {
        throw new AttributeNotHasStyleError(elementSelector, style);
      }
    });
  });
  return true;
}
