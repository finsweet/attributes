import { CMS_SELECT_ATTRIBUTE, CMS_LOAD_ATTRIBUTE, CMS_ATTRIBUTE_ATTRIBUTE } from '$global/constants/attributes';
import type { CMSList } from '$packages/cmscore';
import { importCMSCore } from '$packages/cmscore';

import { getSelector } from './constants';
import { populateSelectElement } from './populate';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  await window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE]?.loading;

  const targetElements = [...document.querySelectorAll(getSelector('element', 'select', { operator: 'prefixed' }))];

  const listInstancesSet: Set<CMSList> = new Set();

  for (const targetElement of targetElements) {
    if (!(targetElement instanceof HTMLSelectElement)) continue;

    const selectElementListInstances = populateSelectElement(targetElement, cmsCore);

    for (const listIntance of selectElementListInstances) listInstancesSet.add(listIntance);
  }

  const listInstances = [...listInstancesSet];

  await window.fsAttributes[CMS_LOAD_ATTRIBUTE]?.loading;
  window.fsAttributes[CMS_SELECT_ATTRIBUTE].resolve?.(listInstances);

  return listInstances;
};
