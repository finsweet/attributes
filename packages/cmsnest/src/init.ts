import type { CMSList } from '@finsweet/attributes-cmscore';
import { importCMSCore } from '@finsweet/attributes-cmscore';
import { CMS_NEST_ATTRIBUTE } from '@global/constants/attributes';

import { initListNesting } from './factory';
import { getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  // Create the list instances
  const listInstances = cmsCore.createCMSListInstances([getSelector('element', 'list', { operator: 'prefixed' })]);

  await Promise.all(listInstances.map((listInstance) => initListNesting(listInstance, cmsCore)));

  window.fsAttributes[CMS_NEST_ATTRIBUTE].resolve?.(listInstances);

  return listInstances;
};
