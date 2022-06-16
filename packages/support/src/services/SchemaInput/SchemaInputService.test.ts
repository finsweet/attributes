import type {
  SchemaInput,
  SchemaInputElement,
  SchemaInputElementSetting,
  SchemaInputField,
  SchemaInputFieldSetting,
} from '@src/types/Input.types';

import {
  addElement,
  deleteElement,
  addElementSetting,
  enableElementSetting,
  disableElementSetting,
  getElementSettingOption,
  setElementSettingOption,
  addField,
  deleteField,
  setFieldidentifier,
  setFieldSpecialization,
  addFieldSetting,
  enableFieldSetting,
  disableFieldSetting,
  setFieldSettingOption,
  getFieldSettingOption,
} from './SchemaInputService';

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

describe('Test element settings', () => {
  const config = {
    instance: 1,
    key: 'cmsload',
  };
  it('Add element setting', () => {
    const initialValues: SchemaInput[] = [
      {
        type: 'element',
        element: 'list',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
    ];

    const values = addElementSetting(initialValues, 'list', 'threshold', '-20', config);

    expect(values.length).toBe(2);

    const setting = values[1] as SchemaInputElementSetting;

    expect(setting.element).toEqual('list');
    expect(setting.setting).toEqual('threshold');
    expect(setting.enable).toBe(true);
    expect(setting.type).toBe('elementSetting');
    expect(setting.option).toBe('-20');
    expect(setting.instance).toBe(1);
    expect(setting.key).toBe('cmsload');
  });

  it('Enable element setting', () => {
    const elementList: SchemaInputElement = {
      type: 'element',
      element: 'list',
      validation: null,
      instance: 1,
      key: 'cmsload',
    };

    const elementSetting: SchemaInputElementSetting = {
      type: 'elementSetting',
      element: 'list',
      validation: null,
      enable: false,
      setting: 'threshold',
      option: '-30',
      instance: 1,
      key: 'cmsload',
    };
    const initialValues: SchemaInput[] = [elementList, elementSetting];

    const values = enableElementSetting(initialValues, 'list', 'threshold', config);
    expect(values.length).toBe(2);

    const setting = values[1] as SchemaInputElementSetting;
    expect(setting.enable).toBe(true);
  });

  it('Disable element setting', () => {
    const elementList: SchemaInputElement = {
      type: 'element',
      element: 'list',
      validation: null,
      instance: 1,
      key: 'cmsload',
    };

    const elementSetting: SchemaInputElementSetting = {
      type: 'elementSetting',
      element: 'list',
      validation: null,
      enable: true,
      setting: 'threshold',
      option: '-30',
      instance: 1,
      key: 'cmsload',
    };

    const initialValues: SchemaInput[] = [elementList, elementSetting];

    const values = disableElementSetting(initialValues, 'list', 'threshold', config);
    expect(values.length).toBe(2);

    const setting = values[1] as SchemaInputElementSetting;
    expect(setting.enable).toBe(false);
  });

  it('Set element setting', () => {
    const initialValues: SchemaInput[] = [
      {
        type: 'element',
        element: 'list',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
      {
        type: 'elementSetting',
        element: 'list',
        validation: null,
        enable: true,
        setting: 'threshold',
        option: '-30',
        instance: 1,
        key: 'cmsload',
      },
    ];

    const values = setElementSettingOption(initialValues, 'list', 'threshold', '-4000', config);
    expect(values.length).toBe(2);

    const setting = values[1] as SchemaInputElementSetting;
    expect(setting.option).toBe('-4000');
  });

  it('Get element setting option', () => {
    const initialValues: SchemaInput[] = [
      {
        type: 'element',
        element: 'list',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
      {
        type: 'elementSetting',
        element: 'list',
        validation: null,
        enable: true,
        setting: 'threshold',
        option: '-30',
        instance: 1,
        key: 'cmsload',
      },
    ];

    expect(getElementSettingOption(initialValues, 'list', 'threshold', config)).toBe('-30');
  });
});

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

    const update1 = setFieldidentifier(initialValues, 'field', 'field-1', 'my-field', config);
    const update2 = setFieldidentifier(update1, 'field', 'field-2', 'my-another-field', config);

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

describe('Test field settings', () => {
  const config = {
    instance: 1,
    key: 'cmsload',
  };

  test('Add field setting', () => {
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

    const values = addFieldSetting(initialValues, 'field', 'field-1', 'threshold', '-30', config);

    const setting = values[1] as SchemaInputFieldSetting;

    expect(setting.field).toEqual('field');
    expect(setting.index).toEqual('field-1');
    expect(setting.setting).toEqual('threshold');
    expect(setting.enable).toBe(true);
    expect(setting.type).toBe('fieldSetting');
    expect(setting.option).toBe('-30');
  });

  test('Enable field setting', () => {
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
        index: 'field-1',
        setting: 'threshold',
        option: '-50',
        enable: false,
        type: 'fieldSetting',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
    ];

    const values = enableFieldSetting(initialValues, 'field', 'field-1', 'threshold', config);

    const setting = values[1] as SchemaInputFieldSetting;

    expect(setting.enable).toBe(true);
  });

  test('Disable field setting', () => {
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
        index: 'field-1',
        setting: 'threshold',
        option: '-50',
        enable: true,
        type: 'fieldSetting',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
    ];

    const values = disableFieldSetting(initialValues, 'field', 'field-1', 'threshold', config);

    const setting = values[1] as SchemaInputFieldSetting;

    expect(setting.enable).toBe(false);
  });

  test('Update field setting option', () => {
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
        index: 'field-1',
        setting: 'threshold',
        option: '-50',
        enable: true,
        type: 'fieldSetting',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
    ];

    const values = setFieldSettingOption(initialValues, 'field', 'field-1', 'threshold', '-5000', config);

    const setting = values[1] as SchemaInputFieldSetting;

    expect(setting.option).toBe('-5000');
  });

  test('Get field setting option', () => {
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
        index: 'field-1',
        setting: 'threshold',
        option: '-50',
        enable: true,
        type: 'fieldSetting',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
      {
        field: 'field',
        index: 'field-2',
        setting: 'threshold',
        option: '-70',
        enable: true,
        type: 'fieldSetting',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
    ];
    expect(getFieldSettingOption(initialValues, 'field', 'field-1', 'threshold', config)).toBe('-50');
    expect(getFieldSettingOption(initialValues, 'field', 'field-2', 'threshold', config)).toBe('-70');
  });
});
