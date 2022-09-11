import type { SchemaForm, SchemaInputConfig, SchemaInput, SchemaInputElement } from '@src/types/Input.types';

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
