import SchemaSelector from '@src/services/Selector/SchemaSelector';

import AttributeDuplicatedError from './AttributeDuplicatedError';

describe('Test Error - Attribute duplicated', () => {
  test('Attribute type element duplicated', () => {
    const attributeSelector = new SchemaSelector('fs-cmsload-element', 'list', true);

    const error = new AttributeDuplicatedError(attributeSelector);
    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsload-element="list" is found duplicated on the page. Remove the duplicated attributes from the page.'
    );
  });
});
