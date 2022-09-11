import type { DOMSelector } from '@global/types/schema';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
import type { SchemaSelector } from '@src/types/Schema.types';

export default class AttributeNotFoundError extends AbstractSchemaError {
  type = 'attribute-not-found';

  constructor(attribute: SchemaSelector, selectors: DOMSelector[] | undefined, isSetting: boolean) {
    super();

    const selectorsLabels = (selectors && this.selectorsToLabels(selectors, 'or')) || 'page';
    const attributeId = this.toAttribute(attribute.getPrettierSelector());
    const isSettingLabel = isSetting ? ' option ' : ' ';

    this.message = [
      this.toHighlight(`The attribute${isSettingLabel}${attributeId} is not found.`),
      `Add ${attributeId} to the ${selectorsLabels}.`,
    ].join(' ');

    Object.setPrototypeOf(this, AttributeNotFoundError.prototype);
  }
}
