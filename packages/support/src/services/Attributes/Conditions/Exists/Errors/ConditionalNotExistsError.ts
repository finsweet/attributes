import type { DOMSelector } from '@global/types/schema';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaSelector } from '@src/types/Schema.types';

export default class AttributeConditionalNotExistError extends AbstractSchemaError {
  type = 'conditions-exists';

  constructor(attribute: SchemaSelector, conditional: SchemaSelector | null, appliedToConditional: DOMSelector[]) {
    super();

    const selectorsLabels = this.selectorsToLabels(appliedToConditional, 'or');

    const attributeId = this.toAttribute(attribute.getPrettierSelector());

    if (conditional) {
      const conditionalId = this.toAttribute(conditional.getPrettierSelector());

      this.message = [
        this.toHighlight(`The attribute ${attributeId} is found, but is missing a required attribute in the setup.`),
        `Add ${conditionalId} to a ${selectorsLabels}.`,
      ].join(' ');
    }

    if (conditional === null) {
      this.message = [
        this.toHighlight(`The attribute ${attributeId} is found, but is missing a required component in the setup.`),
        `Add ${selectorsLabels}.`,
      ].join(' ');
    }

    Object.setPrototypeOf(this, AttributeConditionalNotExistError.prototype);
  }
}
