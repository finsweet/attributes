import type { CMSList } from '$packages/cmscore';

import { loadPaginatedItems } from '../actions/load';

/**
 * Inits the `Render All` mode.
 * @param listInstance The `CMSList` instance.
 * @param loadingText The text to display while loading.
 */
export const initRenderAllMode = async (listInstance: CMSList) => {
  const { paginationNext, paginationPrevious, paginationCount } = listInstance;

  if (!paginationNext) return;

  paginationNext.style.display = 'none';

  if (paginationPrevious) paginationPrevious.style.display = 'none';

  paginationCount?.remove();

  await loadPaginatedItems(listInstance);
};
