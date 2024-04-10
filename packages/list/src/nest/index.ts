import { cloneNode, extractCommaSeparatedValues, fetchPageDocument } from '@finsweet/attributes-utils';

import { type List, ListItem } from '../components';
import { getCollectionElements } from '../utils/dom';
import {
  getAttribute,
  getElementSelector,
  getSettingSelector,
  queryAllElements,
  queryElement,
} from '../utils/selectors';
import { listInstancesStore } from '../utils/store';

/**
 * Initializes list nesting.
 * @param list - The list to initialize nesting for.
 */
export const initListNest = (list: List) => {
  const handledItems = new Set<ListItem>();

  const cleanup = list.items.subscribe((items) => {
    for (const item of items) {
      if (handledItems.has(item)) continue;

      handledItems.add(item);

      const nestTargets = queryAllElements('nest-target', { scope: item.element });

      for (const target of nestTargets) {
        handleNestTarget(list, item, target);
      }
    }
  });

  return () => {
    cleanup();
    handledItems.clear();
  };
};

/**
 * Handles a nest target element.
 * @param list
 * @param item
 * @param target
 * @returns
 */
const handleNestTarget = (list: List, item: ListItem, target: HTMLElement) => {
  if (!item.href) return;

  const instance = getAttribute(target, 'nest');
  if (!instance) return;

  const slugsElement = item.element.querySelector<HTMLElement>(
    `${getElementSelector('nest-slugs')}${getSettingSelector('nest', undefined, instance)}`
  );

  item.nesting = new Promise((resolve) => {
    if (slugsElement) {
      const slugs = extractCommaSeparatedValues(slugsElement.textContent);

      handleManualNesting(list, item, target, slugs, instance).then(resolve);
    } else {
      handleExternalNesting(list, item, target, instance).then(resolve);
    }
  });

  item.nesting;
};

/**
 * Handles manual nesting.
 * @param list
 * @param item
 * @param target
 * @param slugs
 * @param instance
 */
const handleManualNesting = async (
  list: List,
  item: ListItem,
  target: HTMLElement,
  slugs: string[],
  instance: string
) => {
  if (!slugs.length) return;
  if (!item.href) return;

  const source = [...listInstancesStore.values()].find(
    (sourceList) => sourceList !== list && sourceList.instance === instance
  );
  if (!source) return;

  const sourceItems = source.items.get();

  const sourceWrapper = cloneNode(source.wrapperElement, false);

  // Items list
  if (sourceItems.length) {
    const sourceList = source.listElement ? cloneNode(source.listElement, false) : document.createElement('div');

    await Promise.resolve();

    const elements = await Promise.all(
      sourceItems.map(async (item) => {
        await item.nesting;

        return cloneNode(item.element);
      })
    );

    sourceList.append(...elements);
    sourceWrapper.append(sourceList);
  }

  // Empty state
  else {
    let sourceEmpty = source.emptyElement.get();

    if (!sourceEmpty) {
      await source.loadingPaginationElements;
      sourceEmpty = source.emptyElement.get();
    }

    if (sourceEmpty) {
      sourceWrapper.append(sourceEmpty);
    }
  }

  item.collectFields();
  target.append(sourceWrapper);
};

/**
 * Handles external nesting.
 * @param list
 * @param item
 * @param target
 * @param instance
 */
const handleExternalNesting = async (list: List, item: ListItem, target: HTMLElement, instance: string) => {
  if (!item.href) return;

  const scope = await fetchPageDocument(item.href, { cache: list.cache });
  if (!scope) return;

  const sourceReference = queryElement('wrapper', { scope, instance }) || queryElement('list', { scope, instance });
  if (!sourceReference) return;

  const sourceWrapper = getCollectionElements(sourceReference, 'wrapper');
  if (!sourceWrapper) return;

  const sourceList = getCollectionElements(sourceReference, 'list');
  const sourceItems = getCollectionElements(sourceReference, 'item');
  const sourceEmpty = getCollectionElements(sourceReference, 'empty');

  if (sourceEmpty) {
    target.append(sourceEmpty);
    return;
  }

  if (!sourceList || !sourceItems.length) return;

  // Recursively nest items
  await Promise.all(
    sourceItems.map(async (sourceItem) => {
      const nestedTargets = queryAllElements('nest-target', { scope: sourceItem });
      if (!nestedTargets.length) return;

      await Promise.all(
        nestedTargets.map(async (nestedTarget) => {
          const nestedInstance = getAttribute(nestedTarget, 'nest');
          if (!nestedInstance) return;

          const nestedItem = new ListItem(sourceItem, sourceList);

          await handleExternalNesting(list, nestedItem, nestedTarget, nestedInstance);

          item.collectFields();
        })
      );
    })
  );

  item.collectFields();
  target.append(sourceWrapper);
};
