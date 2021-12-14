import { COMMERCE_CSS_CLASSES, LIGHTBOX_CSS_CLASSES } from '@finsweet/ts-utils';

import type { CMSList } from '$cms/cmscore/src';
import { addItemsAnimation, addListAnimation } from '$cms/utils/animation';

import { initDefaultMode } from './modes/default';
import { initInfiniteMode } from './modes/infinite';
import { initPaginationMode } from './modes/pagination';
import { initRenderAllMode } from './modes/render-all';
import { ATTRIBUTES, queryElement } from './utils/constants';

// Constants
const {
  element: { key: elementKey },
  mode: {
    key: modeKey,
    values: { renderAll, infinite, pagination },
  },
  animation: { key: animationKey },
  duration: { key: durationKey },
  easing: { key: easingKey },
  stagger: { key: staggerKey },
  resetIx: { key: resetIxKey, values: resetIxValues },
} = ATTRIBUTES;

const { Webflow } = window;

/**
 * Gets the base config and inits a `mode` for a `CMSList` instance.
 * @param listInstance The {@link CMSList} instance.
 * @returns The same instance.
 */
export const initLoadInstance = async (listInstance: CMSList) => {
  const instanceIndex = listInstance.getInstanceIndex(elementKey);
  const { items } = listInstance;

  // Get animation config
  addItemsAnimation(listInstance, { animationKey, durationKey, easingKey, staggerKey });

  addListAnimation(listInstance, { durationKey, easingKey });

  // Get commerce config
  const restartCommerce =
    !!Webflow &&
    'require' in Webflow &&
    !!Webflow.require('commerce') &&
    items.some(({ element }) => element.querySelector(`.${COMMERCE_CSS_CLASSES.addToCartForm}`));

  if (restartCommerce) listInstance.restartCommerce = restartCommerce;

  // Get lightbox config
  const restartLightbox =
    !!Webflow &&
    'require' in Webflow &&
    !!Webflow.require('lightbox') &&
    items.some(({ element }) => element.querySelector(`.${LIGHTBOX_CSS_CLASSES.trigger}`));

  if (restartLightbox) listInstance.restartLightbox = restartLightbox;

  // Get resetIx config
  const restartIx = listInstance.getAttribute(resetIxKey) === resetIxValues.true;
  if (restartIx) listInstance.restartIx = restartIx;

  // Get loader
  const loaderElement = queryElement<HTMLElement>('loader', { instanceIndex });
  if (loaderElement) listInstance.addLoader(loaderElement);

  // Get items count element
  if (!listInstance.itemsCount) {
    const itemsCount = queryElement<HTMLElement>('itemsCount', { instanceIndex });
    if (itemsCount) listInstance.addItemsCount(itemsCount);
  }

  // Get scroll anchor
  if (!listInstance.scrollAnchor) {
    const scrollAnchor = queryElement<HTMLElement>('scrollAnchor', { instanceIndex });
    if (scrollAnchor) listInstance.scrollAnchor = scrollAnchor;
  }

  // Init mode
  const mode = listInstance.getAttribute(modeKey);

  if (mode === renderAll) await initRenderAllMode(listInstance);
  else if (mode === infinite) initInfiniteMode(listInstance);
  else if (mode === pagination) await initPaginationMode(listInstance);
  else initDefaultMode(listInstance);

  return listInstance;
};
