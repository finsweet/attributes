import { extractCommaSeparatedValues, getCurrentBreakpoint, isNumber } from '@finsweet/ts-utils';
import type { PaginationWrapperElement } from '@finsweet/ts-utils';

import type { CMSList } from '$packages/cmscore';

import {
  ATTRIBUTES,
  BREAKPOINTS_INDEX,
  DEFAULT_INFINITE_THRESHOLD,
  DEFAULT_PAGE_BOUNDARY,
  DEFAULT_PAGE_SIBLINGS,
  queryElement,
} from '../utils/constants';

// Constants
const {
  pageSiblings: { key: pageSiblingsKey },
  pageBoundary: { key: pageBoundaryKey },
  threshold: { key: thresholdKey },
  showQuery: { key: showQueryKey, values: showQueryValues },
} = ATTRIBUTES;

/**
 * Collects the `Pagination` mode settings.
 * @param listInstance The {@link CMSList} instance.
 */
export const getPaginationSettings = (
  listInstance: CMSList
):
  | {
      paginationWrapper: PaginationWrapperElement;
      pageButtonTemplate?: HTMLElement | null;
      pageDotsTemplate: HTMLElement;
      paginationCount: HTMLDivElement | null | undefined;
      pageBoundary: number;
      pageBoundaryValues: number[];
      pageSiblings: number;
      pageSiblingsValues: number[];
      hasBreakpoints: boolean;
      showQueryParams: boolean;
    }
  | undefined => {
  const { paginationWrapper, paginationCount } = listInstance;

  if (!paginationWrapper) return;

  // Page Button Template
  const pageButtonTemplate = queryElement<HTMLElement>('pageButton', {
    operator: 'prefixed',
    scope: paginationWrapper,
  });

  // Page Dots Template
  let pageDotsTemplate = queryElement<HTMLElement>('pageDots', { operator: 'prefixed', scope: paginationWrapper });

  if (pageDotsTemplate) pageDotsTemplate.remove();
  else {
    pageDotsTemplate = document.createElement('div');
    pageDotsTemplate.textContent = '...';
  }

  // Page Boundary
  const rawPageBoundaryValues = listInstance.getAttribute(pageBoundaryKey);
  const pageBoundaryValues = (rawPageBoundaryValues ? extractCommaSeparatedValues(rawPageBoundaryValues) : []).map(
    (value) => parseInt(value)
  );

  // Page Siblings
  const rawPageSiblingsValues = listInstance.getAttribute(pageSiblingsKey);
  const pageSiblingsValues = (rawPageSiblingsValues ? extractCommaSeparatedValues(rawPageSiblingsValues) : []).map(
    (value) => parseInt(value)
  );

  // Breakpoints for Page Boundary/Siblings
  const [pageBoundary, pageSiblings] = getPageButtonsSettings(pageBoundaryValues, pageSiblingsValues);

  const hasBreakpoints = [pageBoundaryValues, pageSiblingsValues].some(({ length }) => length > 1);

  // Query Params
  const showQueryParams = listInstance.getAttribute(showQueryKey) === showQueryValues.true;

  return {
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
  };
};

/**
 * Returns the correspondent `pageBoundary` and `pageSiblings` settings based on the current breakpoint.
 * @param pageBoundaryValues The array of pageBoundary values.
 * @param pageSiblingsValues The array of pageSiblings values.
 * @returns A tuple with the correspondent values.
 */
export const getPageButtonsSettings = (
  pageBoundaryValues: number[],
  pageSiblingsValues: number[]
): [number, number] => {
  const currentBreakpoint = getCurrentBreakpoint();
  const breakpointIndex = BREAKPOINTS_INDEX[currentBreakpoint];

  const values: number[] = [];

  [pageBoundaryValues, pageSiblingsValues].forEach((array, index) => {
    for (let i = breakpointIndex; i >= 0; i--) {
      const value = array[i];

      if (isNumber(value)) {
        values[index] = value;
        break;
      }
    }
  });

  let [pageBoundary, pageSiblings] = values;

  pageBoundary ??= DEFAULT_PAGE_BOUNDARY;
  pageSiblings ??= DEFAULT_PAGE_SIBLINGS;

  return [pageBoundary, pageSiblings];
};

/**
 * Collects the `Infinite` mode settings.
 * @param listInstance The {@link CMSList} instance.
 */
export const getInfiniteThreshold = (listInstance: CMSList): number => {
  const threshold = parseInt(listInstance.getAttribute(thresholdKey) || DEFAULT_INFINITE_THRESHOLD);
  const thresholdCoefficient = 1 - threshold / 100;

  return thresholdCoefficient;
};
