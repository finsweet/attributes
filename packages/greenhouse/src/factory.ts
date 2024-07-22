import { type FormField, waitAttributeLoaded } from '@finsweet/attributes-utils';

import { createFilters } from './actions/filter';
import { createJobForm } from './actions/form';
import { addJobsCMSList, createCMSList } from './actions/jobs';
import { fetchJob, fetchJobs } from './utils/jobs';
import { populateJob } from './utils/populate';
import { getSettingSelector, queryElement } from './utils/selectors';

export async function initJobsList(
  boardId: string,
  queryParam: string,
  office: string | null,
  department: string | null
) {
  // @ts-expect-error TODO: Support fs-list
  const cmsLoadLists = (await waitAttributeLoaded('cmsload')) as CMSList[];
  // @ts-expect-error TODO: Support fs-list
  const cmsFilterLists = (await waitAttributeLoaded('cmsfilter')) as CMSFilters[];

  const listJobsElement = queryElement('list');
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
  const filtersElements = document.querySelectorAll<FormField>(getSettingSelector('filter'));

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
  const applicationForm = queryElement<HTMLFormElement>('form');

  if (applicationForm) {
    createJobForm(job, jobId, boardId, applicationForm);
  }
}
