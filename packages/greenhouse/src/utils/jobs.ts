import { getObjectKeys, isNotEmpty } from '@finsweet/ts-utils';
import type { JobsResponse, JobWithContent, JobWithQuestions } from '@finsweet/ts-utils/dist/types/apis/Greenhouse';

import type { JobsFilters } from '../types';
import { GH_API_BASE, GH_API_JOBS, GH_DEPARTMENT, GH_OFFICE } from './constants';

/**
 * Fetch one job
 * @param boardId board id from script
 * @param jobId  job id from query params
 * @returns
 */
export async function fetchJob(boardId: string, jobId: string) {
  const jobsRequest = await fetch(`${GH_API_BASE}/${boardId}/${GH_API_JOBS}/${jobId}?content=true&questions=true`);
  const job: JobWithContent & JobWithQuestions = await jobsRequest.json();
  return job;
}

export async function fetchJobs(
  boardId: string,
  filter?: { office: string | null; department: string | null }
): Promise<JobWithContent[]> {
  const jobsRequest = await fetch(`${GH_API_BASE}/${boardId}/${GH_API_JOBS}?content=true`);

  const jobsResponse: JobsResponse = await jobsRequest.json();

  const { jobs } = jobsResponse as { jobs: JobWithContent[] };

  if (filter === undefined || (!filter.office && !filter.department)) {
    return jobs;
  }

  const jobFilters: JobsFilters = {
    offices: (filter.office && [filter.office]) || [],
    departments: (filter.department && [filter.department]) || [],
  };

  return filterJobs(jobs, jobFilters);
}

export function filterJobsByKey(jobs: JobWithContent[], groupByKey: string, value: string) {
  switch (groupByKey) {
    case GH_DEPARTMENT:
      return filterJobs(jobs, { departments: [value], offices: [] });
    case GH_OFFICE:
      return filterJobs(jobs, { departments: [], offices: [value] });
    default:
      return jobs;
  }
}

export function filterJobs(jobs: JobWithContent[], filters: JobsFilters) {
  let filteredJobs: JobWithContent[] = jobs;

  getObjectKeys(filters).forEach((filterKey) => {
    const filterValues = filters[filterKey].map((value) => value.toLocaleLowerCase());
    if (filterValues.length <= 0) {
      return;
    }

    filteredJobs = filteredJobs.filter((job) => {
      const entryValues = job[filterKey].map((entry) => entry.name.toLocaleLowerCase());
      return entryValues.some((entryValue) => filterValues.some((filterValue) => filterValue === entryValue));
    });
  });

  return filteredJobs;
}

/**
 * Get unique departments or offices from jobs.
 * @param jobs
 * @param key
 * @returns
 */
export function getDepartmentsOrOfficesFromJobs(jobs: JobWithContent[], key: string) {
  switch (key) {
    case GH_DEPARTMENT:
      return getDepartmentsFromJobs(jobs);
    case GH_OFFICE:
      return getOfficesFromJobs(jobs);
    default:
      return [];
  }
}

/**
 * Get unique department names from jobs list.
 * @param jobs
 * @returns
 */
function getDepartmentsFromJobs(jobs: JobWithContent[]) {
  return [
    ...new Set(
      jobs
        .map((job) => (job.hasOwnProperty('departments') && (job as JobWithContent).departments) || '')
        .filter((departments) => departments !== '')
        .map((departments) => (departments && departments[0] && departments[0].name) || null)
        .filter(isNotEmpty)
    ),
  ];
}

/**
 * Get unique office names from jobs list.
 * @param jobs
 * @returns
 */
function getOfficesFromJobs(jobs: JobWithContent[]) {
  return [
    ...new Set(
      jobs
        .map((job) => (job.hasOwnProperty('offices') && (job as JobWithContent).offices) || '')
        .filter((offices) => offices !== '')
        .map((offices) => (offices && offices[0] && offices[0].name) || null)
        .filter(isNotEmpty)
    ),
  ];
}
