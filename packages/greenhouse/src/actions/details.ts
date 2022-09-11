import type { Job, JobWithContent } from '@finsweet/ts-utils/dist/types/apis/Greenhouse';

import { GH_API_BASE, GH_API_JOBS } from '../utils/constants';
import { populateJob } from '../utils/populate';

export async function createJobDetails(jobId: string, boardId: string) {
  const jobsRequest = await fetch(`${GH_API_BASE}/${boardId}/${GH_API_JOBS}/${jobId}?content=true&questions=true`);
  const job: Job | JobWithContent = await jobsRequest.json();

  populateJob(job, undefined, null);
}
