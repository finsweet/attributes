import { CMS_CSS_CLASSES } from '../constants';
import type {
  CollectionEmptyElement,
  CollectionItemElement,
  CollectionListElement,
  CollectionListWrapperElement,
  PageCountElement,
  PaginationButtonElement,
  PaginationWrapperElement,
} from '../types';

// TODO: unify this with fs-list

const CUSTOM_CSS_SELECTORS_PREFIX = 'fs-cms-element';

const CUSTOM_CSS_SELECTORS_VALUES: Record<keyof typeof CMS_CSS_CLASSES, string> = {
  wrapper: 'wrapper',
  list: 'list',
  item: 'item',
  paginationWrapper: 'pagination-wrapper',
  paginationNext: 'pagination-next',
  paginationPrevious: 'pagination-previous',
  pageCount: 'page-count',
  emptyState: 'empty',
};

/**
 * @returns A CSS selector for a CMS element.
 * @param key
 */
export const getCMSElementSelector = (key: keyof typeof CMS_CSS_CLASSES) => {
  const nativeSelector = `.${CMS_CSS_CLASSES[key]}`;
  const customSelector = `[${CUSTOM_CSS_SELECTORS_PREFIX}="${CUSTOM_CSS_SELECTORS_VALUES[key]}"]`;

  return `:is(${nativeSelector}, ${customSelector})`;
};

/**
 * Queries `Collection List Wrapper` elements and makes sure they are unique.
 * @param selectors The selectors used for the query. If an empty array is provided, all `Collection List Wrapper` elements will be returned.
 * @param page The document where to perform the query.
 * @returns A unique list of `Collection List Wrapper` elements.
 */
export const getCollectionListWrappers = (
  selectors: Array<string | null | undefined>,
  page = document
): CollectionListWrapperElement[] => {
  // Make sure the selectors are valid.
  selectors = selectors.filter((selector) => selector);

  const selector = selectors.join(', ') || getCMSElementSelector('wrapper');

  const referenceElements = [...page.querySelectorAll<HTMLElement>(selector)];

  const collectionListWrappers = referenceElements.reduce<CollectionListWrapperElement[]>(
    (wrappers, referenceElement) => {
      if (!referenceElement) return wrappers;

      const collectionListWrapper = getCollectionElements(referenceElement, 'wrapper');
      if (!collectionListWrapper || wrappers.includes(collectionListWrapper)) return wrappers;

      wrappers.push(collectionListWrapper);

      return wrappers;
    },
    []
  );

  return collectionListWrappers;
};

/**
 * This helper is intended to allow users setting the selectors to either the `Collection List Wrapper` or the `Collection List` elements.
 * This way there will never be any misunderstanding about the setup.
 * @param reference The element or selector of the element.
 * @param target The requested element/elements. It can be either the `Collection List Wrapper`, the `Collection List` or all the `Collection Item` elements.
 * @param page The page document.
 * @returns The specified collection element/elements.
 */
export function getCollectionElements(
  reference: string | Element,
  target: 'pageCount',
  page?: Document
): PageCountElement | null | undefined;
export function getCollectionElements(
  reference: string | Element,
  target: 'next' | 'previous',
  page?: Document
): PaginationButtonElement | null | undefined;
export function getCollectionElements(
  reference: string | Element,
  target: 'pagination',
  page?: Document
): PaginationWrapperElement | null | undefined;
export function getCollectionElements(
  reference: string | Element,
  target: 'empty',
  page?: Document
): CollectionEmptyElement | null | undefined;
export function getCollectionElements(
  reference: string | Element,
  target: 'items',
  page?: Document
): CollectionItemElement[];
export function getCollectionElements(
  reference: string | Element,
  target: 'list',
  page?: Document
): CollectionListElement | null | undefined;
export function getCollectionElements(
  reference: string | Element,
  target: 'wrapper',
  page?: Document
): CollectionListWrapperElement | null | undefined;
export function getCollectionElements(
  reference: string | Element,
  target: 'wrapper' | 'list' | 'items' | 'empty' | 'pagination' | 'next' | 'previous' | 'pageCount',
  page: Document = document
):
  | CollectionListWrapperElement
  | CollectionListElement
  | CollectionItemElement[]
  | PaginationButtonElement
  | PageCountElement
  | CollectionEmptyElement
  | null
  | undefined {
  const referenceElement = typeof reference === 'string' ? page.querySelector(reference) : reference;
  if (!referenceElement) return;

  const collectionListWrapper = referenceElement.closest<CollectionListWrapperElement>(
    getCMSElementSelector('wrapper')
  );
  if (!collectionListWrapper) return;

  const collectionList = collectionListWrapper.querySelector<CollectionListElement>(getCMSElementSelector('list'));

  if (target === 'wrapper') {
    return collectionListWrapper;
  }
  if (target === 'list') {
    return collectionList;
  }
  if (target === 'items') {
    return [
      ...(collectionList?.querySelectorAll<CollectionItemElement>(`:scope > ${getCMSElementSelector('item')}`) || []),
    ];
  }
  if (target === 'pageCount') {
    return collectionListWrapper.querySelector<PageCountElement>(getCMSElementSelector('pageCount'));
  }
  if (target === 'empty') {
    return collectionListWrapper.querySelector<CollectionListWrapperElement>(
      `:scope > ${getCMSElementSelector('emptyState')}`
    );
  }
  if (target === 'pagination') {
    return collectionListWrapper.querySelector<PaginationWrapperElement>(getCMSElementSelector('paginationWrapper'));
  }

  return collectionListWrapper.querySelector<PaginationButtonElement>(
    target === 'next' ? getCMSElementSelector('paginationNext') : getCMSElementSelector('paginationPrevious')
  );
}
