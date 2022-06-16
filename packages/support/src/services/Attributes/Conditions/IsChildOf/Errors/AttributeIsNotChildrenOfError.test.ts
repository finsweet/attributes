import type {
  AttributeElementSchema,
  AttributeSchemaCondition,
  AttributeMainCondition,
  AttributeSelectorCondition,
} from '@global/types/schema';
import CMS_LOAD from '@src/schemas/cms-load';
import SchemaSelector from '@src/services/Selector/SchemaSelector';

import AttributeIsNotChildrenOfError from './AttributeIsNotChildrenOfError';

describe('Test Error - Attribute not found', () => {
  test('Attribute type element not found', () => {
    const attributeSelector = new SchemaSelector('fs-cmsload-element', 'page-button', true);

    const attributeList = CMS_LOAD.elements.find((value: AttributeElementSchema) => value.key === 'list');
    if (!attributeList) {
      throw new Error('Unexpected error: Missing loader on cms-load schema');
    }

    const appliedToList = attributeList.appliedTo;

    const attributePageButton = CMS_LOAD.elements.find((value: AttributeElementSchema) => value.key === 'page-button');
    if (!attributePageButton) {
      throw new Error('Unexpected error: Missing page button on cms-load schema');
    }

    const attributePageButtonIsChildOf = attributePageButton.conditions.filter(
      (value: AttributeSchemaCondition) => value.condition === 'isChildOf'
    ) as AttributeMainCondition[];

    const attributePageButtonSelector = attributePageButtonIsChildOf.find(
      (value: AttributeMainCondition) => value.type === 'selector'
    );

    if (!attributePageButtonSelector) {
      throw new Error('Unexpected error: Missing is child of selector in page button on cms-load schema');
    }

    const appliedToSelector = (attributePageButtonSelector as AttributeSelectorCondition).selector;

    const isChildrenOf = [appliedToList, appliedToSelector];

    const error = new AttributeIsNotChildrenOfError(attributeSelector, isChildrenOf);
    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsload-element="page-button" is found, but not in the correct location. Move fs-cmsload-element="page-button" to be a child of the Collection List and Pagination Wrapper'
    );
  });
});
