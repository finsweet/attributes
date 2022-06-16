import SchemaSelector from '@src/services/Selector/SchemaSelector';

import FieldLinkMissingNestedCollectionError from './FieldLinkMissingNestedCollectionError';

describe('Field - Link - Main Collection Link Not Found Error', () => {
  test('Field is missing main link to collection', () => {
    const attribute = new SchemaSelector('fs-cmsnest-collection', 'attraction-categories');

    const error = new FieldLinkMissingNestedCollectionError(attribute);

    expect(error.stripHTML()).toEqual(
      'The Collection List on the Collection Template page is not found. Add a “attraction-categories” Collection List on the primary content Collection template page. Add the attribute fs-cmsnest-collection="attraction-categories" to the Collection List element.'
    );
  });
});
