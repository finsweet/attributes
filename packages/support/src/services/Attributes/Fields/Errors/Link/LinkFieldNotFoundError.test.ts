import SchemaSelector from '@src/services/Selector/SchemaSelector';

import LinkFieldNotFoundError from './LinkFieldNotFoundError';

describe('Field not found - Link', () => {
  test('Link field not found', () => {
    const attribute = new SchemaSelector('fs-cmsnest-collection', 'categories');

    const error = new LinkFieldNotFoundError(attribute);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsnest-collection="categories" is not found on the page. Add this attribute to a Div Block in the primary Collection List. Additionally add this attribute to the hidden Collection List that will be nested.'
    );
  });
});
