import { isHTMLSelectElement } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, CMS_LOAD_ATTRIBUTE, CMS_SELECT_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { importCMSCore } from '$global/import';
import type { CMSList } from '$packages/cmscore';

import { queryElement } from './constants';
import { populateSelectElement } from './populate';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const targetElements = queryElement('select', { operator: 'prefixed', all: true });

  const listInstancesSet: Set<CMSList> = new Set();

  for (const targetElement of targetElements) {
    if (!isHTMLSelectElement(targetElement)) continue;

    const selectElementListInstances = populateSelectElement(targetElement, cmsCore);

    for (const listIntance of selectElementListInstances) {
      listInstancesSet.add(listIntance);
    }
  }

  const listInstances = [...listInstancesSet];

  await awaitAttributesLoad(CMS_LOAD_ATTRIBUTE);

  return finalizeAttribute(CMS_SELECT_ATTRIBUTE, listInstances, () => {
    // TODO: Remove optional chaining after cmscore@1.9.0 has rolled out
    for (const listInstance of listInstances) listInstance.destroy?.();
  });
};
