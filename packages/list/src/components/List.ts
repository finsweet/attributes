import {
  CMS_CSS_CLASSES,
  type CollectionEmptyElement,
  type CollectionItemElement,
  type CollectionListElement,
  type CollectionListWrapperElement,
  fetchPageDocument,
  getObjectEntries,
  isNumber,
  type PageCountElement,
  type PaginationButtonElement,
  type PaginationWrapperElement,
  restartWebflow,
  type WebflowModule,
} from '@finsweet/attributes-utils';
import { computed, effect, type Ref, ref, type ShallowRef, shallowRef, watch } from '@vue/reactivity';

import type { AllFieldsData, Filters } from '../filter/types';
import type { Sorting } from '../sort/types';
import { RENDER_INDEX_CSS_VARIABLE } from '../utils/constants';
import { getAllCollectionListWrappers, getCMSElementSelector, getCollectionElements } from '../utils/dom';
import { getPaginationSearchEntries } from '../utils/pagination';
import { getAttribute, getInstance, queryAllElements, queryElement } from '../utils/selectors';
import { listInstancesStore } from '../utils/store';
import { ListItem } from './ListItem';

type HookKey = 'filter' | 'sort' | 'pagination' | 'beforeRender' | 'render' | 'afterRender';
type HookCallback = (items: ListItem[]) => ListItem[] | Promise<ListItem[]> | void | Promise<void>;
type Hooks = {
  [key in HookKey]: {
    previous?: HookKey;
    callbacks: HookCallback[];
    result: ShallowRef<ListItem[]>;
  };
};

export class List {
  /**
   * A signal holding all {@link ListItem} instances of the list.
   */
  public readonly items = shallowRef<ListItem[]>([]);

  /**
   * Contains all lifecycle hooks with their callbacks and last result.
   */
  public readonly hooks: Hooks = {
    filter: {
      callbacks: [],
      result: shallowRef([]),
    },

    sort: {
      previous: 'filter',
      callbacks: [],
      result: shallowRef([]),
    },

    pagination: {
      previous: 'sort',
      callbacks: [],
      result: shallowRef([]),
    },

    beforeRender: {
      previous: 'pagination',
      callbacks: [],
      result: shallowRef([]),
    },

    render: {
      previous: 'beforeRender',
      callbacks: [],
      result: shallowRef([]),
    },

    afterRender: {
      previous: 'render',
      callbacks: [],
      result: shallowRef([]),
    },
  };

  /**
   * The current hook being executed.
   */
  public currentHook?: HookKey;

  /**
   * The hook that triggered the current lifecycle.
   */
  public triggeredHook?: HookKey;

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
  public readonly listElement: CollectionListElement | null;

  /**
   * The `Pagination` wrapper element.
   */
  public readonly paginationWrapperElement?: PaginationWrapperElement | null;

  /**
   * The `Page Count` element.
   */
  public readonly paginationCountElement?: PageCountElement | null;

  /**
   * All the `Previous` buttons defined by the user or native Webflow CMS.
   * TODO: the way we're assigning to this shallowRef property may not trigger reactivity
   */
  public readonly allPaginationPreviousElements = shallowRef<Set<PaginationButtonElement>>(new Set());

  /**
   * The native Webflow CMS `Previous` button.
   */
  public readonly paginationPreviousCMSElement = computed(() =>
    [...this.allPaginationPreviousElements.value].find((paginationPreviousElement: PaginationButtonElement) =>
      paginationPreviousElement.classList.contains(CMS_CSS_CLASSES['paginationPrevious'])
    )
  );

  /**
   * The `Next` buttons defined by the user or native Webflow CMS.
   * TODO: the way we're assigning to this shallowRef property may not trigger reactivity
   */
  public readonly allPaginationNextElements = shallowRef<Set<PaginationButtonElement>>(new Set());

  /**
   * The native Webflow CMS `Next` button.
   */
  public readonly paginationNextCMSElement = computed(() =>
    [...this.allPaginationNextElements.value].find((paginationNextElement: PaginationButtonElement) =>
      paginationNextElement.classList.contains(CMS_CSS_CLASSES['paginationNext'])
    )
  );

  /**
   * The `Empty State` element.
   */
  public readonly emptyElement = ref<CollectionEmptyElement | null | undefined>();

  /**
   * An initial element to display when there are no filters applied.
   */
  public readonly initialElement?: HTMLElement | null;

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
   * The scroll anchor element.
   */
  public readonly scrollAnchorElement?: HTMLElement | null;

