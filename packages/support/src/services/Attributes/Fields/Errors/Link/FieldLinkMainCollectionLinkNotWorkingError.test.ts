import SchemaSelector from '@src/services/Selector/SchemaSelector';

import FieldLinkMainCollectionLinkNotWorkingError from './FieldLinkMainCollectionLinkNotWorkingError';

describe('Field - Link - Main Collection Link Not Found Error', () => {
  test('Field is missing main link to collection', () => {
    const attribute = new SchemaSelector('fs-cmsnest-collection', 'attraction-categories');

    const error = new FieldLinkMainCollectionLinkNotWorkingError(attribute);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsnest-collection="attraction-categories" is found, but the url link in the CMS Collection Item is not working. Check if the Link Block or Text Link have the correct link to the Item’s Template page.'
    );
  });
});
