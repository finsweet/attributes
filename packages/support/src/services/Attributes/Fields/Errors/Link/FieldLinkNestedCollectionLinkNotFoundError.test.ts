import SchemaSelector from '@src/services/Selector/SchemaSelector';

import FieldLinkNestedCollectionLinkNotFoundError from './FieldLinkNestedCollectionLinkNotFoundError';

describe('Field - Link - Nested Collection Link Not Found Error', () => {
  test('Field is missing nested link to collection item', () => {
    const attribute = new SchemaSelector('fs-cmsnest-collection', 'attraction-categories');

    const error = new FieldLinkNestedCollectionLinkNotFoundError(attribute);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsnest-collection="attraction-categories" is found on the Collection’s Template page, but is missing the url link to each item. Add a Link Block or Text Link inside the Collection Item on the CMS Template page.'
    );
  });
});
