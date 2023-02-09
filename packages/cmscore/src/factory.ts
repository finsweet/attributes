import { CollectionListWrapperElement, isNotEmpty } from '@finsweet/ts-utils';

import { getCMSElementSelector, getCollectionElements, getCollectionListWrappers } from '$global/helpers';

import { CMSList } from '.';

/**
 * Creates a new `CMSList` for each unique `Collection List Wrapper` that matches the selectors on the current document.
 * @param selectors The selectors used for the query. If an empty array is provided, all `Collection List Wrapper` elements will be returned.
 * @returns An array of `CMSList` instances.
 */
export const createCMSListInstances = (selectors: Parameters<typeof getCollectionListWrappers>['0']): CMSList[] => {
  const collectionListWrappers = getCollectionListWrappers(selectors);

  const listInstances = collectionListWrappers.map(createCMSListInstance).filter(isNotEmpty);

  return listInstances;
};

/**
 * Creates a new `CMSList` instance, making sure there are no already existing instances on the page.
 * @param referenceElement The `Collection List` reference element.
 * @returns A new `CMSList` instance, if instantiation was valid.
 */
export const createCMSListInstance = (referenceElement: HTMLElement): CMSList | undefined => {
  const wrapper = getCollectionElements(referenceElement, 'wrapper');

  if (!wrapper) return;

  const { fsAttributes } = window;

  fsAttributes.cmscore ||= {};
  const { cmscore } = fsAttributes;

  cmscore.listInstances ||= new Map();
  const { listInstances } = cmscore;

  const existingListInstance = listInstances.get(wrapper);
  if (existingListInstance) return existingListInstance;

  const pageListElements = [
    ...document.querySelectorAll<CollectionListWrapperElement>(getCMSElementSelector('wrapper')),
  ];

  const index = pageListElements.indexOf(wrapper);
  if (index === -1) return;

  const listInstance = new CMSList(wrapper, index);
  listInstances.set(wrapper, listInstance);

  return listInstance;
};
