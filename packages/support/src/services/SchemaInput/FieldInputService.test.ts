import type { SchemaInput, SchemaInputField } from '@src/types/Input.types';

import { addField, deleteField, setFieldIdentifier, setFieldSpecialization } from './FieldInputService';

describe('Test field', () => {
  const config = {
    instance: 1,
    key: 'cmsload',
  };

  it('Add field', () => {
    const initialValues: SchemaInput[] = [];

    const values = addField(initialValues, 'field', config);

    expect(values.length).toBe(1);

    const fieldInput = values[0] as SchemaInputField;

    expect(fieldInput.field).toEqual('field');
    expect(fieldInput.index).toEqual('field-1');
    expect(fieldInput.identifier).toEqual('');
    expect(fieldInput.specialization).toEqual('');
    expect(fieldInput.instance).toEqual(1);
    expect(fieldInput.key).toEqual('cmsload');
  });

  it('Delete field', () => {
    const initialValues: SchemaInput[] = [
      {
        field: 'field',
        index: 'field-1',
        specialization: '',
        identifier: '',
        type: 'field',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
    ];

    const values = deleteField(initialValues, 'field', 'field-1', config);

    expect(values.length).toBe(0);
  });

  it('Update identifier', () => {
    const initialValues: SchemaInput[] = [
      {
        field: 'field',
        index: 'field-1',
        specialization: '',
        identifier: '',
        type: 'field',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
      {
        field: 'field',
        index: 'field-2',
        specialization: '',
        identifier: '',
        type: 'field',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
    ];

    const update1 = setFieldIdentifier(initialValues, 'field', 'field-1', 'my-field', config);
    const update2 = setFieldIdentifier(update1, 'field', 'field-2', 'my-another-field', config);

    expect(update2.length).toBe(2);

    expect((update2[0] as SchemaInputField).identifier).toBe('my-field');
    expect((update2[1] as SchemaInputField).identifier).toBe('my-another-field');
  });

  it('Update specialization', () => {
    const initialValues: SchemaInput[] = [
      {
        field: 'field',
        index: 'field-1',
        specialization: '',
        identifier: '',
        type: 'field',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
      {
        field: 'field',
        index: 'field-2',
        specialization: '',
        identifier: '',
        type: 'field',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
    ];

    const update1 = setFieldSpecialization(initialValues, 'field', 'field-1', 'radio-button', config);
    const update2 = setFieldSpecialization(update1, 'field', 'field-2', 'checkbox', config);

    expect(update2.length).toBe(2);

    expect((update2[0] as SchemaInputField).specialization).toBe('radio-button');
    expect((update2[1] as SchemaInputField).specialization).toBe('checkbox');
  });
});
