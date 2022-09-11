import type { SchemaForm, SchemaInputConfig, SchemaInput, SchemaInputElementSetting } from '@src/types/Input.types';

/**
 * Element Setting
 */
export function addElementSetting(
  values: SchemaForm,
  elementKey: string,
  settingKey: string,
  settingValue: string,
  config: SchemaInputConfig
): SchemaForm {
  const elementSetting: SchemaInputElementSetting = {
    type: 'elementSetting',
    element: elementKey,
    enable: true,
    setting: settingKey,
    option: settingValue,
    validation: null,
    ...config,
  };

  const valuesWithElement: SchemaForm = [...values, elementSetting];
  return valuesWithElement;
}

export function enableElementSetting(
  values: SchemaForm,
  elementKey: string,
  settingKey: string,
  config: SchemaInputConfig
) {
  const settingObject = findElementSetting(values, elementKey, settingKey, config);

  if (!settingObject) {
    throw new Error(`Trying to enable a setting that does not exist ${elementKey} ${settingKey}`);
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

export function disableElementSetting(
  values: SchemaForm,
  elementKey: string,
  settingKey: string,
  config: SchemaInputConfig
) {
  const settingObject = findElementSetting(values, elementKey, settingKey, config);

  if (!settingObject) {
    throw new Error(`Trying to disable a setting that does not exist ${elementKey} ${settingKey}`);
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

export function disableElementSettings(values: SchemaForm, elementKey: string, config: SchemaInputConfig) {
  const elementSettings = findElementSettings(values, elementKey, config);

  const restValues = values.filter((schemaInput: SchemaInput) => {
    if (schemaInput.type !== 'elementSetting') {
      return true;
    }

    return (
      elementSettings.some((elementSetting: SchemaInputElementSetting) => {
        return (
          schemaInput.instance === elementSetting.instance &&
          schemaInput.key === elementSetting.key &&
          schemaInput.element === elementSetting.element
        );
      }) === false
    );
  });

  const disableElementSettings = elementSettings.map((elementSetting) => {
    return {
      ...elementSetting,
      enable: false,
      validation: null,
    };
  });

  return [...disableElementSettings, ...restValues];
}

export function setElementSettingOption(
  values: SchemaForm,
  elementKey: string,
  settingKey: string,
  option: string,
  config: SchemaInputConfig
) {
  const settingObject = findElementSetting(values, elementKey, settingKey, config);

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

export function getElementSettingOption(
  values: SchemaForm,
  elementKey: string,
  settingKey: string,
  config: SchemaInputConfig
) {
  const settingObject = findElementSetting(values, elementKey, settingKey, config);

  if (!settingObject) {
    return null;
  }

  return (settingObject as SchemaInputElementSetting).option || '';
}

export function findElementSettings(values: SchemaForm, elementKey: string, config: SchemaInputConfig) {
  const elementSetting = values.filter(
    (item) =>
      item.type === 'elementSetting' &&
      item.element === elementKey &&
      item.instance === config.instance &&
      item.key === config.key
  );

  return elementSetting as SchemaInputElementSetting[];
}

export function findElementSetting(
  values: SchemaForm,
  elementKey: string,
  settingKey: string,
  config: SchemaInputConfig
) {
  const elementSetting = values.find(
    (item) =>
      item.type === 'elementSetting' &&
      item.setting === settingKey &&
      item.element === elementKey &&
      item.instance === config.instance &&
      item.key === config.key
  );

  return elementSetting as SchemaInputElementSetting;
}

export function findElementSettingIndex(
  values: SchemaForm,
  elementKey: string,
  settingKey: string,
  config: SchemaInputConfig
) {
  const index = values.findIndex(
    (item) =>
      item.type === 'elementSetting' &&
      item.setting === settingKey &&
      item.element === elementKey &&
      item.instance === config.instance &&
      item.key === config.key
  );

  if (index === -1) {
    return null;
  }

  return index;
}
