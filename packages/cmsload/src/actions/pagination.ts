import type { CMSList } from '@finsweet/attributes-cmscore';
import type { PageCountElement } from '@finsweet/ts-utils';

/**
 * Reads the total amount of pages of a CMS List from the `Page Count` element.
 * @param paginationCount A {@link PageCountElement}.
 *
 * @returns The total amount of existing pages.
 */
export const readPaginationCount = ({ textContent }: PageCountElement) => {
  if (!textContent) return;

  const [, rawTotalPages] = textContent.split('/');
  if (!rawTotalPages) return;

  const totalPages = parseInt(rawTotalPages.trim());

  return totalPages;
};

/**
 * Increments the items per page of a `CMSList` instance.
 * @param listInstance The {@link CMSList} instance.
 * @param isLoading Defines if the loading cycle is still in process.
 * @param originalItemsPerPage The original amount of items per page.
 * @param e An optional {@link MouseEvent}.
 *
 * @returns `true` if there are still more items to be rendered on the list.
 */
export const incrementItemsPerPage = async (
  listInstance: CMSList,
  isLoading: boolean,
  originalItemsPerPage: number,
  e?: MouseEvent
): Promise<void> => {
  e?.preventDefault();

  const { items, itemsPerPage: currentItemsPerPage } = listInstance;

  if (!isLoading && currentItemsPerPage === items.length) return;

  if (currentItemsPerPage + originalItemsPerPage <= items.length) {
    listInstance.itemsPerPage = currentItemsPerPage + originalItemsPerPage;
  } else if (isLoading) {
    const newItems = await listInstance.once('renderitems');

    listInstance.itemsPerPage = currentItemsPerPage + newItems.length;
  } else {
    listInstance.itemsPerPage += items.length - currentItemsPerPage;
  }

  await listInstance.renderItems(true);
};

/**
 * Handles the `display` and `href` properties of native pagination buttons (`Previous` & `Next`).
 * @param listInstance The {@link CMSList} instance.
 */
export const handlePaginationButtons = (listInstance: CMSList) => {
  const { pagesQuery, currentPage, totalPages, paginationNext, paginationPrevious } = listInstance;

  if (!currentPage) return;

  if (paginationPrevious) {
    paginationPrevious.style.display = currentPage !== 1 ? '' : 'none';

    paginationPrevious.href = `?${pagesQuery}=${currentPage - 1}`;
  }

  if (paginationNext) {
    paginationNext.style.display = currentPage !== totalPages ? '' : 'none';

    paginationNext.href = `?${pagesQuery}=${currentPage + 1}`;
  }
};

/**
 * Updates the native `Page Count` element.
 * @param paginationCount The {@link PageCountElement}.
 * @param listInstance The {@link CMSList} instance.
 */
export const updatePaginationCount = (paginationCount: PageCountElement, { currentPage, totalPages }: CMSList) => {
  paginationCount.setAttribute('aria-label', `Page ${currentPage} of ${totalPages}`);
  paginationCount.textContent = `${currentPage} / ${totalPages}`;
};
