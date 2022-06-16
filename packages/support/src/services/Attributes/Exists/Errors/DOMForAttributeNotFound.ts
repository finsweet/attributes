import type { DOMSelector } from '@global/types/schema';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaSelector } from '@src/types/Schema.types';

export default class DOMForAttributeNotFound extends AbstractSchemaError {
  type = 'element-not-found';

  constructor(attribute: SchemaSelector, selectors: DOMSelector[]) {
    super();

    const selectorsLabels = this.selectorsToLabels(selectors, 'or');
    const attributeId = this.toAttribute(attribute.getPrettierSelector());

    this.message = [
      `The ${selectorsLabels} is not found on the page. Add a ${selectorsLabels} component and then add ${attributeId} to it.`,
    ].join(' ');

    Object.setPrototypeOf(this, DOMForAttributeNotFound.prototype);
  }
}
