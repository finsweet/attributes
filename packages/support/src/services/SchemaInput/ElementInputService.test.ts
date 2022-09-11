import type { SchemaInput, SchemaInputElement } from '@src/types/Input.types';

import { addElement, deleteElement } from './ElementInputService';

describe('Test element', () => {
  const config = {
    instance: 1,
    key: 'cmsload',
  };

  it('Add element', () => {
    const initialValues: SchemaInput[] = [];

    const values = addElement(initialValues, 'list', config);

    expect(values.length).toBe(1);

    const elementInput = values[0] as SchemaInputElement;

    expect(elementInput.element).toEqual('list');
    expect(elementInput.instance).toEqual(1);
    expect(elementInput.key).toEqual('cmsload');
  });

  it('Delete element', () => {
    const elementList: SchemaInputElement = {
      type: 'element',
      element: 'list',
      validation: null,
      instance: 1,
      key: 'cmsload',
    };

    const elementButton: SchemaInputElement = {
      type: 'element',
      element: 'button',
      validation: null,
      instance: 1,
      key: 'cmsload',
    };

    const initialValues: SchemaInput[] = [elementList, elementButton];

    const values = deleteElement(initialValues, 'list', config);

    expect(values.length).toBe(1);

    expect((values[0] as SchemaInputElement).element).toEqual('button');
  });
});
