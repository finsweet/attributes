import type {
  AttributeElementSchema,
  AttributeSchemaCondition,
  AttributeMainCondition,
  AttributeSelectorCondition,
} from '@global/types/schema';
import CUSTOM_SELECT from '@src/schemas/custom-select';
import SchemaSelector from '@src/services/Selector/SchemaSelector';

import AttributeIsNotParentOfError from './AttributeIsNotParentOfError';

describe('Test Error - Attribute not found', () => {
  test('Attribute type element not found', () => {
    const attributeSelector = new SchemaSelector('fs-customselect-element', 'dropdown', true);

    const attributePageButton = CUSTOM_SELECT.elements.find(
      (value: AttributeElementSchema) => value.key === 'dropdown'
    );
    if (!attributePageButton) {
      throw new Error('Unexpected error: Missing dropdown on custom select schema');
    }

    const attributePageButtonIsChildOf = attributePageButton.conditions.filter(
      (value: AttributeSchemaCondition) => value.condition === 'isParentOf'
    ) as AttributeMainCondition[];

    const attributePageButtonSelector = attributePageButtonIsChildOf.find(
      (value: AttributeMainCondition) => value.type === 'selector'
    );

    if (!attributePageButtonSelector) {
      throw new Error('Unexpected error: Missing is child of selector in page button on cms-load schema');
    }

    const appliedToSelector = (attributePageButtonSelector as AttributeSelectorCondition).selector;
    const isParentOf = [appliedToSelector];

    const error = new AttributeIsNotParentOfError(attributeSelector, isParentOf);
    expect(error.stripHTML()).toEqual(
      'The attribute fs-customselect-element="dropdown" is found, but not in the correct location. Move fs-customselect-element="dropdown" to be a parent of the Select'
    );
  });
});
