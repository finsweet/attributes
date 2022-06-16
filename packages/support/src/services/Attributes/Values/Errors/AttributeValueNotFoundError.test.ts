import SchemaSelector from '@src/services/Selector/SchemaSelector';

import AttributeValueNotFoundError from './AttributeValueNotFoundError';

describe('Test Error - Attribute duplicated', () => {
  test('Attribute type element duplicated', () => {
    const attributeSelector = new SchemaSelector('fs-cmsload-mode', 'infinite', true);
    const elementSelector = new SchemaSelector('fs-cmsload-element', 'list');

    const error = new AttributeValueNotFoundError(attributeSelector, elementSelector);
    expect(error.stripHTML()).toEqual(
      `Attribute fs-cmsload-mode="infinite" found but not match expected element. Add or move the attribute fs-cmsload-mode="infinite" to fs-cmsload-element="list".`
    );
  });
});
