import SchemaSelector from '@src/services/Selector/SchemaSelector';

import FieldLinkNestedCollectionLinkNotWorkingError from './FieldLinkNestedCollectionLinkNotWorkingError';

describe('Field - Link - Nested Collection Link Not Working', () => {
  test('Field is missing nested link to collection item', () => {
    const attribute = new SchemaSelector('fs-cmsnest-collection', 'attraction-categories');

    const error = new FieldLinkNestedCollectionLinkNotWorkingError(attribute);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsnest-collection="attraction-categories" is found on the Collection’s CMS Template, but the link is not working. Check if the link to the Item’s Template page is correct.'
    );
  });
});
