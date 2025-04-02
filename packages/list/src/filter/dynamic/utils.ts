import type { FilterMatch } from '../types';

/**
 * @returns The filter match value of a given select element.
 * @param selectElement
 */
export const getFilterMatchValue = (selectElement: HTMLSelectElement): FilterMatch =>
  selectElement.value === 'or' ? 'or' : 'and';
