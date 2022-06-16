import type { DOMSelector } from '@global/types/schema';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaSelector } from '@src/types/Schema.types';

export default class AttributeNotMatchAppliedToError extends AbstractSchemaError {
  type = 'applied-to';

  constructor(attribute: SchemaSelector, selectors: DOMSelector[]) {
    super();

    const selectorsLabels = this.selectorsToLabels(selectors, 'or');
    const attributeId = this.toAttribute(attribute.getPrettierSelector());

    this.message = [
      this.toHighlight(`The attribute ${attributeId} is found, but on the wrong element.`),
      `Move the attribute ${attributeId} to the ${selectorsLabels}.`,
    ].join(' ');

    Object.setPrototypeOf(this, AttributeNotMatchAppliedToError.prototype);
  }
}
