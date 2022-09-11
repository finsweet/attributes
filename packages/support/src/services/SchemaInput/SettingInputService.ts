import type { SchemaForm, SchemaInputConfig, SchemaInputSetting } from '@src/types/Input.types';

export function findSetting(
  values: SchemaForm,
  settingKey: string,
  config: SchemaInputConfig
): SchemaInputSetting | undefined {
  const setting = values.find(
    (item) =>
      item.type === 'setting' &&
      item.setting === settingKey &&
      item.key === config.key &&
      item.instance === config.instance
  );

  if (setting) {
    return setting as SchemaInputSetting;
  }
  return undefined;
}

/**
 * Field Setting
 */
export function addSetting(
  values: SchemaForm,
  settingKey: string,
  settingValue: string,
  config: SchemaInputConfig
): SchemaForm {
  const valuesWithSetting: SchemaForm = [
    ...values,
    {
      type: 'setting',
      enable: true,
      setting: settingKey,
      option: settingValue,
      validation: null,
      ...config,
    },
  ];

  return valuesWithSetting;
}

export function enableSetting(values: SchemaForm, settingKey: string, config: SchemaInputConfig) {
  const settingObject = findSetting(values, settingKey, config);

  if (!settingObject) {
    throw new Error(`Trying to enable a setting that does not exist ${settingKey}`);
  }

  const restValues = values.filter((item) => item !== settingObject);

  return [
    ...restValues,
    {
      ...settingObject,
      enable: true,
    },
  ];
}

export function disableSetting(values: SchemaForm, settingKey: string, config: SchemaInputConfig) {
  const settingObject = findSetting(values, settingKey, config);

  if (!settingObject) {
    throw new Error(`Trying to disable a setting that does not exist ${settingKey}`);
  }

  const restValues = values.filter((item) => item !== settingObject);

  return [
    ...restValues,
    {
      ...settingObject,
      enable: false,
      validation: null,
    },
  ];
}

export function setSettingOption(values: SchemaForm, settingKey: string, option: string, config: SchemaInputConfig) {
  const settingObject = findSetting(values, settingKey, config);

  if (!settingObject) {
    throw new Error('Trying to update an element setting that does not exist');
  }

  const restValues = values.filter((item) => item !== settingObject);

  return [
    ...restValues,
    {
      ...settingObject,
      option: option,
    },
  ];
}

export function findSettingIndex(values: SchemaForm, settingKey: string, config: SchemaInputConfig) {
  const index = values.findIndex(
    (item) =>
      item.type === 'setting' &&
      item.setting === settingKey &&
      item.instance === config.instance &&
      item.key === config.key
  );

  if (index === -1) {
    return null;
  }

  return index;
}

export function setElementSettingOption(
  values: SchemaForm,
  settingKey: string,
  option: string,
  config: SchemaInputConfig
) {
  const settingObject = findSetting(values, settingKey, config);

  if (!settingObject) {
    throw new Error('Trying to update an element setting that does not exist');
  }

  const restValues = values.filter((item) => item !== settingObject);

  return [
    ...restValues,
    {
      ...settingObject,
      option: option,
    },
  ];
}
