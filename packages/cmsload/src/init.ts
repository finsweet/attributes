import { CMS_LOAD_ATTRIBUTE } from '$global/constants/attributes';
import { finalizeAttribute } from '$global/factory';
import { importCMSCore } from '$global/import';
import type { CMSList } from '$packages/cmscore';

import { initLoadInstance } from './factory';
import { getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  // Create the list instances
  const listInstances = cmsCore.createCMSListInstances([getSelector('element', 'list', { operator: 'prefixed' })]);

  // Init the modes
  const cleanups = await Promise.all(listInstances.map((listInstance) => initLoadInstance(listInstance, cmsCore)));

  return finalizeAttribute(CMS_LOAD_ATTRIBUTE, listInstances, () => {
    // TODO: Remove optional chaining after cmscore@1.9.0 has rolled out
    for (const listInstance of listInstances) listInstance.destroy?.();
    for (const cleanup of cleanups) cleanup?.();
  });
};
