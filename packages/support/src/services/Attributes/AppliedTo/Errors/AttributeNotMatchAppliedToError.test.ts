import type { AttributeElementSchema } from '$global/types/schema';
import CMS_LOAD from '@src/schemas/cms-load';
import SchemaSelector from '@src/services/Selector/SchemaSelector';

import AttributeNotMatchAppliedToError from './AttributeNotMatchAppliedToError';

describe('Test Error - Attribute not found', () => {
  test('Attribute type element not found', () => {
    const attributeSelector = new SchemaSelector('fs-cmsload-element', 'list', true);

    const attributeSchema = CMS_LOAD.elements.find((value: AttributeElementSchema) => value.key === 'list');
    if (!attributeSchema) {
      throw new Error('Unexpected error: Missing list on cms-load schema');
    }

    const appliedTo = attributeSchema.appliedTo;

    const error = new AttributeNotMatchAppliedToError(attributeSelector, appliedTo);
    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsload-element="list" is found, but on the wrong element. Move the attribute fs-cmsload-element="list" to the Collection List.'
    );
  });
});
