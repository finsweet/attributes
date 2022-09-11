import type { SchemaInput, SchemaInputFieldSetting } from '@src/types/Input.types';

import {
  addFieldSetting,
  enableFieldSetting,
  disableFieldSetting,
  setFieldSettingOption,
  getFieldSettingOption,
} from './FieldSettingInputService';

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
