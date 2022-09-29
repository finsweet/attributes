import type { DOMSelector } from '$global/types/schema';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaSelector } from '@src/types/Schema.types';

export default class MissingFieldAppliedTagError extends AbstractSchemaError {
  type = 'field-selector';

  constructor(attribute: SchemaSelector, selectors: DOMSelector[]) {
    super();

    const selectorsLabels = this.selectorsToLabels(selectors, 'or');

    const attributeId = this.toAttribute(attribute.getPrettierSelector());

    this.message = [
      `The attribute ${attributeId} is found, but not on the correct element.`,
      `Move ${attributeId} to the ${selectorsLabels}.`,
    ].join(' ');

    Object.setPrototypeOf(this, MissingFieldAppliedTagError.prototype);
  }
}
