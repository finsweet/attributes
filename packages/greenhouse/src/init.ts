import type { FormField } from '@finsweet/ts-utils';
import { GREENHOUSE_ATTRIBUTE, CMS_LOAD_ATTRIBUTE, CMS_FILTER_ATTRIBUTE } from 'global/constants/attributes';
import type { CMSList } from 'packages/cmscore/src';
import type { CMSFilters } from 'packages/cmsfilter/src/components/CMSFilters';

import { createJobDetails } from './actions/details';
import { createFilters } from './actions/filter';
import { createJobForm } from './actions/form';
import { createJobList, addJobsToList } from './actions/jobs';
import { ATTRIBUTES, GH_DEPARTMENT, GH_OFFICE, queryElement } from './utils/constants';
import { fetchJobs } from './utils/fetch';

/**
 * Inits the attribute.
 */
export const init = async ({
  board,
  queryParam,
}: {
  board: string | null;
  queryParam?: string | null;
}): Promise<void> => {
  // init params
  queryParam ??= ATTRIBUTES.queryparam.default;

  if (!board) {
    return;
  }

  const url = new URL(window.location.href);

  const cmsLoadLists: CMSList[] = await window.fsAttributes[CMS_LOAD_ATTRIBUTE]?.loading;

  const cmsFilterLists: CMSFilters[] = await window.fsAttributes[CMS_FILTER_ATTRIBUTE]?.loading;

  const listJobsElement = queryElement<HTMLElement>(ATTRIBUTES.element.values.list);

  if (listJobsElement) {
    const office = url.searchParams.get(GH_OFFICE);
    const department = url.searchParams.get(GH_DEPARTMENT);

    const jobs = await fetchJobs(board, { office, department });

    const cmsLoadList = cmsLoadLists && cmsLoadLists.find((listInstance) => listInstance.wrapper === listJobsElement);
    if (cmsLoadList) {
      addJobsToList(cmsLoadList, queryParam, jobs);
    } else {
      createJobList(listJobsElement, queryParam, jobs);
    }

    // filters
    const filtersElements = document.querySelectorAll<FormField>(`[${ATTRIBUTES.filter.key}]`);

    if (cmsFilterLists && filtersElements.length > 0) {
      await createFilters(board, queryParam, cmsFilterLists, [...filtersElements], jobs);
    }
  }

  const jobId = url.searchParams.get(queryParam);

  if (jobId) {
    createJobDetails(jobId, board);
    // jobs
    const applicationForm = queryElement<HTMLFormElement>(ATTRIBUTES.element.values.form);

    if (applicationForm) {
      createJobForm(applicationForm, jobId, board);
    }
  }

  window.fsAttributes[GREENHOUSE_ATTRIBUTE].resolve?.(undefined);
};
