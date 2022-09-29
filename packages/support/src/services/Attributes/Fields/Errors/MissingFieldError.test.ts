import type { ParentSelector } from '$global/types/schema';
import SchemaSelector from '@src/services/Selector/SchemaSelector';

import MissingFieldError from './MissingFieldError';

describe('Missing field.', () => {
  test('Missing field', () => {
    const attribute = new SchemaSelector('fs-cmsfield-field', 'products', true);

    const parent: ParentSelector = [
      {
        type: 'element',
        element: 'list',
      },
      {
        type: 'selector',
        selector: {
          selectors: ['div'],
          label: 'Div Block',
        },
      },
    ];

    const error = new MissingFieldError(attribute, parent);

    expect(error.stripHTML()).toEqual(
      'Attribute fs-cmsfield-field="products" in list>Div Block was not found. Add fs-cmsfield-field="products" in the children list>Div Block on the page.'
    );
  });

  test('Missing field without parent specialization', () => {
    const attribute = new SchemaSelector('fs-cmsfield-field', 'products', true);

    const error = new MissingFieldError(attribute, null);

    expect(error.stripHTML()).toEqual(
      'Attribute fs-cmsfield-field="products" was not found. Add fs-cmsfield-field="products" to the page.'
    );
  });
});
