import MiniSearch from 'minisearch';

import type { ListItem } from '../components';

/**
 * MiniSearch factory method.
 * @param items
 * @returns A new MiniSearch instance.
 */
export const createFuzzySearch = (items: ListItem[]) => {
  const fields = [
    ...items.reduce<Set<string>>((acc, item) => {
      Object.keys(item.fields).forEach((key) => acc.add(key));
      return acc;
    }, new Set()),
  ];

  return new MiniSearch({
    fields,
    storeFields: fields,
    extractField: (item: ListItem, fieldKey) => {
      if (fieldKey === 'id') return item.id;

      const value = item.fields[fieldKey]?.value;

      if (Array.isArray(value)) return value.join(' ');

      return value.toString();
    },
  });
};
