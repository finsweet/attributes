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
import { effect, type Ref, ref, watch } from '@vue/reactivity';
import debounce from 'just-debounce';

import type { List } from '../components/List';
import { BREAKPOINTS_INDEX } from '../utils/constants';
import { getCMSElementSelector } from '../utils/dom';
import { getAttribute, getElementSelector, queryElement } from '../utils/selectors';
import { loadPaginatedCMSItems } from './load';

/**
 * Inits the `Pagination` mode.
 * @param list The {@link List} instance.
 *
 * @returns A callback to destroy the event listeners.
 */
export const initPaginationMode = (list: List) => {
  const { currentPage, itemsPerPage, paginationWrapperElement } = list;
  if (!paginationWrapperElement) return;

  // Init hook
  list.addHook('pagination', (items) => {
    const $itemsPerPage = itemsPerPage.value;

    const start = (currentPage.value - 1) * $itemsPerPage;
    const end = start + $itemsPerPage;

    const paginatedItems = items.slice(start, end);
    return paginatedItems;
  });

  const currentPageCleanup = watch(
    list.currentPage,
    () => {
      // We reset currentPage to 1 when filtering and sorting,
      // we don't want to trigger pagination again when that happens
      if (list.currentHook) return;

      list.triggerHook('pagination', { scrollToAnchor: true });

      if (list.showQuery) {
        list.setSearchParam('page', currentPage.value.toString());
      }
    },
    {}
  );

  const paginateCleanup = watch(list.itemsPerPage, () => {
    list.triggerHook('pagination', { scrollToAnchor: true });
  });

  // Get settings
  const [pageBoundary, pageBoundaryCleanup] = getBreakpointSetting(list, 'pageboundary');
  const [pageSiblings, pageSiblingsCleanup] = getBreakpointSetting(list, 'pagesiblings');

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

  // Init items load
  loadPaginatedCMSItems(list);

  // Handle pagination elements
  const paginationWrapperCleanup = handlePaginationWrapper(list);
  const paginationButtonsCleanup = handlePaginationButtons(list);
  const paginationCountCleanup = handlePaginationCount(list);

  // Return destroy callback
  return () => {
    pageBoundaryCleanup?.();
    pageSiblingsCleanup?.();
    pageButtonsCleanup?.();
    paginationWrapperCleanup?.();
    paginationCountCleanup?.();
    paginationButtonsCleanup();
    currentPageCleanup();
    paginateCleanup();
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
  pageSiblings: Ref<number>,
  pageBoundary: Ref<number>
) => {
  const { currentPage, totalPages } = list;

  let renderedButtons = new Map<HTMLElement, number | null>();

  const pageButtonsRunner = effect(() => {
    const totalSiblings = pageSiblings.value * 2 + 1;
    const totalBoundary = pageBoundary.value * 2;

    const maxElements = totalBoundary + totalSiblings + 2;

    const isStartRange = currentPage.value - 1 < maxElements - totalSiblings;
    const isEndRange = totalPages.value - currentPage.value < maxElements - totalSiblings;

    const existingElements: Array<[HTMLElement, number | null] | undefined> = [...renderedButtons];

    for (let index = 1; index <= maxElements; index++) {
      // Get previous elements
      const [existingElement, existingTargetPage] = existingElements[index - 1] || [];
      const [lastElement] = existingElements[index - 2] || [];

      // Get rid of invalid elements
      if (index > totalPages.value) {
        if (existingElement) {
          existingElement.remove();
          existingElements[index - 1] = undefined;
        }
        continue;
      }

      // Collect new target page
      let targetPage: number | null;

      if (totalPages.value <= maxElements) targetPage = index;
      else if (isStartRange) {
        if (index > maxElements - pageBoundary.value) targetPage = totalPages.value - (maxElements - index);
        else if (index === maxElements - pageBoundary.value) targetPage = null;
        else targetPage = index;
      } else if (isEndRange) {
        if (index < pageBoundary.value + 1) targetPage = index;
        else if (index === pageBoundary.value + 1) targetPage = null;
        else targetPage = totalPages.value - (maxElements - index);
      } else {
        if (index < pageBoundary.value + 1) targetPage = index;
        else if (index > maxElements - pageBoundary.value) targetPage = totalPages.value - (maxElements - index);
        else if (index === pageBoundary.value + 1 || index === maxElements - pageBoundary.value) targetPage = null;
        else targetPage = currentPage.value + (index - (pageBoundary.value + 1) - (1 + pageSiblings.value));
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
      if (targetPage === currentPage.value) {
        elementToUpdate.classList.add(CURRENT_CSS_CLASS);
        elementToUpdate.setAttribute('aria-current', 'page');
      } else {
        elementToUpdate.classList.remove(CURRENT_CSS_CLASS);
        elementToUpdate.removeAttribute('aria-current');
      }
    }

    // Store new state
    renderedButtons = new Map([...existingElements.filter(isNotEmpty)]);
  });

  // Handle clicks
  const cleanupClicks = addListener(parentElement, 'click', (e) => {
    const { target } = e;

    if (!isElement(target)) return;

    const isPageButton = target.closest<HTMLElement>(getElementSelector('page-button'));
    if (!isPageButton) return;

    e.preventDefault();

    const targetPage = renderedButtons.get(isPageButton);
    if (!targetPage) return;

    list.currentPage.value = targetPage;
  });

  return () => {
    pageButtonsRunner.effect.stop();
    cleanupClicks();
  };
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
  { paginationSearchParam }: List
) => {
  if (!targetPage) return cloneNode(pageDotsTemplate);

  const newElement = cloneNode(pageButtonTemplate);
  newElement.classList.remove(CURRENT_CSS_CLASS);
  newElement.textContent = `${targetPage}`;

  if (isHTMLAnchorElement(newElement) && paginationSearchParam) {
    newElement.href = `?${paginationSearchParam}=${targetPage}`;
  }

  return newElement;
};

/**
 * Updates the native `Page Count` element.
 * @param list The {@link List} instance.
 * @returns A cleanup function to remove the effect.
 */
const handlePaginationCount = ({ paginationCountElement, currentPage, totalPages }: List) => {
  if (!paginationCountElement) return;

  const runner = effect(() => {
    paginationCountElement.setAttribute('aria-label', `Page ${currentPage.value} of ${totalPages.value}`);
    paginationCountElement.textContent = `${currentPage.value} / ${totalPages.value}`;
  });

  return () => runner.effect.stop();
};

/**
 * Handles the display of the pagination wrapper element.
 * @param list The {@link List} instance.
 * @returns A cleanup function to remove the effect.
 */
const handlePaginationWrapper = (list: List) => {
  if (!list.paginationWrapperElement) return;

  const runner = effect(() => {
    list.paginationWrapperElement!.style.display = list.hooks.pagination.result.value.length > 0 ? '' : 'none';
  });

  return () => runner.effect.stop();
};

/**
 * Handles the `display` and `href` properties of native pagination buttons (`Previous` & `Next`).
 * @param list The {@link List} instance.
 * @returns A cleanup function to remove the effect.
 */
const handlePaginationButtons = (list: List) => {
  const setAttributes = (element: HTMLAnchorElement, shouldDisplay: boolean) => {
    const disabledClass = getAttribute(element, 'paginationdisabledclass');

    element.style.display = '';
    element.classList[shouldDisplay ? 'remove' : 'add'](disabledClass);
    element.setAttribute('aria-disabled', shouldDisplay ? 'false' : 'true');
    element.setAttribute('aria-hidden', shouldDisplay ? 'false' : 'true');
    element.setAttribute('tabindex', shouldDisplay ? '0' : '-1');
  };

  const buttonsRunner = effect(() => {
    list.allPaginationPreviousElements.value.forEach((element) => {
      const shouldDisplay = list.currentPage.value !== 1;

      setAttributes(element, shouldDisplay);

      element.href = `?${list.paginationSearchParam}=${list.currentPage.value - 1}`;
    });

    list.allPaginationNextElements.value.forEach((element) => {
      const shouldDisplay = list.currentPage.value !== list.totalPages.value;

      setAttributes(element, shouldDisplay);

      element.href = `?${list.paginationSearchParam}=${list.currentPage.value + 1}`;
    });
  });

  const clicksCleanup = addListener(window, 'click', (e) => {
    const { target } = e;

    if (!isElement(target)) return;

    const isNextButton = target.closest(getCMSElementSelector('pagination-next'));
    const isPreviousButton = target.closest(getCMSElementSelector('pagination-previous'));

    if (!isNextButton && !isPreviousButton) return;

    e.preventDefault();

    const { currentPage, totalPages } = list;

    let targetPage: number | null | undefined;

    if (isNextButton) targetPage = currentPage.value + 1;
    else targetPage = currentPage.value - 1;

    if (!targetPage) return;
    if (targetPage < 1) return;
    if (targetPage > totalPages.value) return;

    list.currentPage.value = targetPage;
  });

  return () => {
    buttonsRunner.effect.stop();
    clicksCleanup();
  };
};

/**
 * Gets a breakpoint setting and returns it as a store that will be updated on resize.
 * @param list
 * @param setting
 * @returns A store atom and a cleanup function.
 */
const getBreakpointSetting = ({ listOrWrapper }: List, setting: 'pagesiblings' | 'pageboundary') => {
  const rawValues = getAttribute(listOrWrapper, setting);
  const values = extractCommaSeparatedValues(rawValues).map(parseInt);
  const store = ref(values[0]);

  const updateValue = () => {
    const currentBreakpoint = getCurrentBreakpoint();
    const breakpointIndex = BREAKPOINTS_INDEX[currentBreakpoint];

    for (let i = breakpointIndex; i >= 0; i--) {
      const value = values[i];

      if (isNumber(value)) {
        store.value = value;
        break;
      }
    }
  };

  const cleanup = addListener(window, 'resize', debounce(updateValue, 100));

  updateValue();

  return [store, cleanup] as const;
};
