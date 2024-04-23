import {
  addListener,
  cloneNode,
  CURRENT_CSS_CLASS,
  extractCommaSeparatedValues,
  getCurrentBreakpoint,
  isElement,
  isHTMLAnchorElement,
  isNotEmpty,
  isNumber,
} from '@finsweet/attributes-utils';
import debounce from 'just-debounce';
import { atom, type WritableAtom } from 'nanostores';

import type { List } from '../components/List';
import { BREAKPOINTS_INDEX, DEFAULT_PAGE_BOUNDARY, DEFAULT_PAGE_SIBLINGS } from '../utils/constants';
import { getCMSElementSelector } from '../utils/dom';
import { subscribeMultiple } from '../utils/reactivity';
import { getAttribute, getElementSelector, hasAttributeValue, queryElement } from '../utils/selectors';
import { loadPaginatedItems } from './load';

/**
 * Inits the `Pagination` mode.
 * @param list The {@link List} instance.
 *
 * @returns A callback to destroy the event listeners.
 */
export const initPaginationMode = (list: List) => {
  const { currentPage, itemsPerPage, paginationWrapperElement, listOrWrapper } = list;
  if (!paginationWrapperElement) return;

  // Init hook
  list.addHook('paginate', (items) => {
    const $itemsPerPage = itemsPerPage.get();

    const start = (currentPage.get() - 1) * $itemsPerPage;
    const end = start + $itemsPerPage;

    const paginatedItems = items.slice(start, end);
    return paginatedItems;
  });

  list.currentPage.listen(() => list.triggerHook('paginate'));
  list.itemsPerPage.listen(() => list.triggerHook('paginate'));

  subscribeMultiple([list.items, list.itemsPerPage], ([$items, $itemsPerPage]) => {
    list.totalPages.set(Math.ceil($items.length / $itemsPerPage) || 1);
  });

  // Get settings
  const showQueryParams = hasAttributeValue(listOrWrapper, 'showquery', 'true');
  const [pageBoundary, pageBoundaryCleanup] = getBreakpointSetting(list, 'pageboundary', DEFAULT_PAGE_BOUNDARY);
  const [pageSiblings, pageSiblingsCleanup] = getBreakpointSetting(list, 'pagesiblings', DEFAULT_PAGE_SIBLINGS);

  // Page Button Template
  const pageButtonTemplate = queryElement('page-button', { scope: paginationWrapperElement });

  // Page Dots Template
  let pageDotsTemplate = queryElement('page-dots', { scope: paginationWrapperElement });

  if (pageDotsTemplate) {
    pageDotsTemplate.remove();
  } else {
    pageDotsTemplate = document.createElement('div');
    pageDotsTemplate.textContent = '...';
  }

  // Handle query params
  if (showQueryParams) {
    handlePaginationQuery(list);
  }

  // Handle page buttons
  let pageButtonsCleanup: (() => void) | undefined;

  if (pageButtonTemplate) {
    const { parentElement } = pageButtonTemplate;

    pageButtonTemplate.remove();

    if (parentElement) {
      pageButtonsCleanup = handlePageButtons(
        list,
        parentElement,
        pageButtonTemplate,
        pageDotsTemplate,
        pageSiblings,
        pageBoundary
      );
    }
  }

  // Handle pagination buttons
  const paginationButtonsCleanup = handlePaginationButtons(list);

  // Handle pagination count
  handlePaginationCount(list);

  // Init items load
  loadPaginatedItems(list);

  // Return destroy callback
  return () => {
    pageBoundaryCleanup?.();
    pageSiblingsCleanup?.();
    pageButtonsCleanup?.();
    paginationButtonsCleanup();
  };
};

/**
 * Handles the page buttons elements.
 * @param list
 * @param parentElement
 * @param pageButtonTemplate
 * @param pageDotsTemplate
 * @param pageSiblings
 * @param pageBoundary
 */
