import {
  CMS_CSS_CLASSES,
  Debug,
  getCollectionElements,
  getCollectionListWrappers,
  isNotEmpty,
} from '@finsweet/ts-utils';
import type { CollectionListWrapperElement } from '@finsweet/ts-utils';

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

  if (!wrapper) {
    Debug.alert('The element is not a Collection List.', 'error');
    return;
  }

  const { fsAttributes } = window;

  fsAttributes.cms.listInstances ||= [];
  fsAttributes.cms.listElements ||= [
    ...document.querySelectorAll<CollectionListWrapperElement>(`.${CMS_CSS_CLASSES.wrapper}`),
  ];

  const { listInstances, listElements } = fsAttributes.cms;

  const index = listElements.indexOf(wrapper);
  if (index === -1) return;

  listInstances[index] ||= new CMSList(wrapper, index);

  return listInstances[index];
};
