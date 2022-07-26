import type { CMSList } from '@finsweet/attributes-cmscore';
import { importCMSCore } from '@finsweet/attributes-cmscore';
import { CMS_SELECT_ATTRIBUTE, CMS_LOAD_ATTRIBUTE } from '@global/constants/attributes';

import { getSelector } from './constants';
import { populateSelectElement } from './populate';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

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
