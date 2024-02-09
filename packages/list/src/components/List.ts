import {
  type CollectionItemElement,
  type CollectionListElement,
  type CollectionListWrapperElement,
  getObjectEntries,
  isNumber,
  type PageCountElement,
  type PaginationButtonElement,
  type PaginationWrapperElement,
  parseNumericAttribute,
} from '@finsweet/attributes-utils';
import { animations } from '@finsweet/attributes-utils';
import { atom, deepMap, type WritableAtom } from 'nanostores';

import type { FiltersData } from '../filter/types';
import { getCollectionElements } from '../utils/dom';
import { getPaginationQuery } from '../utils/pagination';
import { subscribeMultiple } from '../utils/reactivity';
import { getAttribute, getInstanceIndex, queryElement } from '../utils/selectors';
import { listInstancesStore } from '../utils/store';
import { ListItem } from './ListItem';

type HookKey = 'filter' | 'sort' | 'paginate' | 'beforeRender' | 'render' | 'afterRender';
type HookCallback = (items: ListItem[]) => ListItem[] | Promise<ListItem[]> | void | Promise<void>;
type Hooks = {
  [key in HookKey]: {
    previous?: HookKey;
    callbacks: HookCallback[];
    result: WritableAtom<ListItem[] | undefined>;
  };
};

export class List {
  /**
   * Contains all lifecycle hooks with their callbacks and last result.
   */
  readonly hooks: Hooks = {
    filter: {
      callbacks: [],
      result: atom(),
    },

    sort: {
      previous: 'filter',
      callbacks: [],
      result: atom(),
    },

    paginate: {
      previous: 'sort',
      callbacks: [],
      result: atom(),
    },

    beforeRender: {
      previous: 'paginate',
      callbacks: [],
      result: atom(),
    },

    render: {
      previous: 'beforeRender',
      callbacks: [],
      result: atom(),
    },

    afterRender: {
      previous: 'render',
      callbacks: [],
      result: atom(),
    },
  };

  /**
   * A signal holding all {@link ListItem} instances of the list.
   */
  readonly items: WritableAtom<ListItem[]> = atom([]);

  /**
   * A set holding all rendered {@link ListItem} instances.
   */
  renderedItems: Set<ListItem> = new Set();

  /**
   * The instance index.
   */
  readonly instanceIndex?: number;

  /**
   * The `Collection List` element.
   */
  readonly listElement?: CollectionListElement | null;

  /**
   * The `Pagination` wrapper element.
   */
  readonly paginationWrapperElement?: PaginationWrapperElement | null;

  /**
   * The `Page Count` element.
   */
  readonly paginationCountElement?: PageCountElement | null;

  /**
   * The `Previous` button.
   */
  readonly paginationPreviousElement: WritableAtom<PaginationButtonElement | null>;

  /**
   * The `Next` button.
   */
  readonly paginationNextElement: WritableAtom<PaginationButtonElement | null>;

  /**
   * A custom `Empty State` element.
   */
  readonly emptyElement?: HTMLElement | null;

  /**
   * A custom loader element.
   */
  readonly loaderElement?: HTMLElement | null;

  /**
   * An element that displays the total amount of items in the list.
   */
  readonly itemsCountElement?: HTMLElement | null;

  /**
   * An element that displays the total amount of items in the list after filtering.
   */
  readonly resultsCountElement?: HTMLElement | null;

  /**
   * An element that displays the amount of visible items.
   */
  readonly visibleCountElement?: HTMLElement | null;

  /**
   * An element that displays the lower range of visible items.
   */
  readonly visibleCountFromElement?: HTMLElement | null;

  /**
   * An element that displays the upper range of visible items.
   */
  readonly visibleCountToElement?: HTMLElement | null;

  /**
   * Defines the amount of items per page.
   */
  readonly itemsPerPage: WritableAtom<number>;

  /**
   * Defines the total amount of pages in the list.
   */
  readonly totalPages = atom(1);

  /**
   * Defines the current page in `Pagination` mode.
   */
  readonly currentPage = atom(1);

  /**
   * Defines the active filters.
   */
  readonly filters = deepMap<FiltersData>({});

  /**
   * Defines if the pagination query param should be added to the URL when switching pages.
   * @example '?5f7457b3_page=1'
   */
  readonly showPagesQuery = atom(false);

  /**
   * Defines the query key for the paginated pages.
   * @example '5f7457b3_page'
   */
  pagesQuery?: string;

  /**
   * Defines an awaitable Promise that resolves once the pagination data (`currentPage` + `pagesQuery`) has been extracted.
   */
  loadingPaginationData?: Promise<void>;

  /**
   * Defines if loaded CMS Items can be cached using IndexedDB after fetching them.
   */
  cacheItems = true;

  constructor(public readonly wrapperElement: CollectionListWrapperElement, public readonly pageIndex: number) {
    // Collect elements
    const listElement = getCollectionElements(wrapperElement, 'list');
    this.listElement = listElement;

    const instanceIndex = getInstanceIndex(listElement || wrapperElement);
    this.instanceIndex = instanceIndex;

    this.paginationWrapperElement = getCollectionElements(wrapperElement, 'pagination-wrapper');
    this.paginationCountElement = getCollectionElements(wrapperElement, 'page-count');
    this.paginationNextElement = atom(getCollectionElements(wrapperElement, 'pagination-next'));
    this.paginationPreviousElement = atom(getCollectionElements(wrapperElement, 'pagination-previous'));
    this.emptyElement = getCollectionElements(wrapperElement, 'empty');
    this.loaderElement = queryElement('loader', { instanceIndex });
    this.itemsCountElement = queryElement('items-count', { instanceIndex });
    this.visibleCountElement = queryElement('visible-count', { instanceIndex });
    this.visibleCountFromElement = queryElement('visible-count-from', { instanceIndex });
    this.visibleCountToElement = queryElement('visible-count-to', { instanceIndex });
    this.resultsCountElement = queryElement('results-count', { instanceIndex });

    // Collect items
    const collectionItemElements = getCollectionElements(wrapperElement, 'item');

    this.itemsPerPage = atom(collectionItemElements.length);

    if (listElement) {
      const items = collectionItemElements.map((element) => new ListItem(element, listElement));

      this.items.set(items);
      this.renderedItems = new Set(items);
    }

    // Extract pagination data
    this.loadingPaginationData = getPaginationQuery(this);

    // Init hooks
    this.#initHooks();

    // Elements side effects
    this.#initElements();
  }

