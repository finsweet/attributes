import {
  CMS_CSS_CLASSES,
  type CollectionItemElement,
  type CollectionListElement,
  type CollectionListWrapperElement,
  fetchPageDocument,
  getObjectEntries,
  isNumber,
  type PageCountElement,
  type PaginationButtonElement,
  type PaginationWrapperElement,
  parseNumericAttribute,
  restartWebflow,
  type WebflowModule,
} from '@finsweet/attributes-utils';
import { animations } from '@finsweet/attributes-utils';
import { atom, deepMap, map, type WritableAtom } from 'nanostores';

import type { Filters } from '../filter/types';
import { getAllCollectionListWrappers, getCollectionElements } from '../utils/dom';
import { getPaginationSearchEntries } from '../utils/pagination';
import { subscribeMultiple } from '../utils/reactivity';
import { getAttribute, getInstance, hasAttributeValue, queryElement } from '../utils/selectors';
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
  public readonly hooks: Hooks = {
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
  public readonly items = map<ListItem[]>([]);

  /**
   * A set holding all rendered {@link ListItem} instances.
   */
  public renderedItems: Set<ListItem> = new Set();

  /**
   * The instance.
   */
  public readonly instance: string | null;

  /**
   * The `Collection List` element.
   */
  public readonly listElement?: CollectionListElement | null;

  /**
   * The `Pagination` wrapper element.
   */
  public readonly paginationWrapperElement?: PaginationWrapperElement | null;

  /**
   * The `Page Count` element.
   */
  public readonly paginationCountElement?: PageCountElement | null;

  /**
   * The `Previous` button.
   */
  public readonly paginationPreviousElement: WritableAtom<PaginationButtonElement | null>;

  /**
   * The `Next` button.
   */
  public readonly paginationNextElement: WritableAtom<PaginationButtonElement | null>;

  /**
   * The `Empty State` element.
   */
  public readonly emptyElement: WritableAtom<HTMLElement | null>;

  /**
   * A custom loader element.
   */
  public readonly loaderElement?: HTMLElement | null;

  /**
   * An element that displays the total amount of items in the list.
   */
  public readonly itemsCountElement?: HTMLElement | null;

  /**
   * An element that displays the total amount of items in the list after filtering.
   */
  public readonly resultsCountElement?: HTMLElement | null;

  /**
   * An element that displays the amount of visible items.
   */
  public readonly visibleCountElement?: HTMLElement | null;

  /**
   * An element that displays the lower range of visible items.
   */
  public readonly visibleCountFromElement?: HTMLElement | null;

  /**
   * An element that displays the upper range of visible items.
   */
  public readonly visibleCountToElement?: HTMLElement | null;

  /**
   * Defines the amount of items per page.
   */
  public readonly itemsPerPage: WritableAtom<number>;

  /**
   * Defines the total amount of pages in the list.
   */
  public readonly totalPages = atom(1);

  /**
   * Defines the current page in `Pagination` mode.
   */
  public readonly currentPage = atom(1);

  /**
   * Defines the active filters.
   */
  public readonly filters = deepMap<Filters>({ groups: [{ conditions: [] }] });

  /**
   * Defines if the pagination query param should be added to the URL when switching pages.
   * @example '?5f7457b3_page=1'
   */
  public readonly showPagesQuery = atom(false);

  /**
   * Defines the Webflow modules to restart after rendering.
   */
  public readonly webflowModules = new Set<WebflowModule>();

  /**
   * Defines if loaded Items can be cached using IndexedDB after fetching them.
   */
  public readonly cache: boolean;

  /**
   * Defines the query key for the paginated pages.
   * @example '5f7457b3_page'
   */
  public pagesQuery?: string;

  /**
   * Defines an awaitable Promise that resolves once the pagination data (`currentPage` + `pagesQuery`) has been retrieved.
   */
  public loadingPaginationQuery?: Promise<void>;

  /**
   * Defines an awaitable Promise that resolves once the pagination elements have been loaded.
   */
  public loadingPaginationElements?: Promise<void>;

  constructor(public readonly wrapperElement: CollectionListWrapperElement, public readonly pageIndex: number) {
    // Collect elements
    const listElement = getCollectionElements(wrapperElement, 'list');
    this.listElement = listElement;

    const instance = getInstance(listElement || wrapperElement);
    this.instance = instance;

    this.paginationWrapperElement = getCollectionElements(wrapperElement, 'pagination-wrapper');
    this.paginationCountElement = getCollectionElements(wrapperElement, 'page-count');
    this.paginationNextElement = atom(getCollectionElements(wrapperElement, 'pagination-next'));
    this.paginationPreviousElement = atom(getCollectionElements(wrapperElement, 'pagination-previous'));
    this.emptyElement = atom(getCollectionElements(wrapperElement, 'empty') || queryElement('empty', { instance }));
    this.loaderElement = queryElement('loader', { instance });
    this.itemsCountElement = queryElement('items-count', { instance });
    this.visibleCountElement = queryElement('visible-count', { instance });
    this.visibleCountFromElement = queryElement('visible-count-from', { instance });
    this.visibleCountToElement = queryElement('visible-count-to', { instance });
    this.resultsCountElement = queryElement('results-count', { instance });
    this.cache = hasAttributeValue(this.listOrWrapper, 'cache', 'true');

    // Collect items
    const collectionItemElements = getCollectionElements(wrapperElement, 'item');

    this.itemsPerPage = atom(collectionItemElements.length);

    if (listElement) {
      const items = collectionItemElements.map((element) => new ListItem(element, listElement));

      this.items.set(items);
      this.renderedItems = new Set(items);
    }

    // Extract pagination data
    this.loadingPaginationQuery = this.#getPaginationQuery();
    this.loadingPaginationElements = this.#getPaginationElements();

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

    // Restart Webflow modules
    this.addHook('afterRender', async () => {
      restartWebflow([...this.webflowModules]);
    });

    // Start hooks chain
    for (const [key, { previous }] of getObjectEntries(this.hooks)) {
      const items = previous ? this.hooks[previous].result : this.items;

      items.subscribe(() => this.triggerHook(key));
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
   * Collects the pagination query info.
   * @returns A Promise that resolves once the pagination query info has been collected.
   */
  async #getPaginationQuery() {
    const { paginationNextElement, paginationPreviousElement } = this;

    const paginationNext = paginationNextElement.get();
    const paginationPrevious = paginationPreviousElement.get();
    const paginationButton = paginationNext || paginationPrevious;
    if (!paginationButton) return;

    const searchEntries = getPaginationSearchEntries(paginationButton);
    if (!searchEntries.length) return;

    let pagesQuery: string | undefined;
    let rawTargetPage: string | undefined;

    if (searchEntries.length === 1) {
      const [pageEntry] = searchEntries;

      if (!pageEntry) return;

      [pagesQuery, rawTargetPage] = pageEntry;
    }

    // If there's more than one `searchParam` we need to fetch the original page to find the correspondent pageQuery.
    else {
      const { origin, pathname } = location;

      const initialPage = await fetchPageDocument(origin + pathname);
      if (!initialPage) return;

      const initialCollectionListWrappers = initialPage.querySelectorAll(`.${CMS_CSS_CLASSES.wrapper}`);

      const initialCollectionListWrapper = initialCollectionListWrappers[this.pageIndex];
      if (!initialCollectionListWrapper) return;

      const initialPaginationNext = getCollectionElements(initialCollectionListWrapper, 'pagination-next');
      if (!initialPaginationNext) return;

      const [initialPageEntry] = getPaginationSearchEntries(initialPaginationNext) || [];
      if (!initialPageEntry) return;

      [pagesQuery] = initialPageEntry;

      [, rawTargetPage] = searchEntries.find(([query]) => query === pagesQuery) || [];
    }

    if (!pagesQuery || !rawTargetPage) return;

    const targetPage = parseInt(rawTargetPage);
    const currentPage = paginationNext ? targetPage - 1 : targetPage + 1;

    this.pagesQuery = pagesQuery;
    this.currentPage.set(currentPage);
  }

  /**
   * Collects the missing pagination elements.
   * @returns A Promise that resolves once the missing pagination elements have been collected.
   */
  async #getPaginationElements() {
    await this.loadingPaginationQuery;

    const { origin, pathname } = window.location;
    const {
      wrapperElement,
      listElement,
      paginationWrapperElement,
      paginationNextElement,
      paginationPreviousElement,
      emptyElement,
      currentPage,
      pagesQuery,
      pageIndex,
    } = this;

    await Promise.all([
      // Pagination next
      (async () => {
        if (paginationNextElement.get()) return;

        const $currentPage = currentPage.get();
        if (!$currentPage || $currentPage === 1) return;

        const page = await fetchPageDocument(`${origin}${pathname}?${pagesQuery}=${$currentPage - 1}`);
        if (!page) return;

        const allCollectionWrappers = getAllCollectionListWrappers(page);
        const collectionListWrapper = allCollectionWrappers[pageIndex];
        if (!collectionListWrapper) return;

        const paginationNext = getCollectionElements(collectionListWrapper, 'pagination-next');
        if (!paginationNext) return;

        const anchor = paginationPreviousElement.get()?.parentElement || paginationWrapperElement;
        if (!anchor) return;

        paginationNext.style.display = 'none';

        anchor.append(paginationNext);
        paginationNextElement.set(paginationNext);
      })(),

      // Pagination previous & Empty state
      (async () => {
        if (paginationPreviousElement.get() && emptyElement.get()) return;

        const page = await fetchPageDocument(`${origin}${pathname}?${pagesQuery}=9999`);
        if (!page) return;

        const allCollectionWrappers = getAllCollectionListWrappers(page);
        const collectionListWrapper = allCollectionWrappers[pageIndex];
        if (!collectionListWrapper) return;

        const paginationPrevious = getCollectionElements(collectionListWrapper, 'pagination-previous');
        const empty = getCollectionElements(collectionListWrapper, 'empty');

        // Pagination previous
        if (paginationPrevious && !paginationPreviousElement.get()) {
          const anchor = paginationNextElement.get()?.parentElement || paginationWrapperElement;
          if (!anchor) return;

          paginationPrevious.style.display = 'none';

          anchor.prepend(paginationPrevious);
          paginationPreviousElement.set(paginationPrevious);
        }

        // Empty state
        if (empty && !emptyElement.get()) {
          empty.style.display = 'none';

          wrapperElement.insertBefore(empty, listElement?.nextSibling || null);
          emptyElement.set(empty);
        }
      })(),
    ]);
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
