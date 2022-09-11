import type { SchemaForm, SchemaInputConfig, SchemaInput, SchemaInputField } from '@src/types/Input.types';

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

export function setFieldIdentifier(
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
