import type { ParentSelector } from '$global/types/schema';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaSelector } from '@src/types/Schema.types';

export default class MissingFieldAppliedError extends AbstractSchemaError {
  type = 'field-not-found';

  constructor(attribute: SchemaSelector, parentSelector: ParentSelector | null) {
    super();

    const attributeId = this.toAttribute(attribute.getPrettierSelector());

    if (parentSelector) {
      const parentLabels = this.parentToLabels(parentSelector);

      this.message = [
        this.toHighlight(`Attribute ${attributeId} in ${parentLabels} was not found.`),
        `Add ${attributeId} in the children ${parentLabels} on the page.`,
      ].join(' ');
    }

    if (parentSelector === null) {
      this.message = [
        this.toHighlight(`Attribute ${attributeId} was not found.`),
        `Add ${attributeId} to the page.`,
      ].join(' ');
    }

    Object.setPrototypeOf(this, MissingFieldAppliedError.prototype);
  }
}
