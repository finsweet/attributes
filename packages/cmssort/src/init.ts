import type { CMSList } from '@finsweet/attributes-cmscore';
import { importCMSCore } from '@finsweet/attributes-cmscore';
import { CMS_SORT_ATTRIBUTE } from '@global/constants/attributes';

import { initListSorting } from './factory';
import { getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  const listInstances = cmsCore.createCMSListInstances([getSelector('element', 'list', { operator: 'prefixed' })]);

  await Promise.all(listInstances.map(initListSorting));

  window.fsAttributes[CMS_SORT_ATTRIBUTE].resolve?.(listInstances);

  return listInstances;
};
