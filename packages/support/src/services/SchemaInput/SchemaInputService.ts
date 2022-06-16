import type {
  SchemaForm,
  SchemaInputConfig,
  SchemaInput,
  SchemaInputElementSetting,
  SchemaInputElement,
  SchemaInputFieldSetting,
  SchemaInputField,
} from '@src/types/Input.types';

/**
 * Element
 */
export function addElement(values: SchemaForm, elementKey: string, config: SchemaInputConfig): SchemaForm {
  const element: SchemaInputElement = {
    type: 'element',
    element: elementKey,
    validation: null,
    ...config,
  };

  const valuesWithElement: SchemaForm = [...values, element];
  return valuesWithElement;
}

export function deleteElement(values: SchemaForm, elementKey: string, config: SchemaInputConfig): SchemaForm {
  const index = findElementIndex(values, elementKey, config);
  if (index === null) {
    throw new Error(`Delete element: Element with key ${elementKey} not found.`);
  }
  values.splice(index, 1);
  return values;
}

export function findElement(
  values: SchemaForm,
  elementKey: string,
  config: SchemaInputConfig
): SchemaInputElement | null {
  const element = values.find(
    (item: SchemaInput) =>
      item.type === 'element' &&
      item.element === elementKey &&
      item.instance === config.instance &&
      item.key === config.key
  );

  return element as SchemaInputElement;
}

export function findElementIndex(values: SchemaForm, elementKey: string, config: SchemaInputConfig): number | null {
  const index = values.findIndex(
    (item: SchemaInput) =>
      item.type === 'element' &&
      item.element === elementKey &&
      item.instance === config.instance &&
      item.key === config.key
  );

  if (index === -1) {
    return null;
  }

  return index;
}

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

/**
 * Field
 */
export function getLastIndexField(values: SchemaForm, fieldKey: string, config: SchemaInputConfig) {
  const fieldsIndex = getFields(values, config)
    .map(
      (value: SchemaInput) =>
        (value.type === 'field' &&
          value.field === fieldKey &&
          value.index &&
          parseInt(value.index?.replace(/\D/g, ''))) ||
        0
    )
    .reduce((max: number, current: number) => (current > max && current) || max, 0);

  return fieldsIndex;
}

export function addField(values: SchemaForm, fieldKey: string, config: SchemaInputConfig): SchemaForm {
  const fieldsIndex = getFields(values, config)
    .map(
      (value: SchemaInput) => (value.type === 'field' && value.index && parseInt(value.index?.replace(/\D/g, ''))) || 0
    )
    .reduce((max: number, current: number) => (current > max && current) || max, 0);

  const field: SchemaInputField = {
    type: 'field',
    field: fieldKey,
    index: `field-${fieldsIndex + 1}`,
    validation: null,
    identifier: '',
    specialization: '',
    ...config,
  };

  const valuesWithElement: SchemaForm = [...values, field];

  return valuesWithElement;
}

export function getFields(values: SchemaForm, config: SchemaInputConfig): SchemaInputField[] {
  return values.filter(
    (field: SchemaInput) => field.type == 'field' && config.instance === field.instance && config.key === field.key
  ) as SchemaInputField[];
}

export function setFieldidentifier(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  value: string,
  config: SchemaInputConfig
): SchemaForm {
  const index = findFieldIndex(values, fieldKey, fieldIndex, config);

  if (index === null) {
    throw new Error(`Field set identifier not works because ${fieldKey} ${fieldIndex} not found`);
  }

  const newArray = [...values];

  (newArray[index] as SchemaInputField).identifier = value;
  return newArray;
}

export function setFieldSpecialization(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  value: string,
  config: SchemaInputConfig
): SchemaForm {
  const index = findFieldIndex(values, fieldKey, fieldIndex, config);

  if (index === null) {
    throw new Error(`Field set specialization not works because ${fieldKey} ${fieldIndex} not found`);
  }

  const newArray = [...values];

  (newArray[index] as SchemaInputField).specialization = value;
  return newArray;
}

export function deleteField(values: SchemaForm, fieldKey: string, fieldIndex: string, config: SchemaInputConfig) {
  const index = findFieldIndex(values, fieldKey, fieldIndex, config);

  if (index === null) {
    throw new Error(`Field delete not works because ${fieldKey} ${fieldIndex} not found`);
  }

  values.splice(index, 1);

  return values;
}

export function findField(values: SchemaForm, fieldKey: string, fieldIndex: string, config: SchemaInputConfig) {
  const field = values.find(
    (item: SchemaInput) =>
      item.type === 'field' &&
      item.field === fieldKey &&
      item.index === fieldIndex &&
      item.instance === config.instance &&
      item.key === config.key
  );

  return field as SchemaInputField;
}

export function findFieldIndex(values: SchemaForm, fieldKey: string, fieldIndex: string, config: SchemaInputConfig) {
  const index = values.findIndex(
    (item: SchemaInput) =>
      item.type === 'field' &&
      item.field === fieldKey &&
      item.index === fieldIndex &&
      item.instance === config.instance &&
      item.key === config.key
  );

  if (index === -1) {
    return null;
  }

  return index;
}

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

type SchemaInputError = (SchemaInput & {
  attributeKey: string;
  attributeId: string;
})[];

function validateEnable(value: SchemaInput): boolean {
  if (!Object.prototype.hasOwnProperty.call(value, 'enable')) {
    return true;
  }

  const typeValue = value as SchemaInputElementSetting;
  return typeValue.enable;
}

export function findInvalidAttributes(values: SchemaForm, config: SchemaInputConfig): SchemaInputError {
  return values
    .filter(
      (value: SchemaInput) =>
        value.instance === config.instance &&
        value.key === config.key &&
        value.validation !== null &&
        value.validation.status === false &&
        validateEnable(value)
    )
    .map((value: SchemaInput) => {
      if (value.type === 'element') {
        return {
          ...value,
          attributeKey: value.element,
          attributeId: `element-${value.element}`,
        };
      }

      if (value.type === 'elementSetting') {
        return {
          ...value,
          attributeKey: value.setting,
          attributeId: `element-setting-${value.setting}`,
        };
      }

      if (value.type === 'field') {
        return {
          ...value,
          attributeKey: value.field,
          attributeId: `field-${value.field}-${value.index}`,
        };
      }

      return {
        ...value,
        attributeKey: value.setting,
        attributeId: `field-setting-${value.field}-${value.index}-${value.setting}`,
      };
    });
}

export function findValidAttributes(values: SchemaForm, config: SchemaInputConfig): SchemaForm {
  return values.filter(
    (value: SchemaInput) =>
      value.instance === config.instance &&
      value.key === config.key &&
      value.validation !== null &&
      value.validation.status === true &&
      validateEnable(value)
  );
}
