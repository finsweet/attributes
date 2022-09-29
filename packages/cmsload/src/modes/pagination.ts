import { cloneNode, CMS_CSS_CLASSES, CURRENT_CSS_CLASS, isNotEmpty } from '@finsweet/ts-utils';
import debounce from 'just-debounce';

import type { CMSList } from '$packages/cmscore';

import { loadPaginatedItems } from '../actions/load';
import { handlePaginationButtons, updatePaginationCount } from '../actions/pagination';
import { getPaginationSettings, getPageButtonsSettings } from '../actions/settings';
import { getSelector } from '../utils/constants';
import type { PageButtonsData } from '../utils/types';

// Constants
const { paginationNext: paginationNextCSSClass, paginationPrevious: paginationPreviousCSSClass } = CMS_CSS_CLASSES;

/**
 * Inits the `Paginate` mode.
 * @param listInstance The {@link CMSList} instance.
 */
export const initPaginationMode = async (listInstance: CMSList): Promise<void> => {
  const settingsData = getPaginationSettings(listInstance);
  if (!settingsData) return;

  const {
    paginationWrapper,
    pageButtonTemplate,
    pageDotsTemplate,
    paginationCount,
    pageBoundary,
    pageBoundaryValues,
    pageSiblings,
    pageSiblingsValues,
    hasBreakpoints,
    showQueryParams,
  } = settingsData;

  let pageButtonsData: PageButtonsData | undefined;

  if (pageButtonTemplate) {
    const { parentElement } = pageButtonTemplate;

    pageButtonTemplate.remove();

    if (parentElement) {
      pageButtonsData = {
        parentElement,
        pageButtonTemplate,
        pageDotsTemplate,
        pageBoundary,
        pageSiblings,
        renderedElements: new Map([]),
      };
    }
  }

  // Set initial state
  listInstance.initPagination(showQueryParams);

  //  Listen events
  listInstance.on('renderitems', () => handleElements(listInstance, pageButtonsData, paginationCount));

  paginationWrapper.addEventListener('click', (e) => handlePaginationClicks(e, pageButtonsData, listInstance));

  if (pageButtonsData && hasBreakpoints) {
    window.addEventListener(
      'resize',
      debounce(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        handleWindowResize(pageButtonsData!, listInstance, pageBoundaryValues, pageSiblingsValues);
      }, 100)
    );
  }

  // Init items load
  await loadPaginatedItems(listInstance);
};

/**
 * Handles all dynamic elements.
 * @param listInstance The {@link CMSList} instance.
 * @param pageButtonsData The {@link PageButtonsData} array.
 * @param paginationCount The {@link PageCountElement}.
 * @param updatePaginationButtons `true` by default.
 */
const handleElements = (
  listInstance: CMSList,
  pageButtonsData: PageButtonsData | undefined,
  paginationCount: HTMLDivElement | null | undefined,
  updatePaginationButtons = true
) => {
  if (pageButtonsData) handlePageButtons(pageButtonsData, listInstance);
  if (paginationCount) updatePaginationCount(paginationCount, listInstance);
  if (updatePaginationButtons) handlePaginationButtons(listInstance);
};

/**
 * Handles the custom page buttons state.
 * @param pageButtonsData The {@link PageButtonsData} array.
 * @param listInstance The {@link CMSList} instance.
 * @returns
 */
const handlePageButtons = (pageButtonsData: PageButtonsData, listInstance: CMSList) => {
  const { currentPage, totalPages } = listInstance;
  if (!currentPage) return;

  const { parentElement, renderedElements, pageBoundary, pageSiblings } = pageButtonsData;

  const existingElements: Array<[HTMLElement, number | null] | undefined> = [...renderedElements];

  const totalSiblings = pageSiblings * 2 + 1;
  const totalBoundary = pageBoundary * 2;

  const maxElements = totalBoundary + totalSiblings + 2;

  const isStartRange = currentPage - 1 < maxElements - totalSiblings;
  const isEndRange = totalPages - currentPage < maxElements - totalSiblings;

  for (let index = 1; index <= maxElements; index++) {
    // Get previous elements
    const [existingElement, existingTargetPage] = existingElements[index - 1] || [];
    const [lastElement] = existingElements[index - 2] || [];

    // Get rid of invalid elements
    if (index > totalPages) {
      if (existingElement) {
        existingElement.remove();
        existingElements[index - 1] = undefined;
      }
      continue;
    }

    // Collect new target page
    let targetPage: number | null;

    if (totalPages <= maxElements) targetPage = index;
    else if (isStartRange) {
      if (index > maxElements - pageBoundary) targetPage = totalPages - (maxElements - index);
      else if (index === maxElements - pageBoundary) targetPage = null;
      else targetPage = index;
    } else if (isEndRange) {
      if (index < pageBoundary + 1) targetPage = index;
      else if (index === pageBoundary + 1) targetPage = null;
      else targetPage = totalPages - (maxElements - index);
    } else {
      if (index < pageBoundary + 1) targetPage = index;
      else if (index > maxElements - pageBoundary) targetPage = totalPages - (maxElements - index);
      else if (index === pageBoundary + 1 || index === maxElements - pageBoundary) targetPage = null;
      else targetPage = currentPage + (index - (pageBoundary + 1) - (1 + pageSiblings));
    }

    // Render a new item only when needed
    let newElement: HTMLElement | undefined;

    if (existingTargetPage !== targetPage) {
      // Remove the existing element
      existingElement?.remove();

      // Add the new item
      newElement = createPageElement(pageButtonsData, targetPage, listInstance);
      existingElements[index - 1] = [newElement, targetPage];

      if (lastElement) parentElement.insertBefore(newElement, lastElement.nextSibling);
      else parentElement.appendChild(newElement);

      newElement.style.opacity = '';
    }

    const elementToUpdate = newElement || existingElement;
    if (!elementToUpdate) continue;

    // Update CSS and Aria
    updatePageElement(elementToUpdate, targetPage === currentPage);
  }

  // Store new state
  pageButtonsData.renderedElements = new Map([...existingElements.filter(isNotEmpty)]);
};

