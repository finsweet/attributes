import type { SchemaForm, SchemaInputConfig, SchemaInputFieldElement } from '@src/types/Input.types';

export function findFieldElement(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  elementKey: string,
  config: SchemaInputConfig
): SchemaInputFieldElement | undefined {
  const setting = values.find(
    (item) =>
      item.type === 'fieldElement' &&
      item.field === fieldKey &&
      item.index === fieldIndex &&
      item.element === elementKey &&
      item.key === config.key &&
      item.instance === config.instance
  );

  if (setting) {
    return setting as SchemaInputFieldElement;
  }
  return undefined;
}

export function findFieldElementIndex(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  elementKey: string,
  config: SchemaInputConfig
): number | null {
  const index = values.findIndex(
    (item) =>
      item.type === 'fieldElement' &&
      item.field === fieldKey &&
      item.index === fieldIndex &&
      item.element === elementKey &&
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
export function addFieldElement(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  elementKey: string,
  config: SchemaInputConfig
): SchemaForm {
  const valuesWithElement: SchemaForm = [
    ...values,
    {
      type: 'fieldElement',
      field: fieldKey,
      index: fieldIndex,
      element: elementKey,
      validation: null,
      ...config,
    },
  ];
  return valuesWithElement;
}

export function deleteFieldElement(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  elementKey: string,
  config: SchemaInputConfig
): SchemaForm {
  const index = findFieldElementIndex(values, fieldKey, fieldIndex, elementKey, config);
  if (index === null) {
    throw new Error(`Delete element: Element field with key ${elementKey} not found.`);
  }
  values.splice(index, 1);
  return values;
}

export function deleteFieldElements(
  values: SchemaForm,
  fieldKey: string,
  fieldIndex: string,
  config: SchemaInputConfig
): SchemaForm {
  const indexes: number[] = [];

  const newArray = [...values];

  for (const [index, item] of [...newArray].entries()) {
    if (item.type !== 'fieldElement') {
      continue;
    }

    const isFieldElement =
      item.field === fieldKey &&
      item.index === fieldIndex &&
      item.key === config.key &&
      item.instance === config.instance;

    if (isFieldElement) {
      indexes.push(index);
    }
  }

  const newValues = values.filter((_, index) => !indexes.includes(index));

  return newValues;
}
