import type { CMSList } from '@finsweet/attributes-cmscore';
import { importCMSCore } from '@finsweet/attributes-cmscore';
import { CMS_LOAD_ATTRIBUTE } from '@global/constants/attributes';

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
  await Promise.all(listInstances.map(initLoadInstance));

  window.fsAttributes[CMS_LOAD_ATTRIBUTE].resolve?.(listInstances);

  return listInstances;
};
