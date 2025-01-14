import { CMS_CSS_CLASSES, fetchPageDocument } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { getCollectionElements } from '../utils/dom';

/**
 * Loads all paginated items of a `List` instance.
 * @param list The {@link List} instance.
 *
 * @returns Nothing, it mutates the `List` instance.
 */
export const loadPaginatedCMSItems = async (list: List): Promise<void> => {
  const {
    paginationNextCMSElement,
    paginationPreviousCMSElement,
    paginationCountElement,
    loadingPaginationQuery,
    loaderElement,
    cache: cacheItems,
  } = list;

  if (!paginationNextCMSElement.value && !paginationPreviousCMSElement.value) return;

  list.loadingPaginatedItems = new Promise(async (resolve) => {
    if (loaderElement) {
      loaderElement.style.display = '';
      loaderElement.style.opacity = '1';
    }

    // Attempt to get the total amount of pages from the `Page Count` element.
    let totalPages;

    if (paginationCountElement) {
      const [, rawTotalPages] = paginationCountElement.textContent?.split('/') || [];
      if (rawTotalPages) {
        totalPages = parseInt(rawTotalPages.trim());
      }
    }

    await loadingPaginationQuery;

    if (totalPages) await parallelItemsLoad(list, totalPages, cacheItems);
    else await chainedPagesLoad(list, cacheItems);

    if (loaderElement) {
      loaderElement.style.display = 'none';
    }

    resolve();
  });
};

/**
 * Collects Collection Items from a Collection List's pagination.
 * Loads all pages in a chained sequence until there are no more valid pages to load.
 *
 * @param list The List instance.
 * @param cache Whether to cache the loaded items or not.
 *
 * @returns Nothing, it mutates the `List` instance.
 */
const chainedPagesLoad = async (list: List, cache: boolean): Promise<void> => {
  const currentPage = list.currentPage.value;
  if (currentPage > 1) {
    await parallelItemsLoad(list, currentPage, cache);
  }

  if (!list.paginationNextCMSElement.value) return;

  const { href } = list.paginationNextCMSElement.value;
  const pageLinks: string[] = [href];

  /**
   * Loads the items from the specified URL.
   * @param href The URL to load.
   */
  const loadPage = async (href: string) => {
    // Fetch the page
    const page = await fetchPageDocument(href, { cache });
    if (!page) return;

    // Check for recursion (action: `all`)
    const nextPageURL = await parseLoadedPage(page, list);

    if (!nextPageURL || pageLinks.includes(nextPageURL)) return;

    pageLinks.push(nextPageURL);

    await loadPage(nextPageURL);
  };

  await loadPage(href);
};

/**
 * Collects Collection Items from a Collection List's pagination.
 * Loads all pages in parallel.
 *
 * @param list The List instance.
 * @param totalPages The total number of pages to load.
 * @param cache Whether to cache the loaded items or not.
 *
 * @returns Nothing, it mutates the `List` instance.
 */
const parallelItemsLoad = async (list: List, totalPages: number, cache: boolean) => {
  if (!list.paginationNextCMSElement.value && !list.paginationPreviousCMSElement.value) return;

  const currentPage = list.currentPage.value;

  if (!list.pagesQuery || !currentPage) return;

  const { origin, pathname } = window.location;

  // Previous Pages
  for (let pageNumber = currentPage - 1; pageNumber >= 1; pageNumber--) {
    const page = await fetchPageDocument(`${origin}${pathname}?${list.pagesQuery}=${pageNumber}`, { cache });
    if (!page) return;

    await parseLoadedPage(page, list, 'unshift');
  }

  // Next Pages
  const fetchPromises: Promise<void>[] = [];

  for (let pageNumber = currentPage + 1; pageNumber <= totalPages; pageNumber++) {
    fetchPromises[pageNumber] = (async () => {
      const previousPromise = fetchPromises[pageNumber - 1];

      const page = await fetchPageDocument(`${origin}${pathname}?${list.pagesQuery}=${pageNumber}`, { cache });

      await previousPromise;

      if (!page) return;

      await parseLoadedPage(page, list);
    })();
  }

  await Promise.all(fetchPromises);
};

/**
 * Parses a loaded page and adds the items to the `List` instance.
 * @param page
 * @param list
 * @param itemsTarget
 * @returns The URL of the next page, if any.
 */
const parseLoadedPage = async (page: Document, list: List, itemsTarget?: Parameters<List['addItems']>[1]) => {
  // Get DOM Elements
  const allCollectionWrappers = page.querySelectorAll(`.${CMS_CSS_CLASSES.wrapper}`);
  const collectionListWrapper = allCollectionWrappers[list.pageIndex];
  if (!collectionListWrapper) return;

  // Store and mount the new items
  const nextPageURL = getCollectionElements(collectionListWrapper, 'pagination-next')?.href;
  const collectionItems = getCollectionElements(collectionListWrapper, 'item');

  const { length: itemsLength } = collectionItems;

  // Make sure the itemsPerPage value is correct
  if (nextPageURL && list.initialItemsPerPage !== itemsLength) {
    list.initialItemsPerPage = itemsLength;
  }

  list.addItems(collectionItems, itemsTarget);

  return nextPageURL;
};
