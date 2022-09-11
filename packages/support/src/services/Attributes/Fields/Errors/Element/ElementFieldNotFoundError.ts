import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaSelector } from '@src/types/Schema.types';

export default class ElementFieldNotFoundError extends AbstractSchemaError {
  type = 'field-element-not-found';

  constructor(attribute: SchemaSelector, element: SchemaSelector | null) {
    super();

    if (!element) {
      throw new Error('Unexpected error: missing element while validating selector');
    }

    const attributeId = this.toAttribute(attribute.getPrettierSelector());
    const elementId = this.toAttribute(element.getPrettierSelector());

    this.message = [
      `Attribute ${attributeId} with ${elementId} was not found. Add ${attributeId} with ${elementId} to the page.`,
    ].join(' ');

    Object.setPrototypeOf(this, ElementFieldNotFoundError.prototype);
  }
}