  /**
   * Initializes the lifecycle hooks.
   */
  #initHooks() {
    // Add render hook
    this.addHook('render', async (items) => {
      const { fade } = animations;

      items.forEach((item, index) => {
        const previousItem = items[index - 1];
        const duration = parseNumericAttribute(getAttribute(item.element, 'duration')) || 1000;

        const render = () => {
          if (previousItem) {
            previousItem.element.after(item.element);
          } else {
            this.listElement?.prepend(item.element);
          }
          fade.animateIn(item.element, { duration: duration / 1000 });
          item.currentIndex = index;
        };

        // Is rendered
        if (isNumber(item.currentIndex)) {
          if (item.currentIndex !== index) {
            render();
          }

          this.renderedItems.delete(item);
        }

        // Is not rendered
        else {
          render();
        }
      });

      // Remove items that should not be rendered anymore
      this.renderedItems.forEach((renderedItem) => {
        fade.animateOut(renderedItem.element);
        renderedItem.element.remove();
        renderedItem.currentIndex = undefined;
      });

      this.renderedItems = new Set(items);

      return items;
    });

    // Start hooks chain
    for (const [key, { previous }] of getObjectEntries(this.hooks)) {
      const items = previous ? this.hooks[previous].result : this.items;

      items.listen(() => this.triggerHook(key));
    }
  }

  /**
   * Initializes the elements side effects.
   */
  #initElements() {
    const { items, itemsPerPage, currentPage, hooks } = this;

    // items-count
    items.subscribe((items) => {
      const { itemsCountElement } = this;

      if (itemsCountElement) {
        itemsCountElement.textContent = `${items.length}`;
      }
    });

    /**
     * visible-count
     * visible-count-from
     * visible-count-to
     * results-count
     */
    subscribeMultiple(
      [itemsPerPage, currentPage, hooks.filter.result],
      ([$itemsPerPage, $currentPage, $filteredItems = []]) => {
        const { visibleCountElement, visibleCountFromElement, visibleCountToElement, resultsCountElement } = this;

        if (visibleCountElement) {
          const visibleCountTotal = Math.min($itemsPerPage, $filteredItems.length);

          visibleCountElement.textContent = `${visibleCountTotal}`;
        }

        if (visibleCountFromElement) {
          const visibleCountFrom = Math.min(($currentPage - 1) * $itemsPerPage + 1, $filteredItems.length);

          visibleCountFromElement.textContent = `${visibleCountFrom}`;
        }

        if (visibleCountToElement) {
          const visibleCountTo = Math.min($currentPage * $itemsPerPage, $filteredItems.length);

          visibleCountToElement.textContent = `${visibleCountTo}`;
        }

        if (resultsCountElement) {
          resultsCountElement.textContent = `${$filteredItems.length}`;
        }
      }
    );
  }

  /**
   * Adds a hook.
   * @param key
   * @param callback
   */
  addHook(key: HookKey, callback: HookCallback) {
    const hook = this.hooks[key];

    hook.callbacks.push(callback);
  }

  /**
   * Triggers a hook.
   * @param key
   */
  async triggerHook(key: HookKey) {
    const hook = this.hooks[key];

    const { previous } = hook;

    const previousHookResult = previous ? this.hooks[previous].result : undefined;

    let result = previousHookResult?.get() || this.items.get();

    for (const callback of hook.callbacks) {
      result = (await callback(result)) || result;
    }

    hook.result.set(result);
  }

  /**
   * Stores new Collection Items in the instance.
   *
   * @param itemElements The new `Collection Item` elements to store.
   * @param method Defines the storing method:
   *
   * - `unshift`: New items are added to the beginning of the store.
   * - `push`: New items are added to the end of the store.
   *
   *  Defaults to `push`.
   */
  addItems(itemElements: CollectionItemElement[], method: 'unshift' | 'push' = 'push') {
    const { items, listElement } = this;

    if (!listElement) return;

    const newItems = itemElements.map((item) => new ListItem(item, listElement));

    if (method === 'push') {
      items.set([...items.get(), ...newItems]);
    } else {
      items.set([...newItems, ...items.get()]);
    }
  }

  /**
   * Adds a missing `PaginationButtonElement` to the list.
   * @param element A {@link PaginationButtonElement}.
   * @param elementKey The button element key.
   * @param childIndex The button element key.
   */
  addPaginationButton(
    element: PaginationButtonElement,
    elementKey: 'paginationNextElement' | 'paginationPreviousElement',
    childIndex: number
  ) {
    const { paginationWrapperElement } = this;

    if (!paginationWrapperElement || this[elementKey].get() || childIndex < 0) return;

    paginationWrapperElement.insertBefore(element, paginationWrapperElement.children[childIndex]);

    this[elementKey].set(element);
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    // TODO: Call store.off() on all stores

    listInstancesStore.delete(this.wrapperElement);
  }

  /**
   * @returns The list element or wrapper element, whichever exists.
   */
  get listOrWrapper() {
    return this.listElement || this.wrapperElement;
  }
}
