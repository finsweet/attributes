import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initJob, initJobsList } from './factory';
import { DEFAULT_QUERY_PARAM_SETTING_KEY, GH_DEPARTMENT, GH_OFFICE } from './utils/constants';
import { getAttribute } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  // init params
  const queryparam = getAttribute(null, 'queryparam') ?? DEFAULT_QUERY_PARAM_SETTING_KEY;
  const board = getAttribute(null, 'board');

  if (!board) {
    return;
  }

  const url = new URL(window.location.href);

  const jobId = url.searchParams.get(queryparam);

  // init job details and form
  if (jobId) {
    await initJob(board, jobId);
    return;
  }

  const office = url.searchParams.get(GH_OFFICE);
  const department = url.searchParams.get(GH_DEPARTMENT);

  // init job list
  await initJobsList(board, queryparam, office, department);

  return {};
};
