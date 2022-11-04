import { isNotEmpty } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, CMS_SORT_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { importCMSCore } from '$global/import';
import type { CMSList } from '$packages/cmscore';

import { initListSorting } from './factory';
import { getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const listInstances = cmsCore.createCMSListInstances([getSelector('element', 'list', { operator: 'prefixed' })]);

  const cleanups = (
    await Promise.all(listInstances.map((listInstance) => initListSorting(listInstance, cmsCore)))
  ).filter(isNotEmpty);

  return finalizeAttribute(CMS_SORT_ATTRIBUTE, listInstances, () => {
    // TODO: Remove optional chaining after cmscore@1.9.0 has rolled out
    for (const listInstance of listInstances) listInstance.destroy?.();
    for (const cleanup of cleanups) cleanup();
  });
};
