import type { PaginationButtonElement } from '@finsweet/ts-utils';

import { fetchPageDocument, getCollectionListWrappers, getCollectionElements } from '$global/helpers';

import type { CMSList } from '..';

const { location, history } = window;

let memoizedInitialPageRequest: Promise<Document> | undefined;

/**
 * Extracts the {@link URLSearchParams} from a list's Pagination Button.
 * @param paginationButton A {@link PaginationButtonElement}.
 *
 * @returns The search params as {@link Object.entries}, if the button is valid.
 */
const getPaginationSearchEntries = (paginationButton?: PaginationButtonElement | null) => {
  if (!paginationButton) return;

  const { href } = paginationButton;

  const { searchParams } = new URL(href);

  const searchEntries = [...searchParams.entries()];

  return searchEntries;
};

/**
 * Extracts the pages query from a `Pagination Next` button.
 *
 * @param paginationNext A {@link PaginationButtonElement}.
 *
 * @returns A tuple with [pagesQuery, nextPageNumber].
 */
const extractPaginationQuery = async ({ paginationNext, paginationPrevious, index }: CMSList) => {
  const searchEntries = getPaginationSearchEntries(paginationNext || paginationPrevious);

  if (!searchEntries || !searchEntries.length) return;

  let pagesQuery: string | undefined;
  let rawTargetPage: string | undefined;

  if (searchEntries.length === 1) {
    const [pageEntry] = searchEntries;

    if (!pageEntry) return;

    [pagesQuery, rawTargetPage] = pageEntry;
  }

  // If there's more than one `searchParam` we need to fetch the original page to find the correspondent pageQuery.
  else {
    try {
      const { origin, pathname } = location;

      memoizedInitialPageRequest ||= fetchPageDocument(origin + pathname);

      const initialPage = await memoizedInitialPageRequest;

      const initialCollectionListWrappers = getCollectionListWrappers([], initialPage);

      const initialCollectionListWrapper = initialCollectionListWrappers[index];

      if (!initialCollectionListWrapper) return;

      const initialPaginationNext = getCollectionElements(initialCollectionListWrapper, 'next');

      const [initialPageEntry] = getPaginationSearchEntries(initialPaginationNext) || [];

      if (!initialPageEntry) return;

      [pagesQuery] = initialPageEntry;

      [, rawTargetPage] = searchEntries.find(([query]) => query === pagesQuery) || [];
    } catch (error) {
      return;
    }
  }

  if (!pagesQuery || !rawTargetPage) return;

  const targetPage = parseInt(rawTargetPage);

  return [pagesQuery, targetPage] as const;
};

/**
 * Sets the pagination data to a `CMSList` instance.
 * @param listInstance A {@link CMSList} instance.
 *
 * @returns Nothing, it mutates the instance.
 */
export const storePaginationData = (listInstance: CMSList) => {
  const { paginationNext } = listInstance;

  listInstance.extractingPaginationData = new Promise(async (resolve) => {
    const paginationQuery = await extractPaginationQuery(listInstance);

    if (!paginationQuery) {
      resolve();
      return;
    }

    const [pagesQuery, targetPage] = paginationQuery;

    listInstance.pagesQuery = pagesQuery;

    listInstance.currentPage = paginationNext ? targetPage - 1 : targetPage + 1;

    resolve();
  });
};

/**
 * Updates the page query parameters.
 * @param listInstance A {@link CMSList} instance.
 */
export const setPaginationQueryParams = ({ currentPage, pagesQuery }: CMSList) => {
  if (!pagesQuery || !currentPage) return;

  const url = new URL(location.href);
  const { searchParams } = url;

  searchParams.set(pagesQuery, `${currentPage}`);

  history.replaceState(null, '', url.toString());
};
