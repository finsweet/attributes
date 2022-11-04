import { isNotEmpty } from '@finsweet/ts-utils';

import { QUERY_PARAM_ATTRIBUTE, CMS_FILTER_ATTRIBUTE, CMS_ATTRIBUTE_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { importCMSCore } from '$global/import';
import type { CMSCore, CMSList } from '$packages/cmscore';

import { listenListEvents } from './actions/events';
import type { CMSFilters } from './components/CMSFilters';
import { createCMSFiltersInstance, createCMSTagsInstance } from './factory';
import { getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSFilters[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE, QUERY_PARAM_ATTRIBUTE);

  const listInstances = cmsCore.createCMSListInstances([getSelector('element', 'list', { operator: 'prefixed' })]);

  const filtersData = (
    await Promise.all(listInstances.map((listInstance) => initFilters(listInstance, cmsCore)))
  ).filter(isNotEmpty);

  const filtersInstances = filtersData.map(({ filtersInstance }) => filtersInstance);

  return finalizeAttribute(CMS_FILTER_ATTRIBUTE, filtersInstances, () => {
    // TODO: Remove optional chaining after cmscore@1.9.0 has rolled out
    for (const listInstance of listInstances) listInstance.destroy?.();
    for (const { cleanup } of filtersData) cleanup();
  });
};

/**
 * Creates a new {@link CMSFilters} instance for each {@link CMSList}.
 * @param listInstance The `CMSList` instance.
 */
const initFilters = async (listInstance: CMSList, cmsCore: CMSCore) => {
  // Filters
  const filtersInstance = createCMSFiltersInstance(listInstance, cmsCore);
  if (!filtersInstance) return;

  listenListEvents(filtersInstance, listInstance);

  // Tags
  const tagsInstance = await createCMSTagsInstance(listInstance, filtersInstance);

  return {
    filtersInstance,
    cleanup: () => {
      filtersInstance.destroy();
      tagsInstance?.destroy();
    },
  };
};
