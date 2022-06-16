import type { AttributeSchemaConditions, AttributeSchemaCondition } from '@global/types/schema';
import type { SchemaSelector } from '@src/types/Schema.types';

import AttributeNotHasLinkError from './Errors/AttributeNotHasLinkError';

export function hasLink(elementSelector: SchemaSelector, conditions: AttributeSchemaConditions) {
  conditions.forEach((condition: AttributeSchemaCondition) => {
    if (condition.condition !== 'hasLink') {
      throw new Error(`Unexpected error: Condition is other than hasStyle: ${condition.condition}`);
    }

    const element = document.querySelector<HTMLElement>(elementSelector.getElementSelector());

    if (!element) {
      throw new Error('Unexpected error: Element for hasStyle not found');
    }

    const item = element.querySelector('.w-dyn-item');
    const itemLink = item?.querySelector('a');

    if (!itemLink) {
      throw new AttributeNotHasLinkError(elementSelector);
    }

    return true;
  });
}
