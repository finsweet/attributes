import { addItemsAnimation, addListAnimation, type CMSList } from '@finsweet/attributes-cmscore';
import { COMMERCE_CSS_CLASSES, LIGHTBOX_CSS_CLASSES } from '@finsweet/attributes-utils';

import { initDefaultMode } from './modes/default';
import { initInfiniteMode } from './modes/infinite';
import { initPaginationMode } from './modes/pagination';
import { initRenderAllMode } from './modes/render-all';
import { SETTINGS } from './utils/constants';
import {
  getAttribute,
  getInstanceIndex,
  getSettingAttributeName,
  hasAttributeValue,
  queryElement,
} from './utils/selectors';

// Constants
const {
  mode: {
    values: { renderAll, infinite, pagination },
  },
} = SETTINGS;

/**
 * Gets the base config and inits a `mode` for a `CMSList` instance.
 * @param listInstance The {@link CMSList} instance.
 * @returns The same instance.
 */
export const initLoadInstance = async (listInstance: CMSList) => {
  const { Webflow } = window;
  const { items, listOrWrapper } = listInstance;

  const instanceIndex = getInstanceIndex(listOrWrapper);
  const webflowReady = !!Webflow && 'require' in Webflow;

  // Get animation config
  addItemsAnimation(listInstance, {
    animationKey: getSettingAttributeName('animation'),
    durationKey: getSettingAttributeName('duration'),
    easingKey: getSettingAttributeName('easing'),
    staggerKey: getSettingAttributeName('stagger'),
  });
  addListAnimation(listInstance, {
    durationKey: getSettingAttributeName('duration'),
    easingKey: getSettingAttributeName('easing'),
  });

  // Get commerce config
  const restartCommerce =
    webflowReady &&
    !!Webflow.require('commerce') &&
    items.some(({ element }) => element.querySelector(`.${COMMERCE_CSS_CLASSES.addToCartForm}`));

  if (restartCommerce) listInstance.restartCommerce = restartCommerce;

  // Get lightbox config
  const restartLightbox =
    webflowReady &&
    !!Webflow.require('lightbox') &&
    items.some(({ element }) => element.querySelector(`.${LIGHTBOX_CSS_CLASSES.trigger}`));

  if (restartLightbox) listInstance.restartLightbox = restartLightbox;

  // Get resetIx config
  const restartIx = hasAttributeValue(listOrWrapper, 'resetix', 'true');
  if (restartIx) listInstance.restartIx = restartIx;

  // Get loader
  const loaderElement = queryElement('loader', { instanceIndex });
  if (loaderElement) listInstance.addLoader(loaderElement);

  // Empty State Element
  const emptyElement = queryElement('empty', { instanceIndex });
  if (emptyElement) listInstance.addEmptyElement(emptyElement);

  // Get items count element
  if (!listInstance.itemsCount) {
    const itemsCount = queryElement('items-count', { instanceIndex });
    if (itemsCount) listInstance.addItemsCount(itemsCount);
  }

  // Get visible count elements
  if (!listInstance.visibleCount || !listInstance.visibleCountFrom || !listInstance.visibleCountTo) {
    const visibleCountTotal = queryElement('visible-count', { instanceIndex });
    const visibleCountFrom = queryElement('visible-count-from', { instanceIndex });
    const visibleCountTo = queryElement('visible-count-to', { instanceIndex });

    listInstance.addVisibleCount(visibleCountTotal, visibleCountFrom, visibleCountTo);
  }

  // Get scroll anchor
  if (!listInstance.scrollAnchor) {
    const scrollAnchor = queryElement('scroll-anchor', { instanceIndex });
    if (scrollAnchor) listInstance.scrollAnchor = scrollAnchor;
  }

  // Get caching options
  const disableCache = hasAttributeValue(listOrWrapper, 'cache', 'false');
  if (disableCache) {
    listInstance.cacheItems = false;
  }

  // Init mode
  const mode = getAttribute(listOrWrapper, 'mode');

  const cleanup =
    mode === renderAll
      ? await initRenderAllMode(listInstance)
      : mode === infinite
      ? await initInfiniteMode(listInstance)
      : mode === pagination
      ? await initPaginationMode(listInstance)
      : await initDefaultMode(listInstance);

  return cleanup;
};
