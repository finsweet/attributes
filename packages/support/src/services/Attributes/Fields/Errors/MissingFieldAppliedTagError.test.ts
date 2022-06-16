import SchemaSelector from '@src/services/Selector/SchemaSelector';

import MissingFieldAppliedTagError from './MissingFieldAppliedTagError';

describe('Missing field applied tag error.', () => {
  test('Field is missing correct html tag with parent.', () => {
    const attribute = new SchemaSelector('fs-cmsfilter-field', 'products', true);

    const selectors = [
      {
        label: 'Checkbox Label',
        selectors: [],
      },
    ];

    const error = new MissingFieldAppliedTagError(attribute, selectors);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsfilter-field="products" is found, but not on the correct element. Move fs-cmsfilter-field="products" to the Checkbox Label.'
    );
  });

  test('Field is missing correct html tag without parent.', () => {
    const attribute = new SchemaSelector('fs-cmsfilter-field', 'products', true);

    const selectors = [
      {
        label: 'Checkbox Label',
        selectors: [],
      },
    ];

    const error = new MissingFieldAppliedTagError(attribute, selectors);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsfilter-field="products" is found, but not on the correct element. Move fs-cmsfilter-field="products" to the Checkbox Label.'
    );
  });
});
