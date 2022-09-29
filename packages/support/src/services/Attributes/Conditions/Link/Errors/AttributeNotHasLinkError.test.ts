import type { AttributeElementSchema } from '$global/types/schema';
import CMS_PREV_NEXT from '@src/schemas/cms-previous-next';
import SchemaSelector from '@src/services/Selector/SchemaSelector';

import AttributeNotHasLinkError from './AttributeNotHasLinkError';

describe('Test Error - Attribute not found', () => {
  test('Attribute type element not sibling of required element', () => {
    const attributeSelector = new SchemaSelector('fs-cmsprevnext-element', 'list', true);

    const attributeList = CMS_PREV_NEXT.elements.find((value: AttributeElementSchema) => value.key === 'list');
    if (!attributeList) {
      throw new Error('Unexpected error: Missing list on cms-prev-next schema');
    }

    const error = new AttributeNotHasLinkError(attributeSelector);
    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsprevnext-element="list" is found, but missing a required link in the Collection Item. Add a Link Block or Text Link to the Collection Item and link it to the Collection Item’s template page.'
    );
  });
});