  /**
   * A custom scroll anchor element for filter actions.
   */
  public readonly scrollAnchorFilterElement?: HTMLElement | null;

  /**
   * A custom scroll anchor element for sort actions.
   */
  public readonly scrollAnchorSortElement?: HTMLElement | null;

  /**
   * A custom scroll anchor element for pagination actions.
   */
  public readonly scrollAnchorPaginationElement?: HTMLElement | null;

  /**
   * Defines the original amount of items per page.
   */
  public initialItemsPerPage: number;

  /**
   * Defines the amount of items per page.
   */
  public readonly itemsPerPage: Ref<number>;

  /**
   * Defines the total amount of pages in the list.
   */
  public readonly totalPages = computed(() => Math.ceil(this.hooks.sort.result.value.length / this.itemsPerPage.value));

  /**
   * Defines the current page in `Pagination` mode.
   */
  public readonly currentPage = ref(1);

  /**
   * Defines the active filters.
   */
  public readonly filters = ref<Filters>({
    groups: [],
  });

  /**
   * Contains all the fields data of the list.
   */
  public readonly allFieldsData = computed(() =>
    this.items.value.reduce<AllFieldsData>((acc, item) => {
      for (const [key, field] of Object.entries(item.fields)) {
        acc[key] ||= {
          type: field.type,
          valueType: Array.isArray(field.value) ? 'multiple' : 'single',
          rawValues: new Set<string>(),
        };

        const fieldRawValues = Array.isArray(field.rawValue) ? field.rawValue : [field.rawValue];

        for (const rawValue of fieldRawValues) {
          acc[key].rawValues.add(rawValue);
        }
      }

      return acc;
    }, {})
  );

  /**
   * Defines the active sorting.
   */
  public readonly sorting = ref<Sorting>({});

  /**
   * Defines if the user has interacted with the filters.
   */
  public readonly hasInteracted = computed(
    () =>
      this.sorting.value.interacted ||
      this.filters.value.groups.some((group) => group.conditions.some((condition) => condition.interacted))
  );

  /**
   * Defines if the pagination query param should be added to the URL when switching pages.
   * @example '?5f7457b3_page=1'
   */
  public readonly showQuery: boolean;

  /**
   * Defines if the matched fields when filtering should be highlighted.
   */
  public readonly highlight?: boolean;

  /**
   * Defines if loaded Items can be cached using IndexedDB after fetching them.
   */
  public readonly cache: boolean;

  /**
   * Defines the Webflow modules to restart after rendering.
   */
  public readonly webflowModules = new Set<WebflowModule>();

  /**
   * Defines the URL query key for the paginated pages.
   * @example '5f7457b3_page'
   */
  public paginationSearchParam?: string;

  /**
   * Defines the query prefix for all the list's query params.
   * If pagination query exists, it is used as the prefix: '5f7457b3_page' => '5f7457b3'
   * If not, it falls back to the list's instance or the list's index.
   */
  public searchParamsPrefix!: string;

  /**
   * Defines an awaitable Promise that resolves once the pagination data (`currentPage` + `paginationSearchParam`) has been retrieved.
   */
  public loadingSearchParamsData?: Promise<void>;

  /**
   * Defines an awaitable Promise that resolves once the pagination elements have been loaded.
   */
  public loadingPaginationElements?: Promise<void>;

  /**
   * Defines an awaitable Promise that resolves once all the Webflow CMS paginated items have been loaded.
   */
  public loadingPaginatedItems?: Promise<void>;

  /**
   * Defines if the filter field values are being collected from the DOM or event listeners are being set.
   */
  public readingFilters?: boolean;

  /**
   * Defines if the filter field values are being set to the DOM.
   */
  public settingFilters?: boolean;

