import SchemaSelector from '@src/services/Selector/SchemaSelector';

import ComponentLinkNotWorkingError from './ComponentLinkNotWorkingError';

describe('Missing field applied tag error.', () => {
  test('Field is missing correct html tag with parent.', () => {
    const attribute = new SchemaSelector('fs-richtext-component', 'my-component=http://google.com');

    const error = new ComponentLinkNotWorkingError(attribute);

    expect(error.stripHTML()).toEqual(
      'Link for fs-richtext-component="my-component=http://google.com" is not working. Check if the link to the external page is published and correctly entered in the attribute value.'
    );
  });
});
