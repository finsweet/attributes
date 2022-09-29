import type { CMSList } from '$packages/cmscore';
import { importCMSCore } from '$packages/cmscore';

import { initSaveSourceInstance } from './factory';
import { ATTRIBUTE, getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  await window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE]?.loading;

  // Create the list instances
  const sourceListInstances = cmsCore.createCMSListInstances([
    getSelector('element', 'list', { operator: 'prefixed' }),
  ]);

  const targetListInstances = cmsCore.createCMSListInstances([getSelector('collection')]);

  // Init the modes
  await Promise.all(sourceListInstances.map(initSaveSourceInstance));

  window.fsAttributes[ATTRIBUTE].resolve?.(sourceListInstances);

  return sourceListInstances;
};
