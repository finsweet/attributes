import { CMS_ATTRIBUTE_ATTRIBUTE, GREENHOUSE_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { initJob, initJobsList } from './factory';
import { ATTRIBUTES, GH_DEPARTMENT, GH_OFFICE } from './utils/constants';

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
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  // init params
  queryParam ??= ATTRIBUTES.queryparam.default;

  if (!board) {
    return;
  }

  const url = new URL(window.location.href);

  const jobId = url.searchParams.get(queryParam);

  // init job details and form
  if (jobId) {
    await initJob(board, jobId);
    return;
  }

  const office = url.searchParams.get(GH_OFFICE);
  const department = url.searchParams.get(GH_DEPARTMENT);

  // init job list
  await initJobsList(board, queryParam, office, department);

  // TODO: Create destroy method
  return finalizeAttribute(GREENHOUSE_ATTRIBUTE, undefined);
};
