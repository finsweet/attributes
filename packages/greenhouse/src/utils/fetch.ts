import type {
  JobsResponse,
  Job,
  JobWithContent,
  OfficesResponse,
  DepartmentsResponse,
} from '@finsweet/ts-utils/dist/types/apis/Greenhouse';

import { GH_API_BASE, GH_API_JOBS, GH_DEPARTMENT, GH_OFFICE } from '../utils/constants';

export async function fetchJobs(
  boardId: string,
  filter?: { office: string | null; department: string | null }
): Promise<(Job | JobWithContent)[]> {
  const jobsRequest = await fetch(`${GH_API_BASE}/${boardId}/${GH_API_JOBS}?content=true`);

  const jobsResponse: JobsResponse = await jobsRequest.json();

  const { jobs } = jobsResponse;

  if (filter === undefined || (!filter.office && !filter.department)) {
    return jobs;
  }

  let filteredJobs: (Job | JobWithContent)[] = [];

  if (filter.office) {
    filteredJobs = filterJobs(jobs, GH_OFFICE, filter.office);
  }

  if (filter.department) {
    filteredJobs = filterJobs(jobs, GH_DEPARTMENT, filter.department);
  }

  return filteredJobs;
}

function filterJobs(jobs: (Job | JobWithContent)[], groupBy: string, value: string) {
  if (groupBy === GH_DEPARTMENT) {
    return jobs.filter((job) => {
      if (!job.hasOwnProperty('departments')) {
        return false;
      }
      const jobWithContents = job as JobWithContent;

      const { departments } = jobWithContents;

      return departments.map((deparment) => deparment.name).includes(value);
    });
  }

  if (groupBy === GH_OFFICE) {
    return jobs.filter((job) => {
      if (!job.hasOwnProperty('offices')) {
        return false;
      }
      const jobWithContents = job as JobWithContent;

      const { offices } = jobWithContents;

      return offices.map((office) => office.name).includes(value);
    });
  }

  return [];
}

/**
 * Fetches offices from Greenhouse
 * @returns an array of {@link Greenhouse.Office} objects
 */
export async function fetchOffices(boardId: string): Promise<string[]> {
  try {
    // Call the API
    const endpoint = `${GH_API_BASE}${boardId}/offices`;
    const response = await fetch(endpoint);
    const data: OfficesResponse = await response.json();

    return data.offices.map((office) => office.name);
  } catch (error) {
    return [];
  }
}

/**
 * Fetches departments from Greenhouse
 * @returns an array of {@link Department} objects
 */
export async function fetchDepartments(boardId: string): Promise<string[]> {
  try {
    // Call the API
    const endpoint = `${GH_API_BASE}${boardId}/departments`;
    const response = await fetch(endpoint);
    const data: DepartmentsResponse = await response.json();

    // Filter out departments with no jobs
    const departments = data.departments.filter((department) => department.jobs.length > 0);
    return departments.map((department) => department.name);
  } catch (error) {
    return [];
  }
}
