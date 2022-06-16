import type { CMSList } from '@finsweet/attributes-cmscore';
import { getCollectionElements, getCollectionListWrappers } from '@finsweet/ts-utils';

export const parseLoadedPage = async (
  page: Document,
  listInstance: CMSList,
  itemsTarget?: Parameters<CMSList['addItems']>[1]
) => {
  const { index, paginationNext, paginationPrevious, originalItemsPerPage } = listInstance;

  // Get DOM Elements
  const collectionListWrapper = getCollectionListWrappers([], page)[index];
  if (!collectionListWrapper) return;

  // Store and mount the Pagination Previous element, if required
  if (!paginationPrevious || !paginationNext) {
    const newPaginationWrapper = getCollectionElements(collectionListWrapper, 'pagination');
    const newPaginationPrevious = getCollectionElements(collectionListWrapper, 'previous');
    const newPaginationNext = getCollectionElements(collectionListWrapper, 'next');

    if (newPaginationPrevious) {
      const childIndex = [...(newPaginationWrapper?.children || [])].indexOf(newPaginationPrevious);

      listInstance.addPaginationButton(newPaginationPrevious, 'paginationPrevious', childIndex);
    }

    if (newPaginationNext) {
      let childIndex = [...(newPaginationWrapper?.children || [])].indexOf(newPaginationNext);

      if (!newPaginationPrevious) childIndex += 1;

      listInstance.addPaginationButton(newPaginationNext, 'paginationNext', childIndex);
    }
  }

  // Store and mount the new items
  const nextPageURL = getCollectionElements(collectionListWrapper, 'next')?.href;
  const collectionItems = getCollectionElements(collectionListWrapper, 'items');

  const { length: itemsLength } = collectionItems;

  // Make sure the itemsPerPage value is correct
  if (nextPageURL && originalItemsPerPage !== itemsLength) {
    listInstance.originalItemsPerPage = listInstance.itemsPerPage = itemsLength;
  }

  await listInstance.addItems(collectionItems, itemsTarget);

  return nextPageURL;
};
