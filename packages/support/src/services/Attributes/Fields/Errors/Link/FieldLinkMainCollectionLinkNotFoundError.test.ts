import SchemaSelector from '@src/services/Selector/SchemaSelector';

import FieldLinkMainCollectionLinkNotFoundError from './FieldLinkMainCollectionLinkNotFoundError';

describe('Field - Link - Main Collection Link Not Found Error', () => {
  test('Field is missing main link to collection', () => {
    const attribute = new SchemaSelector('fs-cmsfilter-field', 'attraction-categories');

    const error = new FieldLinkMainCollectionLinkNotFoundError(attribute);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsfilter-field="attraction-categories" is found, but there is no url link in the CMS Collection Item. Add a Link Block or Text Link inside the Collection Item that links to the Item’s Template page.'
    );
  });
});
