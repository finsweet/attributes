import { cloneNode, extractCommaSeparatedValues, fetchPageDocument } from '@finsweet/attributes-utils';
import { effect } from '@vue/reactivity';

import { List, ListItem } from '../components';
import { getAllCollectionListWrappers, getCollectionElements } from '../utils/dom';
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

  const runner = effect(() => {
    for (const item of list.items.value) {
      if (handledItems.has(item)) continue;

      handledItems.add(item);

      const nestTargets = queryAllElements('nest-target', { scope: item.element });

      for (const target of nestTargets) {
        handleNestTarget(list, item, target);
      }
    }
  });

  return () => {
    runner.effect.stop();
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
    `${getElementSelector('nest-slugs')}${getSettingSelector('nest', instance)}`
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

  const sourceItems = source.items.value;

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
    let sourceEmpty = source.emptyElement.value;

    if (!sourceEmpty) {
      await source.loadingPaginationElements;
      sourceEmpty = source.emptyElement.value;
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

  const allWrappers = getAllCollectionListWrappers(scope);

  const index = allWrappers.indexOf(sourceWrapper);
  if (index === -1) return;

  const sourceInstance = new List(sourceWrapper, index, false);

  if (sourceInstance.emptyElement.value) {
    target.append(sourceInstance.emptyElement.value);
    return;
  }

  if (!sourceInstance.items.value.length) return;

  // Recursively nest items
  await Promise.all(
    sourceInstance.items.value.map(async (sourceItem) => {
      const nestedTargets = queryAllElements('nest-target', { scope: sourceItem.element });
      if (!nestedTargets.length) return;

      await Promise.all(
        nestedTargets.map(async (nestedTarget) => {
          const nestedInstance = getAttribute(nestedTarget, 'nest');
          if (!nestedInstance) return;

          await handleExternalNesting(list, sourceItem, nestedTarget, nestedInstance);

          item.collectFields();
        })
      );
    })
  );

  item.collectFields();
  target.append(sourceWrapper);
};
