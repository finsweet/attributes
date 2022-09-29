import { CMS_ATTRIBUTE_ATTRIBUTE } from '$global/constants/attributes';
import type { CMSList } from '$packages/cmscore';
import { importCMSCore } from '$packages/cmscore';

import { addCSSClasses } from './classes';
import { ATTRIBUTE, getSelector } from './constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  await window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE]?.loading;

  const listInstances = cmsCore.createCMSListInstances([getSelector('element', 'list', { operator: 'prefixed' })]);

  // Combine the lists
  await Promise.all(listInstances.map(initListsCSS));

  window.fsAttributes[ATTRIBUTE].resolve?.(listInstances);

  return listInstances;
};

/**
 * Inits dynamically adding CSS classes to the Collection Items of the lists.
 */
const initListsCSS = async (listInstance: CMSList) => {
  const { items } = listInstance;

  addCSSClasses(items);

  listInstance.on('renderitems', (renderedItems) => addCSSClasses(renderedItems));
};
