import SchemaSelector from '@src/services/Selector/SchemaSelector';

import ComponentFieldNotFoundError from './ComponentFieldNotFoundError';

describe('Field not found - Component', () => {
  test('Component field not found', () => {
    const attribute = new SchemaSelector('fs-richtext-component', 'my-component');

    const error = new ComponentFieldNotFoundError(attribute);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-richtext-component="my-component" is not found. Add fs-richtext-component="my-component" to the page.'
    );
  });
});
