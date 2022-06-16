import SchemaSelector from '@src/services/Selector/SchemaSelector';

import ComponentMissingExternalComponentError from './ComponentMissingExternalComponentError';

describe('Missing component on external page error.', () => {
  test('Field is missing component on external page.', () => {
    const attribute = new SchemaSelector('fs-richtext-component', 'my-component=http://google.com');

    const error = new ComponentMissingExternalComponentError(attribute);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-richtext-component="my-component=http://google.com" is not found on the external page. Add this attribute on the external page component.'
    );
  });
});
