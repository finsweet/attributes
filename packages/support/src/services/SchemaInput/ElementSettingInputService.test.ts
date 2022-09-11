import type { SchemaInput, SchemaInputElement, SchemaInputElementSetting } from '@src/types/Input.types';

import {
  addElementSetting,
  enableElementSetting,
  disableElementSetting,
  getElementSettingOption,
  setElementSettingOption,
} from './ElementSettingInputService';

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
