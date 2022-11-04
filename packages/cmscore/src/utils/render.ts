import { isNumber, wait } from '@finsweet/ts-utils';

import type { CMSItem, CMSList } from '..';
import { restartWebflowModules } from './webflow';

/**
 * Defines: [The item to render, The index where to render it, The item to use as anchor]
 */
type AnchorData = [CMSItem, number, CMSItem | undefined];

/**
 * Shows / hides the list items based on their properties.
 * @param listInstance The {@link CMSList} instance.
 * @param animateItems Defines if the rendered items should be animated.
 * @param animateList Defines if the list should be animated.
 */
export const renderListItems = async (listInstance: CMSList, animateItems = false, animateList = true) => {
  const { items, itemsPerPage, paginationActive, currentPage, emptyState: oldEmptyState } = listInstance;

  // Collect items and recalculate the total pages
  const validItems: CMSItem[] = [];
  const itemsToHide: CMSItem[] = [];
  const itemsToShow: CMSItem[] = [];

  for (const item of items) {
    const { valid, currentIndex } = item;
    const rendered = isNumber(currentIndex);

    if (valid) {
      validItems.push(item);

      if (!paginationActive || !currentPage) {
        itemsToShow.push(item);
        continue;
      }

      const matchesCurrentPage =
        validItems.length > (currentPage - 1) * itemsPerPage && validItems.length <= currentPage * itemsPerPage;

      if (matchesCurrentPage) itemsToShow.push(item);
      else if (rendered) itemsToHide.push(item);
    } else if (rendered) itemsToHide.push(item);
  }

  // Set new properties
  listInstance.validItems = validItems;
  listInstance.totalPages = Math.ceil(validItems.length / itemsPerPage) || 1;

  const newEmptyState = !validItems.length;
  listInstance.emptyState = newEmptyState;

  // Prepare items to show
  const itemsToAnchor: AnchorData[] = [];

  itemsToShow.forEach((item, index) => {
    if (item.currentIndex !== index) itemsToAnchor.push([item, index, itemsToShow[index - 1]]);
  });

  // Animate the list
  const shouldAnimateList = (animateList && !animateItems) || oldEmptyState !== newEmptyState;

  if (shouldAnimateList) await listInstance.displayElement(oldEmptyState ? 'emptyElement' : 'list', false);

  // Render the items
  await Promise.all([
    ...hideItems(itemsToHide, listInstance, animateItems),
    ...showItems(itemsToAnchor, listInstance, animateItems),
  ]);

  // Emit events
  await listInstance.emitSerial('renderitems', itemsToShow);

  // Restart Webflow Modules if needed
  await restartWebflowModules(itemsToShow, listInstance);

  // Animate the list
  if (shouldAnimateList) await listInstance.displayElement(newEmptyState ? 'emptyElement' : 'list');

  return itemsToShow;
};

/**
 * Hides the items of a {@link CMSList}.
 *
 * @param itemsToHide An array of {@link CMSItem} to hide.
 * @param listInstance The `CMSList` instance.
 * @param animateItems Defines if the items should be animated when hiding them.
 * @returns An Array of promises.
 */
const hideItems = (itemsToHide: CMSItem[], { itemsAnimation }: CMSList, animateItems: boolean) => {
  return itemsToHide.map(async (item) => {
    const { element } = item;

    if (animateItems && itemsAnimation) {
      const { animateOut, options } = itemsAnimation;

      await animateOut(element, { remove: true, ...options });
    } else {
      element.remove();
    }

    item.currentIndex = undefined;
  });
};

/**
 * Shows the items of a {@link CMSList}.
 *
 * @param itemsToHide An array of {@link CMSItem} to show + the anchor `CMSItem` that precedes it.
 * This is used to define the exact spot where the `CMSItem` should be added in the list.
 * @param listInstance The `CMSList` instance.
 * @param animateItems Defines if the items should be animated when showing them.
 * @returns An Array of promises.
 */
const showItems = (itemsToAnchor: AnchorData[], { list, itemsAnimation }: CMSList, animateItems: boolean) => {
  if (!list) return [];

  return itemsToAnchor.map(async ([item, newIndex, anchor], actionIndex) => {
    item.animating = new Promise(async (resolveAnimating) => {
      item.rendering = new Promise(async (resolveRendering) => {
        await anchor?.rendering;

        const { element, currentIndex } = item;

        const anchorElement = anchor?.element || null;

        if (!isNumber(currentIndex) && animateItems && itemsAnimation) {
          const { prepareIn, animateIn, options } = itemsAnimation;
          const { stagger, ...animationOptions } = options || {};

          const settings = {
            target: list,
            insertAfter: anchorElement,
            ...animationOptions,
          };

          prepareIn(element, settings);
          iOSReRenderImages(element);
          resolveRendering();

          if (stagger) await wait(stagger * actionIndex);

          await animateIn(element, { ...settings, prepared: true });
        } else {
          if (anchorElement) list.insertBefore(element, anchorElement.nextSibling);
          else list.prepend(element);

          iOSReRenderImages(element);
          resolveRendering();
        }

        resolveAnimating();
      });
    });

    await item.rendering;

    item.currentIndex = newIndex;
  });
};

/**
 * Re-renders images to fix Safari issues with [srcset] attributes.
 * @param element The Collection List Item element.
 */
const iOSReRenderImages = (element: HTMLDivElement) => {
  if (!/apple/i.test(navigator.vendor)) return;

  const images = element.querySelectorAll('img');

  for (const image of images) image.outerHTML = image.outerHTML;
};
