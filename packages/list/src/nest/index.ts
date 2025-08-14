import {
  attachExternalStylesheets,
  cloneNode,
  extractCommaSeparatedValues,
  fetchPage,
} from '@finsweet/attributes-utils';
import { effect, triggerRef } from '@vue/reactivity';

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
    let hasChanges = false;

    Promise.all(
      list.items.value.map(async (item) => {
        if (handledItems.has(item)) return;

        handledItems.add(item);

        const nestTargets = queryAllElements('nest-target', { scope: item.element });
        if (!nestTargets.length) return;

        await Promise.all(nestTargets.map(async (target) => handleNestTarget(list, item, target)));

        hasChanges = true;
      })
    ).then(() => {
      if (hasChanges) {
        triggerRef(list.items);
      }
    });
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

  return item.nesting;
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

  const sourceItems = source.items.value.filter(({ href }) => {
    if (!href) return false;

    try {
      const url = new URL(href);
      const [slug] = url.pathname.match(/[^/]+(?=\/$|$)/g) || [];

      return slug && slugs.includes(slug);
    } catch {
      return false;
    }
  });

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

  target.append(sourceWrapper);
  item.collectFields();
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

  const scope = await fetchPage(item.href, { cache: list.cache });
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

  // Collect stylesheets from the item page template
  const externalStylesheetsPromise = attachExternalStylesheets(scope);

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

  // Append external stylesheets, if any
  // This is required since Webflow launched per-page CSS splitting
  // as items may come unstyled
  await externalStylesheetsPromise;

  target.append(sourceWrapper);
  item.collectFields();
};
