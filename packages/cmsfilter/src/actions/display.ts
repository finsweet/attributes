import type { CMSFilters } from '../components/CMSFilters';

/**
 * Hides / shows filter elements based on their results.
 * @param filtersInstance The {@link CMSFilters} instance.
 */
export const displayFilterElements = ({ filtersData }: CMSFilters) => {
  for (const { elements } of filtersData) {
    for (const elementData of elements) {
      const { resultsCount, hidden, hideEmpty } = elementData;

      if (!hideEmpty) continue;

      const mustHide = resultsCount === 0;

      if (mustHide === hidden) continue;

      elementData.hidden = mustHide;
      hideEmpty.style.display = mustHide ? 'none' : '';
    }
  }
};
