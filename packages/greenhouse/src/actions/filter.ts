import { cloneNode, FormField, Greenhouse } from '@finsweet/ts-utils';
import { DROPDOWN_CSS_CLASSES, FORM_CSS_CLASSES } from '@finsweet/ts-utils';
import type { Job, JobWithContent } from '@finsweet/ts-utils/dist/types/apis/Greenhouse';
import type { CMSFilters } from 'packages/cmsfilter/src/components/CMSFilters';
import type { FiltersData } from 'packages/cmsfilter/src/utils/types';

import { ATTRIBUTES, GH_DEPARTMENT, GH_OFFICE, queryElement } from '../utils/constants';
import { fetchDepartments, fetchOffices } from '../utils/fetch';
import { appendJobsNestedList, getNestedKey } from './jobs';

export async function createFilters(
  boardId: string,
  queryParam: string,
  filtersInstances: CMSFilters[],
  filtersElements: FormField[],
  jobs: (Job | JobWithContent)[]
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

      const filterEntries = await fetchFilterData(boardId, filterKey);

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

        const departmentValues = (deparmentsFilter && [...deparmentsFilter.values]) || null;
        const officeValues = (officesFilter && [...officesFilter.values]) || null;

        const filteredJobs = await filterJobs(jobs, departmentValues, officeValues);

        listInstance.wrapper.innerHTML = '';

        appendJobsNestedList(listInstance, filteredJobs, queryParam, groupByKey);
      }
    });
  }

  for (const filterInstance of filtersInstances) {
    filterInstance.storeFiltersData();
    filterInstance.resetFilters();
  }
}

async function filterJobs(
  allJobs: (Job | JobWithContent)[],
  departmentValues: string[] | null,
  officeValues: string[] | null
) {
  const jobsDeparments =
    (departmentValues &&
      departmentValues.length > 0 &&
      allJobs.filter((job: Greenhouse.Job | Greenhouse.JobWithContent) => {
        if (!job.hasOwnProperty('departments')) {
          return false;
        }

        const departments = (job as Greenhouse.JobWithContent).departments.map((department) => department.name);

        return departments.some((department) =>
          departmentValues.some((deparmentValue) => deparmentValue === department)
        );
      })) ||
    allJobs;

  const jobs =
    (officeValues &&
      officeValues.length > 0 &&
      jobsDeparments.filter((job: Greenhouse.Job | Greenhouse.JobWithContent) => {
        if (!job.hasOwnProperty('offices')) {
          return false;
        }

        const offices = (job as Greenhouse.JobWithContent).offices.map((office) => office.name);

        return offices.some((office) => officeValues.some((officeValue) => officeValue === office));
      })) ||
    jobsDeparments;

  return jobs;
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
  if (fieldElement instanceof HTMLSelectElement) {
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

export async function fetchFilterData(boardId: string, filterKey: string): Promise<string[]> {
  switch (filterKey) {
    case GH_DEPARTMENT:
      return fetchDepartments(boardId);
    case GH_OFFICE:
      return fetchOffices(boardId);
    default:
      return [];
  }
}
