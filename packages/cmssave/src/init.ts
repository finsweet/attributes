import { CMS_ATTRIBUTE_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { importCMSCore } from '$global/import';
import type { CMSList } from '$packages/cmscore';

import { initSaveSourceInstance } from './factory';
import { ATTRIBUTE, getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  // Create the list instances
  const sourceListInstances = cmsCore.createCMSListInstances([
    getSelector('element', 'list', { operator: 'prefixed' }),
  ]);

  const targetListInstances = cmsCore.createCMSListInstances([getSelector('collection')]);

  // Init the modes
  await Promise.all(sourceListInstances.map(initSaveSourceInstance));

  return finalizeAttribute(ATTRIBUTE, targetListInstances, () => {
    // TODO: Remove optional chaining after cmscore@1.9.0 has rolled out
    for (const listInstance of targetListInstances) listInstance.destroy?.();
  });
};
