import { addListener, parseNumericAttribute } from '@finsweet/attributes-utils';
import throttle from 'just-throttle';

import type { List } from '../components/List';
import { DEFAULT_INFINITE_THRESHOLD } from '../utils/constants';
import { getAttribute, queryElement } from '../utils/selectors';
import { loadPaginatedItems } from './load';

/**
 * Inits the infinite mode.
 * @param list The {@link List} instance.
 *
 * @returns A callback to remove all event listeners.
 */
export const initInfiniteMode = (list: List) => {
  const {
    listElement,
    paginationNextElement,
    paginationPreviousElement,
    paginationCountElement,
    itemsPerPage,
    instance,
  } = list;

  if (!listElement) return;

  const paginationNextButton = paginationNextElement.value;
  if (!paginationNextButton) return;

  paginationCountElement?.remove();

  const paginationPreviousButton = paginationPreviousElement.value;
  if (paginationPreviousButton) {
    paginationPreviousButton.style.display = 'none';
  }

  const initialItemsPerPage = itemsPerPage.value;
  const thresholdCoefficient = getInfiniteThreshold(list);
  const loadRemainingButton = queryElement('load-remaining', { instance });

  let isLoading = true;
  let loadRemainingClicked = false;

  list.addHook('paginate', (items) => {
    const paginatedItems = items.slice(0, itemsPerPage.value);
    const allItemsDisplayed = paginatedItems.length === items.length;

    paginationNextButton.style.display = allItemsDisplayed ? 'none' : '';

    if (!isLoading && allItemsDisplayed) {
      cleanup();
      return;
    }

    return paginatedItems;
  });

  /**
   * Handles a scroll event.
   * Recalculates the scroll ratio of the element.
   */
  const handleScroll = throttle(async () => {
    const { innerHeight } = window;
    const { bottom } = listElement.getBoundingClientRect();

    const validRange = thresholdCoefficient * innerHeight;
    const shouldLoad = bottom > 0 && bottom <= validRange;

    if (shouldLoad) {
      itemsPerPage.value += initialItemsPerPage;
      list.triggerHook('paginate');
    }
  }, 100);

  const observer = new IntersectionObserver((entries) => {
    for (const { isIntersecting } of entries) {
      const action = isIntersecting ? 'addEventListener' : 'removeEventListener';
      window[action]('scroll', handleScroll);
    }
  });

  // Set listeners
  observer.observe(listElement);

  const cleanupScroll = addListener(window, 'scroll', handleScroll);
  const cleanupPaginationNextButton = addListener(paginationNextButton, 'click', (e) => e.preventDefault());
  const cleanupLoadRemainingButton = loadRemainingButton
    ? addListener(
        loadRemainingButton,
        'click',
        async (e) => {
          e.preventDefault();

          loadRemainingClicked = true;

          itemsPerPage.value = list.items.value.length;

          list.triggerHook('paginate');
        },
        { once: true }
      )
    : undefined;

  // Init
  loadPaginatedItems(list).then(() => {
    isLoading = false;

    if (loadRemainingClicked) {
      itemsPerPage.value = list.items.value.length;
    }
  });

  const cleanup = () => {
    observer.disconnect();
    cleanupScroll();
    cleanupPaginationNextButton();
    cleanupLoadRemainingButton?.();
  };

  return cleanup;
};

/**
 * Collects the `Infinite` mode settings.
 * @param list The {@link List} instance.
 */
const getInfiniteThreshold = (list: List): number => {
  const rawThreshold = getAttribute(list.listOrWrapper, 'threshold');
  const threshold = parseNumericAttribute(rawThreshold, DEFAULT_INFINITE_THRESHOLD);

  const thresholdCoefficient = 1 - threshold / 100;
  return thresholdCoefficient;
};
