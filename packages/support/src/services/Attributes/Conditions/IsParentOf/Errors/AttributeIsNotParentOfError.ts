import type { DOMSelector } from '$global/types/schema';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaSelector } from '@src/types/Schema.types';

export default class AttributeIsNotChildrenOfSelectorError extends AbstractSchemaError {
  type = 'conditions-isParentOf';

  constructor(attribute: SchemaSelector, childOfSelectors: DOMSelector[][]) {
    super();

    const selectors = childOfSelectors
      .map((selectorsGroup: DOMSelector[]) => {
        return this.selectorsToLabels(selectorsGroup, 'or');
      })
      .join(' and ');

    const attributeId = this.toAttribute(attribute.getPrettierSelector());

    this.message = [
      this.toHighlight(`The attribute ${attributeId} is found, but not in the correct location.`),
      `Move ${attributeId} to be a parent of the ${selectors}`,
    ].join(' ');

    Object.setPrototypeOf(this, AttributeIsNotChildrenOfSelectorError.prototype);
  }
}
