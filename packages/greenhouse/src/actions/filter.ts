import { cloneNode, DROPDOWN_CSS_CLASSES, FORM_CSS_CLASSES, FormField, isHTMLSelectElement } from '@finsweet/ts-utils';
import type { JobWithContent } from '@finsweet/ts-utils/dist/types/apis/Greenhouse';

import type { CMSFilters } from '$packages/cmsfilter/src/components/CMSFilters';
import type { FiltersData } from '$packages/cmsfilter/src/utils/types';

import type { JobsFilters } from '../types';
import { ATTRIBUTES, GH_DEPARTMENT, GH_OFFICE } from '../utils/constants';
import { filterJobs, getDepartmentsOrOfficesFromJobs } from '../utils/jobs';
import { appendNestedJobsToCMSItems } from '../utils/lists';
import { getNestedKey } from './jobs';

export async function createFilters(
  queryParam: string,
  filtersInstances: CMSFilters[],
  filtersElements: FormField[],
  jobs: JobWithContent[]
) {
  if (filtersElements.length <= 0) {
    return;
  }

  for (const filterInstance of filtersInstances) {
    for (const filterElement of filtersElements) {
      const filterKey = filterElement.getAttribute(ATTRIBUTES.filter.key);

      if (!filterKey) {
        continue;
      }

      const filterEntries = await getDepartmentsOrOfficesFromJobs(jobs, filterKey);

      if (!filterEntries || filterEntries.length <= 0) {
        continue;
      }

      createFilterFactory(filterElement, filterEntries);
    }

    const displayElements = document.querySelectorAll<HTMLElement>(`[${ATTRIBUTES.display.key}]`);

    const defaultValues = new Map<HTMLElement, string>();

    const { listInstance } = filterInstance;

    const groupByKey = getNestedKey(listInstance);

    listInstance.on('renderitems', async () => {
      const { filtersData } = filterInstance;

      if (displayElements.length > 0) {
        displayFilterValues(filtersData, [...displayElements], defaultValues);
      }

      if (groupByKey) {
        const deparmentsFilter = filtersData.find((filterData) => filterData.filterKeys.includes(GH_DEPARTMENT));
        const officesFilter = filtersData.find((filterData) => filterData.filterKeys.includes(GH_OFFICE));

        const jobFilters: JobsFilters = {
          departments: (deparmentsFilter && [...deparmentsFilter.values]) || [],
          offices: (officesFilter && [...officesFilter.values]) || [],
        };

        const filteredJobs = await filterJobs(jobs, jobFilters);

        listInstance.wrapper.innerHTML = '';

        appendNestedJobsToCMSItems(listInstance, filteredJobs, queryParam, groupByKey);
      }
    });
  }

  for (const filterInstance of filtersInstances) {
    filterInstance.storeFiltersData();
    filterInstance.resetFilters();
  }
}

function displayFilterValues(
  filtersData: FiltersData,
  displayElements: HTMLElement[],
  defaultValues: Map<HTMLElement, string>
) {
  for (const displayElement of displayElements) {
    const { textContent } = displayElement;

    const defaultValue: string | null | undefined = defaultValues.has(displayElement)
      ? defaultValues.get(displayElement)
      : defaultValues.set(displayElement, textContent || 'All') && textContent;
    const key = displayElement.getAttribute(ATTRIBUTES.display.key);

    if (!key) {
      continue;
    }

    const filteredKey = filtersData.find((filterData) => filterData.filterKeys.includes(key));

    if (!filteredKey) {
      continue;
    }

    const values = [...filteredKey.values];

    if (values.length <= 0 && defaultValue) {
      displayElement.textContent = defaultValue;
      continue;
    }

    displayElement.textContent = values.join(', ');
  }
}

export function createFilterFactory(fieldElement: FormField, category: string[]): void {
  if (isHTMLSelectElement(fieldElement)) {
    fieldElement.innerHTML = '';
    fieldElement.add(new Option('All', ''));
    category.forEach((category) => {
      // TODO: flatten out the option values to this format: value-name
      fieldElement.add(new Option(category, category));
    });
    return;
  }

  const dropdown = fieldElement.closest<HTMLElement>(`.${DROPDOWN_CSS_CLASSES.dropdown}`);

  if (dropdown) {
    const dropdownNav = dropdown.querySelector<HTMLElement>(`.${DROPDOWN_CSS_CLASSES.dropdownList}`);

    if (!dropdownNav) {
      return;
    }

    const dropdownList = dropdownNav.querySelector<HTMLElement>('ul');

    if (!dropdownList) {
      return;
    }

    const dropdownItem = dropdownList.querySelector<HTMLElement>('li');

    if (!dropdownItem) {
      return;
    }

    category.forEach((category) => {
      const newDropdownItem = cloneNode(dropdownItem);

      const labelItem = newDropdownItem.querySelector<HTMLLabelElement>(`.${FORM_CSS_CLASSES.checkboxOrRadioLabel}`);

      if (!labelItem) {
        return;
      }

      labelItem.textContent = category;

      dropdownList.append(newDropdownItem);
    });

    dropdownItem.remove();
  }
}
