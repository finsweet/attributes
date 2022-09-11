import type { SchemaForm, SchemaInputConfig, SchemaInput, SchemaInputFieldSetting } from '@src/types/Input.types';

export function findFieldSetting(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  settingKey: string,
  config: SchemaInputConfig
): SchemaInputFieldSetting | undefined {
  const setting = values.find(
    (item) =>
      item.type === 'fieldSetting' &&
      item.field === fieldKey &&
      item.index === fieldIndex &&
      item.setting === settingKey &&
      item.key === config.key &&
      item.instance === config.instance
  );

  if (setting) {
    return setting as SchemaInputFieldSetting;
  }
  return undefined;
}

export function findFieldSettingIndex(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  settingKey: string,
  config: SchemaInputConfig
): number | null {
  const index = values.findIndex(
    (item) =>
      item.type === 'fieldSetting' &&
      item.field === fieldKey &&
      item.index === fieldIndex &&
      item.setting === settingKey &&
      item.key === config.key &&
      item.instance === config.instance
  );

  if (index === -1) {
    return null;
  }

  return index;
}

/**
 * Field Setting
 */
export function addFieldSetting(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  settingKey: string,
  settingValue: string,
  config: SchemaInputConfig
): SchemaForm {
  const valuesWithElement: SchemaForm = [
    ...values,
    {
      type: 'fieldSetting',
      field: fieldKey,
      index: fieldIndex,
      enable: true,
      setting: settingKey,
      option: settingValue,
      validation: null,
      ...config,
    },
  ];
  return valuesWithElement;
}

export function enableFieldSetting(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  settingKey: string,
  config: SchemaInputConfig
): SchemaForm {
  const settingObject: SchemaInput | undefined = findFieldSetting(values, fieldKey, fieldIndex, settingKey, config);

  if (!settingObject) {
    throw new Error('Trying to enable a setting that does not exist');
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

export function disableFieldSetting(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  settingKey: string,
  config: SchemaInputConfig
): SchemaForm {
  const settingObject: SchemaInput | undefined = findFieldSetting(values, fieldKey, fieldIndex, settingKey, config);

  if (!settingObject) {
    throw new Error('Trying to disable a setting that does not exist');
  }

  const restValues = values.filter((item) => item !== settingObject);

  return [
    ...restValues,
    {
      ...settingObject,
      enable: false,
    },
  ];
}

export function disableFieldSettings(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  config: SchemaInputConfig
): SchemaForm {
  return values.map((schemaInput) => {
    if (schemaInput.type !== 'fieldSetting') {
      return schemaInput;
    }

    const fieldSettingInput = schemaInput as SchemaInputFieldSetting;

    if (
      fieldSettingInput.instance === config.instance &&
      fieldSettingInput.key === config.key &&
      fieldSettingInput.index === fieldIndex &&
      fieldSettingInput.field === fieldKey
    ) {
      return {
        ...fieldSettingInput,
        enable: false,
        validation: null,
      };
    }

    return schemaInput;
  });
}

export function getFieldSettingOption(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  settingKey: string,
  config: SchemaInputConfig
): string {
  const settingObject: SchemaInput | undefined = findFieldSetting(values, fieldKey, fieldIndex, settingKey, config);

  if (!settingObject) {
    return '';
  }

  return (settingObject as SchemaInputFieldSetting).option || '';
}

export function setFieldSettingOption(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  settingKey: string,
  option: string,
  config: SchemaInputConfig
) {
  const settingObject: SchemaInput | undefined = findFieldSetting(values, fieldKey, fieldIndex, settingKey, config);

  if (!settingObject) {
    throw new Error('Trying to update a field setting that does not exist');
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
