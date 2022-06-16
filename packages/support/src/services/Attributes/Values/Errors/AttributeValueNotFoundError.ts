import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaSelector } from '@src/types/Schema.types';

export default class AttributeValueNotFoundError extends AbstractSchemaError {
  type = 'attribute-value-not-found';

  constructor(attribute: SchemaSelector, element: SchemaSelector) {
    super();

    const attributeId = this.toAttribute(attribute.getPrettierSelector());
    const elementId = this.toAttribute(element.getPrettierSelector());

    this.message = [
      this.toHighlight(`Attribute ${attributeId} found but not match expected element.`),
      `Add or move the attribute ${attributeId} to ${elementId}.`,
    ].join(' ');
    // this.message = `Attribute ${attribute} - Expected value "${inputValue}" not match page attribute "${domValue}"`;
    // this.tips = `Change the value of attribute ${attribute} from "${domValue}" to "${inputValue}"`;

    Object.setPrototypeOf(this, AttributeValueNotFoundError.prototype);
  }
}