const handlePageButtons = (
  list: List,
  parentElement: HTMLElement,
  pageButtonTemplate: HTMLElement,
  pageDotsTemplate: HTMLElement,
  pageSiblings: WritableAtom<number>,
  pageBoundary: WritableAtom<number>
) => {
  const { currentPage, totalPages } = list;
  let renderedButtons = new Map<HTMLElement, number | null>();

  subscribeMultiple(
    [currentPage, totalPages, pageSiblings, pageBoundary],
    ([$currentPage, $totalPages, $pageSiblings, $pageBoundary]) => {
      const totalSiblings = $pageSiblings * 2 + 1;
      const totalBoundary = $pageBoundary * 2;

      const maxElements = totalBoundary + totalSiblings + 2;

      const isStartRange = $currentPage - 1 < maxElements - totalSiblings;
      const isEndRange = $totalPages - $currentPage < maxElements - totalSiblings;

      const existingElements: Array<[HTMLElement, number | null] | undefined> = [...renderedButtons];

      for (let index = 1; index <= maxElements; index++) {
        // Get previous elements
        const [existingElement, existingTargetPage] = existingElements[index - 1] || [];
        const [lastElement] = existingElements[index - 2] || [];

        // Get rid of invalid elements
        if (index > $totalPages) {
          if (existingElement) {
            existingElement.remove();
            existingElements[index - 1] = undefined;
          }
          continue;
        }

        // Collect new target page
        let targetPage: number | null;

        if ($totalPages <= maxElements) targetPage = index;
        else if (isStartRange) {
          if (index > maxElements - $pageBoundary) targetPage = $totalPages - (maxElements - index);
          else if (index === maxElements - $pageBoundary) targetPage = null;
          else targetPage = index;
        } else if (isEndRange) {
          if (index < $pageBoundary + 1) targetPage = index;
          else if (index === $pageBoundary + 1) targetPage = null;
          else targetPage = $totalPages - (maxElements - index);
        } else {
          if (index < $pageBoundary + 1) targetPage = index;
          else if (index > maxElements - $pageBoundary) targetPage = $totalPages - (maxElements - index);
          else if (index === $pageBoundary + 1 || index === maxElements - $pageBoundary) targetPage = null;
          else targetPage = $currentPage + (index - ($pageBoundary + 1) - (1 + $pageSiblings));
        }

        // Render a new item only when needed
        let newElement: HTMLElement | undefined;

        if (existingTargetPage !== targetPage) {
          // Remove the existing element
          existingElement?.remove();

          // Add the new item
          newElement = createPageButton(pageButtonTemplate, pageDotsTemplate, targetPage, list);
          existingElements[index - 1] = [newElement, targetPage];

          if (lastElement) parentElement.insertBefore(newElement, lastElement.nextSibling);
          else parentElement.appendChild(newElement);

          newElement.style.opacity = '';
        }

        const elementToUpdate = newElement || existingElement;
        if (!elementToUpdate) continue;

        // Update CSS and Aria
        if (targetPage === $currentPage) {
          elementToUpdate.classList.add(CURRENT_CSS_CLASS);
          elementToUpdate.setAttribute('aria-current', 'page');
        } else {
          elementToUpdate.classList.remove(CURRENT_CSS_CLASS);
          elementToUpdate.removeAttribute('aria-current');
        }
      }

      // Store new state
      renderedButtons = new Map([...existingElements.filter(isNotEmpty)]);
    }
  );

  // Handle clicks
  const cleanupClicks = addListener(parentElement, 'click', (e) => {
    const { target } = e;

    if (!isElement(target)) return;

    const isPageButton = target.closest<HTMLElement>(getElementSelector('page-button'));
    if (!isPageButton) return;

    e.preventDefault();

    const targetPage = renderedButtons.get(isPageButton);
    if (!targetPage) return;

    list.currentPage.set(targetPage);
  });

  return cleanupClicks;
};

/**
 * Creates a new page button element.
 *
 * @param pageButtonTemplate
 * @param pageDotsTemplate
 * @param targetPage The page where it will point to. If no target page is defined, a `Page Dots` element will be returned.
 * @param list The {@link List} instance.
 *
 * @returns The new element.
 */
