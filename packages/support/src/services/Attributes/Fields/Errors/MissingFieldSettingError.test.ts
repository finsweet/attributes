import SchemaSelector from '@src/services/Selector/SchemaSelector';

import MissingFieldSettingError from './MissingFieldSettingError';

describe('Missing field settings error.', () => {
  test('Missing field setting with specialization', () => {
    const attribute = new SchemaSelector('fs-cmsfilter-range', 'from', true);
    const field = new SchemaSelector('fs-cmsfilter-field', 'products', true);

    const error = new MissingFieldSettingError(attribute, field);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsfilter-range="from" is not found. Add attribute fs-cmsfilter-range="from" to any element with fs-cmsfilter-field="products".'
    );
  });

  test('Missing field without specialization', () => {
    const attribute = new SchemaSelector('fs-cmsfilter-active', 'my-class', true);
    const field = new SchemaSelector('fs-cmsfilter-field', 'products', true);

    const error = new MissingFieldSettingError(attribute, field);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsfilter-active="my-class" is not found. Add attribute fs-cmsfilter-active="my-class" to any element with fs-cmsfilter-field="products".'
    );
  });
});
