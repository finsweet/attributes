import {
  CMS_CSS_CLASSES,
  fetchPage,
  isHTMLAnchorElement,
  isNumber,
  restartWebflow,
  type WebflowModule,
} from '@finsweet/attributes-utils';
import { computed, effect, type Ref, ref, type ShallowRef, shallowRef, watch } from '@vue/reactivity';

import type { AllFieldsData, Filters } from '../filter/types';
import type { Sorting } from '../sort/types';
import { RENDER_INDEX_CSS_VARIABLE } from '../utils/constants';
import { getAllCollectionListWrappers, getCMSElementSelector, getCollectionElements } from '../utils/dom';
import { getPaginationSearchEntries } from '../utils/pagination';
import { getAttribute, getInstance, hasAttributeValue, queryAllElements, queryElement } from '../utils/selectors';
import { listInstancesStore } from '../utils/store';
import { ListItem } from './ListItem';

type HookKey = 'start' | 'filter' | 'sort' | 'static' | 'pagination' | 'beforeRender' | 'render' | 'afterRender';
type HookCallback = (items: ListItem[]) => ListItem[] | Promise<ListItem[]> | void | Promise<void>;
type Hooks = {
  [key in HookKey]: {
    previous?: HookKey;
    index: number;
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
    start: {
      index: 0,
      callbacks: [],
      result: shallowRef([]),
    },

    filter: {
      index: 1,
      previous: 'start',
      callbacks: [],
      result: shallowRef([]),
    },

    sort: {
      index: 2,
      previous: 'filter',
      callbacks: [],
      result: shallowRef([]),
    },

    static: {
      index: 3,
      previous: 'sort',
      callbacks: [],
      result: shallowRef([]),
    },

    pagination: {
      index: 4,
      previous: 'static',
      callbacks: [],
      result: shallowRef([]),
    },

    beforeRender: {
      index: 5,
      previous: 'pagination',
      callbacks: [],
      result: shallowRef([]),
    },

    render: {
      index: 6,
      previous: 'beforeRender',
      callbacks: [],
      result: shallowRef([]),
    },

    afterRender: {
      index: 7,
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
   * A queued hook that will be executed after the current lifecycle.
   */
  public queuedHook?: HookKey;

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
  public readonly listElement: HTMLElement | null;

  /**
   * The `Pagination` wrapper element.
   */
  public readonly paginationWrapperElement?: HTMLElement | null;

  /**
   * The `Page Count` element.
   */
  public readonly paginationCountElement?: HTMLElement | null;

  /**
   * All the `Previous` buttons defined by the user or native Webflow CMS.
   * TODO: the way we're assigning to this shallowRef property may not trigger reactivity
   */
  public readonly allPaginationPreviousElements = shallowRef<Set<HTMLElement>>(new Set());

  /**
   * The native Webflow CMS `Previous` button.
   */
  public readonly paginationPreviousCMSElement = computed(() =>
    [...this.allPaginationPreviousElements.value]
      .filter(isHTMLAnchorElement)
      .find((paginationPreviousElement) =>
        paginationPreviousElement.classList.contains(CMS_CSS_CLASSES['paginationPrevious'])
      )
  );

  /**
   * The `Next` buttons defined by the user or native Webflow CMS.
   * TODO: the way we're assigning to this shallowRef property may not trigger reactivity
   */
  public readonly allPaginationNextElements = shallowRef<Set<HTMLElement>>(new Set());

  /**
   * The native Webflow CMS `Next` button.
   */
  public readonly paginationNextCMSElement = computed(() =>
    [...this.allPaginationNextElements.value]
      .filter(isHTMLAnchorElement)
      .find((paginationNextElement) => paginationNextElement.classList.contains(CMS_CSS_CLASSES['paginationNext']))
  );

  /**
   * The `Empty State` element.
   */
  public readonly emptyElement = ref<HTMLElement | null | undefined>();

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
   * Defines a custom amount of items per page.
   */
  public customItemsPerPage?: number;

  /**
   * Defines the amount of items per page.
   */
  public readonly itemsPerPage: Ref<number>;

  /**
   * Defines the total amount of pages in the list.
   */
  public readonly totalPages = computed(() =>
    Math.ceil(this.hooks.static.result.value.length / this.itemsPerPage.value)
  );

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
   * Defines if the list is currently loading items.
   */
  public readonly loading = ref(false);

  /**
   * Defines if the user has interacted with the filters.
   */
  public readonly hasInteracted = computed(
    () =>
      this.sorting.value.interacted ||
      this.filters.value.groups.some((group) => group.conditions.some((condition) => condition.interacted))
  );

  /**
   * Defines if the list has any filters applied.
   */
  public readonly hasFilters = computed(() =>
    this.filters.value.groups.some((group) => group.conditions.some((condition) => !!condition.value?.length))
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
  public searchParamsPrefix?: string;

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

  /**
   * A function to destroy the instance and clean up all resources.
   */
  public destroy = () => {};

  /**
   * `@vue/reactivity`: [watch](https://vuejs.org/api/reactivity-core.html#watch)
   */
  public watch = watch;

  /**
   * `@vue/reactivity`: [watch](https://vuejs.org/api/reactivity-core.html#watcheffect)
   */
  public effect = effect;

  constructor(
    /**
     * The `Collection List Wrapper` element.
     */
    public readonly wrapperElement: HTMLElement,

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
      getCollectionElements(wrapperElement, 'empty') || queryElement<HTMLElement>('empty', { instance });
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
    this.cache = hasAttributeValue(this.listOrWrapper, 'cache', 'true');
    this.showQuery = hasAttributeValue(this.listOrWrapper, 'showquery', 'true');
    this.highlight = hasAttributeValue(this.listOrWrapper, 'highlight', 'true');

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

    this.customItemsPerPage = getAttribute(this.listOrWrapper, 'itemsperpage');
    this.initialItemsPerPage = this.customItemsPerPage || collectionItemElements.length;
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
      this.searchParamsPrefix = paginationSearchParam?.split('_')[0];
    });

    this.loadingPaginationElements = this.#getCMSPaginationElements();

    // Init hooks and element effects
    const elementsCleanup = this.#initElements();
    const hooksCleanup = this.#initHooks();

    // Define the destroy function
    this.destroy = () => {
      hooksCleanup();
      elementsCleanup();

      listInstancesStore.delete(this.wrapperElement);
    };
  }

  /**
   * Initializes the lifecycle hooks.
   */
  #initHooks() {
    const cleanups: (() => void)[] = [];

    // Add render hook
    this.addHook('render', async (items) => {
      let renderIndex = 0;

      const renderPromise = Promise.all(
        items.map((item, index) => {
          const previousItem = items[index - 1];

          const render = async () => {
            item.element.style.setProperty(RENDER_INDEX_CSS_VARIABLE, `${renderIndex}`);
            item.element.classList.add(item.startingClass);

            if (item.stagger) {
              item.element.style.transitionDelay = `${renderIndex * item.stagger}ms`;
            }

            if (previousItem) {
              previousItem.element.after(item.element);
            } else {
              this.listElement?.prepend(item.element);
            }

            item.currentIndex = index;
            renderIndex += 1;

            await new Promise(requestAnimationFrame);

            item.element.classList.remove(item.startingClass);

            const animations = item.element.getAnimations({ subtree: true });

            try {
              await Promise.all(animations.map((a) => a.finished));
            } catch {
              //
            }

            item.element.style.removeProperty(RENDER_INDEX_CSS_VARIABLE);

            if (item.stagger) {
              item.element.style.transitionDelay = '';
            }
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
    const initHook = (key: HookKey) => {
      const { previous } = this.hooks[key];

      if (!previous) {
        const cleanup = watch(this.items, () => this.triggerHook(key), { immediate: true });

        cleanups.push(cleanup);
        return;
      }

      const cleanup = watch(this.hooks[previous].result, async () => {
        await this.#runHook(key);

        if (key !== 'afterRender') return;

        this.currentHook = undefined;
        this.triggeredHook = undefined;

        if (this.queuedHook) {
          const { queuedHook } = this;

          this.queuedHook = undefined;
          this.triggerHook(queuedHook);
        }
      });

      cleanups.push(cleanup);

      initHook(previous);
    };

    initHook('afterRender');

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      cleanups.length = 0;
    };
  }

  /**
   * Initializes the elements side effects.
   */
  #initElements() {
    // items-count
    const itemsCountRunner = effect(() => {
      if (!this.itemsCountElement) return;

      this.itemsCountElement.textContent = `${this.items.value.length}`;
    });

    // initial
    const initialElementRunner = effect(() => {
      if (!this.initialElement) return;

      const showInitial = !this.hasInteracted.value || !this.hasFilters.value;

      this.wrapperElement.style.display = showInitial ? 'none' : '';
      this.initialElement.style.display = showInitial ? '' : 'none';
    });

    // loader
    const loaderElementRunner = effect(() => {
      if (!this.loaderElement) return;

      this.loaderElement.style.display = this.loading.value ? '' : 'none';
    });

    // empty
    const emptyElementCleanup = watch(
      [this.hooks.render.result, this.emptyElement],
      ([items, emptyElement]: [ListItem[], HTMLElement | null | undefined]) => {
        const hasItems = items.length > 0;

        if (this.listElement) {
          this.listElement.style.display = hasItems ? '' : 'none';
        }

        if (emptyElement) {
          emptyElement.style.display = hasItems ? 'none' : '';
        }
      }
    );

    return () => {
      itemsCountRunner.effect.stop();
      initialElementRunner.effect.stop();
      loaderElementRunner.effect.stop();
      emptyElementCleanup();
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

      const initialPage = await fetchPage(origin + pathname);
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

        if (!paginationSearchParam) return;

        const page = await fetchPage(`${origin}${pathname}?${paginationSearchParam}=${$currentPage - 1}`);
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
        if (!paginationSearchParam) return;

        const page = await fetchPage(`${origin}${pathname}?${paginationSearchParam}=9999`);
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

    hook.result.value = [...result];
  }

  /**
   * Triggers a hook.
   * @param key
   * @param options.scrollToAnchor
   */
  triggerHook(
    key: HookKey,
    { scrollToAnchor, resetCurrentPage }: { scrollToAnchor?: boolean; resetCurrentPage?: boolean } = {}
  ) {
    if (this.currentHook) {
      const triggeredHookIndex = this.hooks[key].index;
      const currentHookIndex = this.hooks[this.currentHook].index;

      if (currentHookIndex >= triggeredHookIndex) {
        if (this.queuedHook) {
          const queuedHookIndex = this.hooks[this.queuedHook].index;
          this.queuedHook = triggeredHookIndex < queuedHookIndex ? key : this.queuedHook;
        } else {
          this.queuedHook = key;
        }
      }

      return;
    }

    this.triggeredHook = key;
    this.currentHook = key;

    if (scrollToAnchor) {
      this.scrollToAnchor(key);
    }

    if (resetCurrentPage) {
      this.currentPage.value = 1;
    }

    return this.#runHook(key);
  }

  /**
   * Creates a new {@link ListItem} instance.
   * @param itemElement The Collection Item element.
   * @returns The created {@link ListItem} instance.
   */
  createItem = (itemElement: HTMLElement) => new ListItem(itemElement, this);

  /**
   * Scrolls to the specified anchor based on the action provided.
   * @param key
   */
  scrollToAnchor(key?: HookKey) {
    const { scrollAnchorFilterElement, scrollAnchorSortElement, scrollAnchorPaginationElement, scrollAnchorElement } =
      this;

    const anchor =
      (key === 'filter'
        ? scrollAnchorFilterElement
        : key === 'sort'
          ? scrollAnchorSortElement
          : key === 'pagination'
            ? scrollAnchorPaginationElement
            : scrollAnchorElement) || scrollAnchorElement;

    if (!anchor) return;

    anchor.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Gets a search param from the URL using the list's search params prefix.
   * @param key
   * @param usePrefix Whether to use the list's search params prefix or not.
   * @returns The value of the search param or null if not found.
   */
  async getSearchParam(key: string, usePrefix = true) {
    await this.loadingSearchParamsData;

    const { searchParams } = new URL(location.href);

    if (!usePrefix) {
      return searchParams.get(key);
    }

    const prefixes = [this.instance, this.searchParamsPrefix, this.pageIndex.toString()];

    for (const prefix of prefixes) {
      if (!prefix) continue;

      const name = `${prefix}_${key}`;
      const value = searchParams.get(name);
      if (value) return value;
    }

    return null;
  }

  /**
   * @returns All search params from the URL using the list's search params prefix (if true).
   * @param usePrefix Whether to use the list's search params prefix or not.
   */
  async getAllSearchParams(usePrefix = true) {
    await this.loadingSearchParamsData;

    const { searchParams } = new URL(location.href);

    if (!usePrefix) {
      return [...searchParams.entries()];
    }

    const map = new Map<string, string>();
    const prefixes = [this.instance, this.searchParamsPrefix, this.pageIndex.toString()];

    for (const [key, value] of searchParams) {
      for (const prefix of prefixes) {
        if (!prefix) continue;
        if (!key.startsWith(`${prefix}_`)) continue;

        const unprefixedKey = key.replace(`${prefix}_`, '');
        map.set(unprefixedKey, value);
        break;
      }
    }

    return [...map.entries()];
  }

  /**
   * Sets a search param in the URL using the list's search params prefix.
   * @param key
   * @param value
   * @param options.usePrefix Whether to use a prefix to set the key.
   * @param options.useSearchParamsPrefix Whether to force the use of the search params as prefix over the instance name.
   */
  async setSearchParam(
    key: string,
    value: string | null | undefined,
    { usePrefix = true, useSearchParamsPrefix = false }: { usePrefix?: boolean; useSearchParamsPrefix?: boolean } = {}
  ) {
    await this.loadingSearchParamsData;

    const url = new URL(location.href);

    let name = key;

    if (useSearchParamsPrefix) {
      name = `${this.searchParamsPrefix}_${key}`;
    } else if (usePrefix) {
      const prefix = this.instance || this.searchParamsPrefix || this.pageIndex.toString();
      name = `${prefix}_${key}`;
    }

    if (value) {
      url.searchParams.set(name, value);
    } else {
      url.searchParams.delete(name);
    }

    history.replaceState({}, '', url.toString());
  }

  /**
   * @returns The list element or wrapper element, whichever exists.
   */
  get listOrWrapper() {
    return this.listElement || this.wrapperElement;
  }
}
