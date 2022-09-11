import type { SchemaForm, SchemaInputConfig, SchemaInput, SchemaInputElementSetting } from '@src/types/Input.types';

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
          attributeId: `element-${value.element}-${value.setting}`,
        };
      }

      if (value.type === 'field') {
        return {
          ...value,
          attributeKey: value.field,
          attributeId: `field-${value.field}-${value.index}`,
        };
      }

      if (value.type === 'setting') {
        return {
          ...value,
          attributeKey: value.setting,
          attributeId: `setting-${value.setting}`,
        };
      }

      if (value.type === 'fieldElement') {
        return {
          ...value,
          attributeKey: value.element,
          attributeId: `field-element-${value.field}-${value.index}-${value.element}`,
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