/**
 * Creates a new page element.
 * @param pageButtonsData The {@link PageButtonsData} object.
 * @param targetPage The page where it will point to. If no target page is defined, a `Page Dots` element will be returned.
 * @param listInstance The {@link CMSList} instance.
 * @returns The new element.
 */
const createPageElement = (
  { pageButtonTemplate, pageDotsTemplate }: PageButtonsData,
  targetPage: number | null,
  { pagesQuery }: CMSList
) => {
  if (!targetPage) return cloneNode(pageDotsTemplate);

  const newElement = cloneNode(pageButtonTemplate);
  newElement.classList.remove(CURRENT_CSS_CLASS);
  newElement.textContent = `${targetPage}`;

  if (newElement instanceof HTMLAnchorElement && pagesQuery) newElement.href = `?${pagesQuery}=${targetPage}`;

  return newElement;
};

/**
 * Updates the CSS and `a11ty` of a page element.
 * @param element The page element.
 * @param isCurrentPage Defines if the element points to the current active page.
 */
const updatePageElement = (element: HTMLElement, isCurrentPage: boolean) => {
  if (isCurrentPage) {
    element.classList.add(CURRENT_CSS_CLASS);
    element.setAttribute('aria-current', 'page');
  } else {
    element.classList.remove(CURRENT_CSS_CLASS);
    element.removeAttribute('aria-current');
  }
};

/**
 * Handles clicks on the pagination elements.
 * @param e The click event.
 * @param pageButtonsData The {@link PageButtonsData} array.
 * @param listInstance The {@link CMSList} instance.
 */
const handlePaginationClicks = (e: MouseEvent, pageButtonsData: PageButtonsData | undefined, listInstance: CMSList) => {
  const { target } = e;

  if (!(target instanceof Element)) return;

  const isPageButton = target.closest<HTMLElement>(getSelector('element', 'pageButton', { operator: 'prefixed' }));
  const isNextButton = target.closest(`.${paginationNextCSSClass}`);
  const isPreviousButton = target.closest(`.${paginationPreviousCSSClass}`);

  if (!isPageButton && !isNextButton && !isPreviousButton) return;

  e.preventDefault();

  const { currentPage, totalPages } = listInstance;

  if (!currentPage) return;

  let targetPage: number | null | undefined;

  if (isNextButton) targetPage = currentPage + 1;
  if (isPreviousButton) targetPage = currentPage - 1;
  if (isPageButton) targetPage = pageButtonsData?.renderedElements.get(isPageButton);

  if (!targetPage) return;

  if (targetPage >= 1 && targetPage <= totalPages) listInstance.switchPage(targetPage);
};

/**
 * Handles the page buttons when resizing the window.
 * @param pageButtonsData The {@link PageButtonsData} object.
 * @param listInstance The {@link CMSList} instance.
 * @param args The parameters for {@link getPageButtonsSettings}.
 */
const handleWindowResize = (
  pageButtonsData: PageButtonsData,
  listInstance: CMSList,
  ...args: Parameters<typeof getPageButtonsSettings>
) => {
  const { pageBoundary, pageSiblings, renderedElements } = pageButtonsData;

  const [newPageBoundary, newPageSiblings] = getPageButtonsSettings(...args);

  if (pageBoundary === newPageBoundary && pageSiblings === newPageSiblings) return;

  pageButtonsData.pageBoundary = newPageBoundary;
  pageButtonsData.pageSiblings = newPageSiblings;

  for (const [element] of renderedElements) element.remove();

  renderedElements.clear();

  handlePageButtons(pageButtonsData, listInstance);
};
