import {
  CMS_CSS_CLASSES,
  type CollectionEmptyElement,
  type CollectionItemElement,
  type CollectionListElement,
  type CollectionListWrapperElement,
  type PageCountElement,
  type PaginationButtonElement,
  type PaginationWrapperElement,
} from '@finsweet/attributes-utils';

import type { ELEMENTS } from './constants';
import { getElementSelector } from './selectors';

const CMS_CSS_SELECTORS = {
  wrapper: `.${CMS_CSS_CLASSES.wrapper}`,
  list: `.${CMS_CSS_CLASSES.list}`,
  item: `.${CMS_CSS_CLASSES.item}`,
  'pagination-wrapper': `.${CMS_CSS_CLASSES.paginationWrapper}`,
  'pagination-next': `.${CMS_CSS_CLASSES.paginationNext}`,
  'pagination-previous': `.${CMS_CSS_CLASSES.paginationPrevious}`,
  'page-count': `.${CMS_CSS_CLASSES.pageCount}`,
  empty: `.${CMS_CSS_CLASSES.emptyState}`,
} satisfies Partial<Record<(typeof ELEMENTS)[number], string>>;

/**
 * @returns A CSS selector for a CMS element.
 * @param key
 */
export const getCMSElementSelector = (key: keyof typeof CMS_CSS_SELECTORS) => {
  return `:is(${CMS_CSS_SELECTORS[key]}, ${getElementSelector(key)})`;
};

/**
 * This helper is intended to allow users setting the selectors to either the `Collection List Wrapper` or the `Collection List` elements.
 * This way there will never be any misunderstanding about the setup.
 * @param referenceElement The element or selector of the element.
 * @param target The requested element/elements. It can be either the `Collection List Wrapper`, the `Collection List` or all the `Collection Item` elements.
 * @param page The page document.
 * @returns The specified collection element/elements.
 */
export function getCollectionElements(
  referenceElement: Element,
  target: 'page-count'
): PageCountElement | null | undefined;
export function getCollectionElements(
  referenceElement: Element,
  target: 'pagination-next' | 'pagination-previous'
): PaginationButtonElement | null | undefined;
export function getCollectionElements(
  referenceElement: Element,
  target: 'pagination-wrapper'
): PaginationWrapperElement | null | undefined;
export function getCollectionElements(
  referenceElement: Element,
  target: 'empty'
): CollectionEmptyElement | null | undefined;
export function getCollectionElements(referenceElement: Element, target: 'item'): CollectionItemElement[];
export function getCollectionElements(
  referenceElement: Element,
  target: 'list'
): CollectionListElement | null | undefined;
export function getCollectionElements(
  referenceElement: Element,
  target: 'wrapper'
): CollectionListWrapperElement | null | undefined;
export function getCollectionElements(
  referenceElement: Element,
  target: keyof typeof CMS_CSS_SELECTORS
):
  | CollectionListWrapperElement
  | CollectionListElement
  | CollectionItemElement[]
  | PaginationButtonElement
  | PageCountElement
  | CollectionEmptyElement
  | null
  | undefined {
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
  if (target === 'item') {
    return [
      ...(collectionList?.querySelectorAll<CollectionItemElement>(`:scope > ${getCMSElementSelector(target)}`) || []),
    ];
  }
  if (target === 'page-count') {
    return collectionListWrapper.querySelector<PageCountElement>(getCMSElementSelector(target));
  }
  if (target === 'empty') {
    return collectionListWrapper.querySelector<CollectionListWrapperElement>(
      `:scope > ${getCMSElementSelector(target)}`
    );
  }
  if (target === 'pagination-wrapper') {
    return collectionListWrapper.querySelector<PaginationWrapperElement>(getCMSElementSelector(target));
  }

  return collectionListWrapper.querySelector<PaginationButtonElement>(getCMSElementSelector(target));
}

/**
 * @returns All the `Collection List Wrapper` elements in the page.
 * @param page
 */
export const getAllCollectionListWrappers = (page: Document) =>
  page.querySelectorAll<CollectionListWrapperElement>(getCMSElementSelector('wrapper'));
