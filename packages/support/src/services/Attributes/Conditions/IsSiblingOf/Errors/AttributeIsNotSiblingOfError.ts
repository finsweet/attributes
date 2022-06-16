import type { DOMSelector } from '@global/types/schema';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaSelector, ElementItemSelector } from '@src/types/Schema.types';

export default class AttributeIsNotParentOfElementError extends AbstractSchemaError {
  type = 'conditions-isSiblingOf';

  constructor(attribute: SchemaSelector, isSiblingOf: (ElementItemSelector | DOMSelector[])[]) {
    super();

    const attributeId = this.toAttribute(attribute.getPrettierSelector());

    const selectors = isSiblingOf
      .map((selectorsGroup: ElementItemSelector | DOMSelector[]) => {
        if (Object.prototype.hasOwnProperty.call(selectorsGroup, 'elementAttribute')) {
          const selectorsGroupElement = selectorsGroup as ElementItemSelector;
          const attributeSelector = this.selectorsToLabels(selectorsGroupElement.elementAttribute.appliedTo, 'or');
          const attributeInnerId = this.toAttribute(selectorsGroupElement.elementSelector.getPrettierSelector());
          return `${attributeSelector} with the attribute ${attributeInnerId}`;
        }

        const selectorsGroupDOM = selectorsGroup as DOMSelector[];
        return this.selectorsToLabels(selectorsGroupDOM, 'or');
      })
      .join(' and ');

    this.message = [
      this.toHighlight(`The attribute ${attributeId} is found, but not in the correct location.`),
      `Move ${attributeId} to be a sibling of a ${selectors}.`,
    ].join(' ');

    Object.setPrototypeOf(this, AttributeIsNotParentOfElementError.prototype);
  }
}
