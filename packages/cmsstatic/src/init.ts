import { CMS_STATIC_ATTRIBUTE, CMS_ATTRIBUTE_ATTRIBUTE } from 'global/constants/attributes';

import type { CMSList } from '$packages/cmscore';
import { importCMSCore } from '$packages/cmscore';

import { initStaticInstance } from './factory';
import { getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  await window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE]?.loading;

  // Create the list instances
  const listInstances = cmsCore.createCMSListInstances([getSelector('element', 'list', { operator: 'prefixed' })]);

  // Init the modes
  await Promise.all(listInstances.map(initStaticInstance));

  window.fsAttributes[CMS_STATIC_ATTRIBUTE].resolve?.(listInstances);

  return listInstances;
};
