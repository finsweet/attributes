import type { FormField } from '@finsweet/ts-utils';

import { CMS_FILTER_ATTRIBUTE, CMS_LOAD_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad } from '$global/factory';
import type { CMSList } from '$packages/cmscore/src';
import type { CMSFilters } from '$packages/cmsfilter/src/components/CMSFilters';

import { createFilters } from './actions/filter';
import { createJobForm } from './actions/form';
import { addJobsCMSList, createCMSList } from './actions/jobs';
import { ATTRIBUTES, queryElement } from './utils/constants';
import { fetchJob, fetchJobs } from './utils/jobs';
import { populateJob } from './utils/populate';

export async function initJobsList(
  boardId: string,
  queryParam: string,
  office: string | null,
  department: string | null
) {
  const [cmsLoadLists, cmsFilterLists] = (await awaitAttributesLoad(CMS_LOAD_ATTRIBUTE, CMS_FILTER_ATTRIBUTE)) as [
    CMSList[],
    CMSFilters[]
  ];

  const listJobsElement = queryElement<HTMLElement>(ATTRIBUTES.element.values.list);
  if (!listJobsElement) {
    return;
  }

  const jobs = await fetchJobs(boardId, { office, department });

  const cmsLoadList = cmsLoadLists && cmsLoadLists.find((listInstance) => listInstance.wrapper === listJobsElement);
  if (cmsLoadList) {
    addJobsCMSList(cmsLoadList, queryParam, jobs);
  } else {
    await createCMSList(listJobsElement, queryParam, jobs);
  }

  // filters
  const filtersElements = document.querySelectorAll<FormField>(`[${ATTRIBUTES.filter.key}]`);

  if (cmsFilterLists && filtersElements.length > 0) {
    await createFilters(queryParam, cmsFilterLists, [...filtersElements], jobs);
  }
}

export async function initJob(boardId: string, jobId: string) {
  const job = await fetchJob(boardId, jobId);

  if (!job) {
    return;
  }

  populateJob(job, undefined, null);

  // jobs
  const applicationForm = queryElement<HTMLFormElement>(ATTRIBUTES.element.values.form);

  if (applicationForm) {
    createJobForm(job, jobId, boardId, applicationForm);
  }
}
