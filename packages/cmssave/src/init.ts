import type { CMSList } from '@finsweet/attributes-cmscore';
import { importCMSCore } from '@finsweet/attributes-cmscore';

import { initSaveSourceInstance } from './factory';
import { ATTRIBUTE, getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

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
