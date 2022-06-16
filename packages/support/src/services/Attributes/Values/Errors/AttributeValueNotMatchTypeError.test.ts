import SchemaSelector from '@src/services/Selector/SchemaSelector';

import AttributeValueNotMatchTypeError from './AttributeValueNotMatchTypeError';

describe('Test Error - Attribute duplicated', () => {
  test('Attribute type element duplicated', () => {
    const attributeSelector = new SchemaSelector('fs-cmsload-duration', 'abc', true);

    const expectedType = 'float';

    const error = new AttributeValueNotMatchTypeError(attributeSelector, expectedType);
    expect(error.stripHTML()).toEqual(
      'The value of fs-cmsload-duration is not in the correct format. Change to valid float format.'
    );
  });
});