  constructor(
    /**
     * The `Collection List Wrapper` element.
     */
    public readonly wrapperElement: CollectionListWrapperElement,

    /**
     * The index of the list in the page.
     */
    public readonly pageIndex: number,

    /**
     * Defines if the instance should be reactive.
     * If set to `false`, the instance will not load any CMS data nor will it trigger any hooks.
     */
    reactive = true
  ) {
    // Collect elements
    const listElement = getCollectionElements(wrapperElement, 'list');
    this.listElement = listElement;

    const instance = getInstance(listElement || wrapperElement);
    this.instance = instance;

    this.paginationWrapperElement = getCollectionElements(wrapperElement, 'pagination-wrapper');
    this.paginationCountElement = getCollectionElements(wrapperElement, 'page-count');

    this.emptyElement.value =
      getCollectionElements(wrapperElement, 'empty') || queryElement<CollectionEmptyElement>('empty', { instance });
    this.initialElement = queryElement('initial', { instance });
    this.loaderElement = queryElement('loader', { instance });
    this.itemsCountElement = queryElement('items-count', { instance });
    this.visibleCountElement = queryElement('visible-count', { instance });
    this.visibleCountFromElement = queryElement('visible-count-from', { instance });
    this.visibleCountToElement = queryElement('visible-count-to', { instance });
    this.resultsCountElement = queryElement('results-count', { instance });
    this.scrollAnchorElement = queryElement('scroll-anchor', { instance });
    this.scrollAnchorFilterElement = queryElement('scroll-anchor-filter', { instance });
    this.scrollAnchorSortElement = queryElement('scroll-anchor-sort', { instance });
    this.scrollAnchorPaginationElement = queryElement('scroll-anchor-pagination', { instance });
    this.cache = getAttribute(this.listOrWrapper, 'cache') === 'true';
    this.showQuery = getAttribute(this.listOrWrapper, 'showquery') === 'true';
    this.highlight = getAttribute(this.listOrWrapper, 'highlight') === 'true';

    // Get pagination next elements
    const paginationNextElement = getCollectionElements(wrapperElement, 'pagination-next');
    if (paginationNextElement) {
      this.allPaginationNextElements.value.add(paginationNextElement);
    }

    queryAllElements<HTMLAnchorElement>('pagination-next', { instance }).forEach((element) =>
      this.allPaginationNextElements.value.add(element)
    );

    // Get pagination previous elements
    const paginationPreviousElement = getCollectionElements(wrapperElement, 'pagination-previous');
    if (paginationPreviousElement) {
      this.allPaginationPreviousElements.value.add(paginationPreviousElement);
    }

    queryAllElements<HTMLAnchorElement>('pagination-previous', { instance }).forEach((element) =>
      this.allPaginationPreviousElements.value.add(element)
    );

    // Collect items
    const collectionItemElements = getCollectionElements(wrapperElement, 'item');

    this.initialItemsPerPage = getAttribute(this.listOrWrapper, 'itemsperpage') || collectionItemElements.length;
    this.itemsPerPage = ref(this.initialItemsPerPage);

    if (listElement) {
      const items = collectionItemElements.map((element, index) => new ListItem(element, this, index));

      this.items.value = items;
      this.renderedItems = new Set(items);
    }

    // Init reactivity
    if (!reactive) return;

    // Extract pagination data
    this.loadingSearchParamsData = this.#getCMSPaginationData().then((paginationSearchParam) => {
      const prefix = paginationSearchParam ? paginationSearchParam.split('_')[0] : undefined;

      this.searchParamsPrefix = prefix || instance || `${pageIndex}`;
    });

    this.loadingPaginationElements = this.#getCMSPaginationElements();

    // Init hooks
    this.#initHooks();

    // Elements side effects
    // TODO: Cleanup
    this.#initElements();
  }

  /**
   * Initializes the lifecycle hooks.
   */
  #initHooks() {
    // Add render hook
    this.addHook('render', async (items) => {
      let startingClass: string;
      let stagger: number | undefined;
      let renderIndex = 0;

      const renderPromise = Promise.all(
        items.map((item, index) => {
          startingClass ||= getAttribute(item.element, 'startingclass');
          stagger ||= getAttribute(item.element, 'stagger');

          const previousItem = items[index - 1];

          const render = async () => {
            item.element.style.setProperty(RENDER_INDEX_CSS_VARIABLE, `${renderIndex}`);
            item.element.classList.add(startingClass);

            if (stagger) {
              item.element.style.transitionDelay = `${renderIndex * stagger}ms`;
            }

            if (previousItem) {
              previousItem.element.after(item.element);
            } else {
              this.listElement?.prepend(item.element);
            }

            item.currentIndex = index;
            renderIndex += 1;

            await new Promise(requestAnimationFrame);

            item.element.classList.remove(startingClass);

            const animations = item.element.getAnimations({ subtree: true });

            return Promise.all(animations.map((a) => a.finished)).then(() => {
              item.element.style.removeProperty(RENDER_INDEX_CSS_VARIABLE);

              if (stagger) {
                item.element.style.transitionDelay = '';
              }
            });
          };

          // Is rendered
          if (isNumber(item.currentIndex)) {
            this.renderedItems.delete(item);

            if (item.currentIndex !== index) {
              return render();
            }
          }

          // Is not rendered
          else {
            return render();
          }
        })
      );

      // Remove items that should not be rendered anymore
      this.renderedItems.forEach((renderedItem) => {
        renderedItem.element.remove();
        renderedItem.currentIndex = undefined;
      });

      this.renderedItems = new Set(items);

      await renderPromise;

      return items;
    });

    // Restart Webflow modules
    this.addHook('afterRender', async () => {
      restartWebflow([...this.webflowModules]);
    });

    // Start hooks chain
    for (const [key, { previous }] of getObjectEntries(this.hooks)) {
      const items = previous ? this.hooks[previous].result : this.items;

      // TODO: Cleanups
      watch(items, () => this.#runHook(key), { immediate: true });
    }
  }

  /**
   * Initializes the elements side effects.
   */
  #initElements() {
    // items-count
    const itemsCountRunner = effect(() => {
      if (this.itemsCountElement) {
        this.itemsCountElement.textContent = `${this.items.value.length}`;
      }
    });

    // initial
    const initialElementRunner = effect(() => {
      if (this.initialElement) {
        this.wrapperElement.style.display = this.hasInteracted.value ? '' : 'none';
        this.initialElement.style.display = this.hasInteracted.value ? 'none' : '';
      }
    });

    return () => {
      itemsCountRunner.effect.stop();
      initialElementRunner.effect.stop();
    };
  }

  /**
   * Collects the pagination query info.
   * @returns A Promise that resolves once the pagination query info has been collected.
   */
  async #getCMSPaginationData() {
    const paginationButton = this.paginationNextCMSElement.value || this.paginationPreviousCMSElement.value;
    if (!paginationButton) return;

    const searchEntries = getPaginationSearchEntries(paginationButton);
    if (!searchEntries.length) return;

    let paginationSearchParam: string | undefined;
    let rawTargetPage: string | undefined;

    if (searchEntries.length === 1) {
      const [pageEntry] = searchEntries;

      if (!pageEntry) return;

      [paginationSearchParam, rawTargetPage] = pageEntry;
    }

    // If there's more than one `searchParam` we need to fetch the original page to find the correspondent pageQuery.
    else {
      const { origin, pathname } = location;

      const initialPage = await fetchPageDocument(origin + pathname);
      if (!initialPage) return;

      const initialCollectionListWrappers = initialPage.querySelectorAll(getCMSElementSelector('wrapper'));

      const initialCollectionListWrapper = initialCollectionListWrappers[this.pageIndex];
      if (!initialCollectionListWrapper) return;

      const initialPaginationNext = getCollectionElements(initialCollectionListWrapper, 'pagination-next');
      if (!initialPaginationNext) return;

      const [initialPageEntry] = getPaginationSearchEntries(initialPaginationNext) || [];
      if (!initialPageEntry) return;

      [paginationSearchParam] = initialPageEntry;

      [, rawTargetPage] = searchEntries.find(([query]) => query === paginationSearchParam) || [];
    }

    if (!paginationSearchParam || !rawTargetPage) return;

    const targetPage = parseInt(rawTargetPage);
    const currentPage = this.paginationNextCMSElement.value ? targetPage - 1 : targetPage + 1;

    this.paginationSearchParam = paginationSearchParam;
    this.currentPage.value = currentPage;

    return paginationSearchParam;
  }

  /**
   * Collects the missing pagination elements.
   * @returns A Promise that resolves once the missing pagination elements have been collected.
   */
  async #getCMSPaginationElements() {
    await this.loadingSearchParamsData;

    const { origin, pathname } = window.location;
    const {
      wrapperElement,
      listElement,
      paginationWrapperElement,
      paginationNextCMSElement,
      paginationPreviousCMSElement,
      emptyElement,
      currentPage,
      paginationSearchParam,
      pageIndex,
    } = this;

    await Promise.all([
      // Pagination next
      (async () => {
        if (paginationNextCMSElement.value) return;

        const $currentPage = currentPage.value;
        if (!$currentPage || $currentPage === 1) return;

        const page = await fetchPageDocument(`${origin}${pathname}?${paginationSearchParam}=${$currentPage - 1}`);
        if (!page) return;

        const allCollectionWrappers = getAllCollectionListWrappers(page);
        const collectionListWrapper = allCollectionWrappers[pageIndex];
        if (!collectionListWrapper) return;

        const paginationNext = getCollectionElements(collectionListWrapper, 'pagination-next');
        if (!paginationNext) return;

        const anchor = paginationPreviousCMSElement.value?.parentElement || paginationWrapperElement;
        if (!anchor) return;

        paginationNext.style.display = 'none';

        anchor.append(paginationNext);
        this.allPaginationNextElements.value.add(paginationNext);
      })(),

      // Pagination previous & Empty state
      (async () => {
        if (paginationPreviousCMSElement.value && emptyElement.value) return;

        const page = await fetchPageDocument(`${origin}${pathname}?${paginationSearchParam}=9999`);
        if (!page) return;

        const allCollectionWrappers = getAllCollectionListWrappers(page);
        const collectionListWrapper = allCollectionWrappers[pageIndex];
        if (!collectionListWrapper) return;

        const paginationPrevious = getCollectionElements(collectionListWrapper, 'pagination-previous');
        const empty = getCollectionElements(collectionListWrapper, 'empty');

        // Pagination previous
        if (paginationPrevious && !paginationPreviousCMSElement.value) {
          const anchor = paginationNextCMSElement.value?.parentElement || paginationWrapperElement;
          if (!anchor) return;

          paginationPrevious.style.display = 'none';

          anchor.prepend(paginationPrevious);
          this.allPaginationPreviousElements.value.add(paginationPrevious);
        }

        // Empty state
        if (empty && !emptyElement.value) {
          empty.style.display = 'none';

          wrapperElement.insertBefore(empty, listElement?.nextSibling || null);
          emptyElement.value = empty;
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

    return () => {
      hook.callbacks = hook.callbacks.filter((cb) => cb !== callback);
    };
  }

  /**
   * Runs a hook.
   * @param key
   * @param scrollToAnchor
   */
  async #runHook(key: HookKey) {
    this.currentHook = key;

    const hook = this.hooks[key];

    const { previous } = hook;

    const previousHookResult = previous ? this.hooks[previous].result : undefined;

    let result = previousHookResult?.value || this.items.value;

    for (const callback of hook.callbacks) {
      result = (await callback(result)) || result;
    }

    hook.result.value = result;

    this.currentHook = undefined;
  }

  /**
   * Triggers a hook.
   * @param key
   * @param options.scrollToAnchor
   */
  async triggerHook(key: HookKey, { scrollToAnchor }: { scrollToAnchor?: boolean } = {}) {
    this.triggeredHook = key;

    if (scrollToAnchor) {
      this.scrollToAnchor(key);
    }

    await this.#runHook(key);

    this.triggeredHook = undefined;
  }

  /**
   * Creates a new {@link ListItem} instance.
   * @param itemElement The Collection Item element.
   * @returns The created {@link ListItem} instance.
   */
  createItem = (itemElement: CollectionItemElement) => new ListItem(itemElement, this);

  /**
   * Scrolls to the specified anchor based on the action provided.
   * @param action
   */
  scrollToAnchor(action?: HookKey) {
    const { scrollAnchorFilterElement, scrollAnchorSortElement, scrollAnchorPaginationElement, scrollAnchorElement } =
      this;

    const anchor =
      (action === 'filter'
        ? scrollAnchorFilterElement
        : action === 'sort'
          ? scrollAnchorSortElement
          : action === 'pagination'
            ? scrollAnchorPaginationElement
            : scrollAnchorElement) || scrollAnchorElement;

    if (!anchor) return;

    anchor.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Gets a search param from the URL using the list's search params prefix.
   * @param key
   * @returns The value of the search param or null if not found.
   */
  async getSearchParam(key: string) {
    await this.loadingSearchParamsData;

    const { searchParams } = new URL(location.href);

    return searchParams.get(`${this.searchParamsPrefix}_${key}`);
  }

  /**
   * Sets a search param in the URL using the list's search params prefix.
   * @param key
   * @param value
   */
  async setSearchParam(key: string, value?: string | null) {
    await this.loadingSearchParamsData;

    const url = new URL(location.href);
    const name = `${this.searchParamsPrefix}_${key}`;

    if (value) {
      url.searchParams.set(name, value);
    } else {
      url.searchParams.delete(name);
    }

    history.replaceState({}, '', url.toString());
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
