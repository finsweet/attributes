import type { AttributeStyleConditionStyles } from '@global/types/schema';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaSelector } from '@src/types/Schema.types';

export default class AttributeIsNotParentOfElementError extends AbstractSchemaError {
  type = 'conditions-hasStyles';

  constructor(attribute: SchemaSelector, style: AttributeStyleConditionStyles) {
    super();

    const attributeId = this.toAttribute(attribute.getPrettierSelector());

    this.message = [
      this.toHighlight(`The attribute ${attributeId} is found, but does not match the required style.`),
      `Set the css property of this element to "${style.property}: ${style.value}".`,
    ].join(' ');

    Object.setPrototypeOf(this, AttributeIsNotParentOfElementError.prototype);
  }
}