const createPageButton = (
  pageButtonTemplate: HTMLElement,
  pageDotsTemplate: HTMLElement,
  targetPage: number | null,
  { pagesQuery }: List
) => {
  if (!targetPage) return cloneNode(pageDotsTemplate);

  const newElement = cloneNode(pageButtonTemplate);
  newElement.classList.remove(CURRENT_CSS_CLASS);
  newElement.textContent = `${targetPage}`;

  if (isHTMLAnchorElement(newElement) && pagesQuery) {
    newElement.href = `?${pagesQuery}=${targetPage}`;
  }

  return newElement;
};

/**
 * Updates the native `Page Count` element.
 * @param list The {@link List} instance.
 */
const handlePaginationCount = ({ paginationCountElement, currentPage, totalPages }: List) => {
  if (!paginationCountElement) return;

  subscribeMultiple([currentPage, totalPages], ([$currentPage, $totalPages]) => {
    paginationCountElement.setAttribute('aria-label', `Page ${$currentPage} of ${$totalPages}`);
    paginationCountElement.textContent = `${$currentPage} / ${$totalPages}`;
  });
};

/**
 * Handles the `display` and `href` properties of native pagination buttons (`Previous` & `Next`).
 * @param list The {@link List} instance.
 */
const handlePaginationButtons = (list: List) => {
  const { pagesQuery, currentPage, totalPages, paginationNextElement, paginationPreviousElement } = list;

  subscribeMultiple(
    [currentPage, totalPages, paginationNextElement, paginationPreviousElement],
    ([$currentPage, $totalPages, $paginationNext, $paginationPrevious]) => {
      if ($paginationPrevious) {
        $paginationPrevious.style.display = $currentPage !== 1 ? '' : 'none';

        $paginationPrevious.href = `?${pagesQuery}=${$currentPage - 1}`;
      }

      if ($paginationNext) {
        $paginationNext.style.display = $currentPage !== $totalPages ? '' : 'none';

        $paginationNext.href = `?${pagesQuery}=${$currentPage + 1}`;
      }
    }
  );

  const cleanup = addListener(window, 'click', (e) => {
    const { target } = e;

    if (!isElement(target)) return;

    const isNextButton = target.closest(getCMSElementSelector('pagination-next'));
    const isPreviousButton = target.closest(getCMSElementSelector('pagination-previous'));

    if (!isNextButton && !isPreviousButton) return;

    e.preventDefault();

    const { currentPage, totalPages } = list;

    let targetPage: number | null | undefined;

    if (isNextButton) targetPage = currentPage.get() + 1;
    else targetPage = currentPage.get() - 1;

    if (!targetPage) return;
    if (targetPage < 1) return;
    if (targetPage > totalPages.get()) return;

    list.currentPage.set(targetPage);
  });

  return cleanup;
};

/**
 * Gets a breakpoint setting and returns it as a store that will be updated on resize.
 * @param list
 * @param setting
 * @param defaultValue
 * @returns A store atom and a cleanup function.
 */
const getBreakpointSetting = (
  { listOrWrapper }: List,
  setting: 'pagesiblings' | 'pageboundary',
  defaultValue: number
) => {
  const store = atom(defaultValue);

  const rawValues = getAttribute(listOrWrapper, setting);
  const values = extractCommaSeparatedValues(rawValues).map(parseInt);

  const updateValue = () => {
    const currentBreakpoint = getCurrentBreakpoint();
    const breakpointIndex = BREAKPOINTS_INDEX[currentBreakpoint];

    for (let i = breakpointIndex; i >= 0; i--) {
      const value = values[i];

      if (isNumber(value)) {
        store.set(value);
        break;
      }
    }
  };

  const cleanup = values.length ? addListener(window, 'resize', debounce(updateValue, 100)) : undefined;

  return [store, cleanup] as const;
};

/**
 * Updates the page query parameters.
 * @param list A {@link List} instance.
 */
export const handlePaginationQuery = ({ currentPage, pagesQuery }: List) => {
  if (!pagesQuery) return;

  currentPage.subscribe(($currentPage) => {
    const url = new URL(location.href);

    url.searchParams.set(pagesQuery, $currentPage.toString());

    history.replaceState(null, '', url);
  });
};
