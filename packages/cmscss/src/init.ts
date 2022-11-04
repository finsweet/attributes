import { CMS_ATTRIBUTE_ATTRIBUTE, CMS_CSS_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { importCMSCore } from '$global/import';
import type { CMSList } from '$packages/cmscore';

import { addCSSClasses } from './classes';
import { getSelector } from './constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const listInstances = cmsCore.createCMSListInstances([getSelector('element', 'list', { operator: 'prefixed' })]);

  // Combine the lists
  await Promise.all(listInstances.map(initListsCSS));

  return finalizeAttribute(CMS_CSS_ATTRIBUTE, listInstances, () => {
    // TODO: Remove optional chaining after cmscore@1.9.0 has rolled out
    for (const listInstance of listInstances) listInstance.destroy?.();
  });
};

/**
 * Inits dynamically adding CSS classes to the Collection Items of the lists.
 */
const initListsCSS = async (listInstance: CMSList) => {
  const { items } = listInstance;

  addCSSClasses(items);

  listInstance.on('renderitems', (renderedItems) => addCSSClasses(renderedItems));
};
