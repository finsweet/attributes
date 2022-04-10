import { getCollectionElements } from '@finsweet/ts-utils';
import type {
  CollectionListWrapperElement,
  CollectionListElement,
  CollectionItemElement,
  PaginationButtonElement,
  PaginationWrapperElement,
  PageCountElement,
} from '@finsweet/ts-utils';
import Emittery from 'emittery';
import type { Animation } from 'packages/animation/src/types';

import { getInstanceIndex } from '$global/helpers/instances';

import { CMSItem } from './CMSItem';
import { updateItemsCount } from './items';
import { storePaginationData, setPaginationQueryParams } from './pagination';
import { renderListItems } from './render';
import type { CMSListEvents } from './types';

/**
 * Instance of a Collection List.
 */
export class CMSList extends Emittery<CMSListEvents> {
  /**
   * The `Collection List` element.
   */
  public readonly list?: CollectionListElement | null;

  /**
   * The `Pagination` wrapper element.
   */
  public readonly paginationWrapper?: PaginationWrapperElement | null;

  /**
   * The `Page Count` element.
   */
  public readonly paginationCount?: PageCountElement | null;

  /**
   * The `Previous` button.
   */
  public paginationPrevious?: PaginationButtonElement | null;

  /**
   * The `Next` button.
   */
  public paginationNext?: PaginationButtonElement | null;

  /**
   * An element used as scroll anchor.
   */
  public scrollAnchor?: HTMLElement;

  /**
   * An element that displays the total amount of items in the list.
   */
  public itemsCount?: HTMLElement;

  /**
   * An element that displays the amount of visible items.
   */
  public visibleCount?: HTMLElement;

  /**
   * A custom `Initial State` element.
   */
  public initialElement?: HTMLElement | null;

  /**
   * A custom `Empty State` element.
   */
  public emptyElement?: HTMLElement | null;

  /**
   * Defines if the `Empty State` is currently active (no valid elements to show).
   */
  public emptyState = false;

  /**
   * A custom loader element.
   */
  public loader?: HTMLElement;

  /**
   * Defines the total amount of pages in the list.
   */
  public totalPages: number;

  /**
   * Defines if rendered items should be paginated.
   */
  public paginationActive = false;

  /**
   * Defines the current page in `Pagination` mode.
   */
  public currentPage?: number;

  /**
   * Defines the query key for the paginated pages.
   * @example '5f7457b3_page'
   */
  public pagesQuery?: string;

  /**
   * Defines an awaitable Promise that resolves once the pagination data (`currentPage` + `pagesQuery`) has been extracted.
   */
  public extractingPaginationData?: Promise<void>;

  /**
   * Defines if the pagination query param should be added to the URL when switching pages.
   * @example '?5f7457b3_page=1'
   */
  public showPaginationQuery = false;

  /**
   * An array holding all {@link CMSItem} instances of the list.
   */
  public items: CMSItem[];

  /**
   * An array holding all unsorted {@link CMSItem} instances of the list.
   */
  public originalItemsOrder: CMSItem[];

  /**
   * Defines the amount of items per page.
   */
  public itemsPerPage: number;

  /**
   * Defines the original amount of items per page.
   */
  public originalItemsPerPage: number;

  /**
   * An array holding all valid {@link CMSItem} instances of the list.
   * Items are set to valid/invalid by `cmsfilter` when performing any filter query.
   */
  public validItems: CMSItem[];

  /**
   * A {@link Animation} object to animate the list.
   */
  public listAnimation?: Animation;

  /**
   * A {@link Animation} object to animate the items.
   */
  public itemsAnimation?: Animation;

  /**
   * Defines if the entire `window.Webflow` instance must be restarted when rendering items.
   * If set, individual modules ('ix2', 'commerce', 'lightbox') will also be restarted.
   */
  public restartWebflow = false;

  /**
   * Defines if the Webflow `ix2` module must be restarted when rendering items.
   */
  public restartIx = false;

  /**
   * Defines if the Webflow `commerce` module must be restarted when rendering items.
   */
  public restartCommerce = false;

  /**
   * Defines if the Webflow `lightbox` module must be restarted when rendering items.
   */
  public restartLightbox = false;

  /**
   * Defines if the Webflow `slider` module must be restarted when rendering items.
   */
  public restartSliders = false;

  /**
   * Defines if the Webflow `tabs` module must be restarted when rendering items.
   */
  public restartTabs = false;

  /**
   * A Promise that resolves when the previous rendering task finishes.
   */
  private renderingQueue?: Promise<CMSItem[]>;

  constructor(
    /**
     * The `Collection List Wrapper` element.
     */
    public readonly wrapper: CollectionListWrapperElement,

    /**
     * The index of the list on the page. Used when querying/storing this instance.
     * **Important:** This is not related to the `instanceIndex`, which relates to the number suffix in the attribute:
     * `fs-cmsfilter-element="list-2"` -> `2` is the `instanceIndex`, **not** the `index` of the list on the page.
     */
    public readonly index: number
  ) {
    super();

    // DOM Elements
    const list = getCollectionElements(wrapper, 'list');

    this.list = list;
    this.paginationWrapper = getCollectionElements(wrapper, 'pagination');
    this.paginationNext = getCollectionElements(wrapper, 'next');
    this.paginationPrevious = getCollectionElements(wrapper, 'previous');
    this.paginationCount = getCollectionElements(wrapper, 'pageCount');
    this.emptyElement = getCollectionElements(wrapper, 'empty');
    const collectionItems = getCollectionElements(wrapper, 'items');

    // Pagination
    this.itemsPerPage = this.originalItemsPerPage = collectionItems.length;
    this.totalPages = 1;
    storePaginationData(this);

    // Items
    const items: CMSItem[] = [];

    if (list) items.push(...collectionItems.map((element, index) => new CMSItem(element, list, index)));

    this.items = items;
    this.validItems = items;
    this.originalItemsOrder = [...items];
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
  public async addItems(itemElements: CollectionItemElement[], method: 'unshift' | 'push' = 'push'): Promise<void> {
    const { items, list, originalItemsOrder } = this;

    if (!list) return;

    const newItems = itemElements.map((item) => new CMSItem(item, list));

    for (const array of [items, originalItemsOrder]) array[method](...newItems);

    await this.emit('shouldnest', newItems);
    await this.emit('shouldcollectprops', newItems);
    await this.emit('shouldsort', newItems);
    await this.emit('shouldfilter');

    await this.renderItems(true);

    await this.emit('additems', newItems);
  }

  /**
   * Restores the original items order.
   */
  public restoreItemsOrder() {
    this.items = [...this.originalItemsOrder];
  }

  /**
   * Clears all stored {@link CMSItem} instances from the list.
   * @param removeElements If `true`, the {@link CMSItem.element} nodes will be removed from the DOM.
   */
  public clearItems(removeElements?: boolean) {
    if (removeElements) for (const { element } of this.items) element.remove();

    this.items = [];
    this.originalItemsOrder = [];
  }

  /**
   * Recalculates the list object model based on the current props of the items
   * and triggers de correspondent mutations.
   *
   * @param animateItems Defines if the rendered items should be animated.
   * @param animateList Defines if the list should be animated.
   *
   * @returns The rendered items.
   */
  public async renderItems(animateItems?: boolean, animateList?: boolean) {
    await this.renderingQueue;

    return new Promise<CMSItem[]>(async (resolve) => {
      const queueItem = renderListItems(this, animateItems, animateList);

      this.renderingQueue = queueItem;

      const renderedItems = await queueItem;
      resolve(renderedItems);
    });
  }

  /**
   * Shows / hides the requested element.
   * If the `listAnimation` exists, it uses that animation.
   *
   * @param elementKey The element to show/hide.
   * @param show The action to perform, `true` to show, `false` to hide. Defaults to `true`.
   * @param animate Defines if the transition should be animated. Defaults to `true`.
   */
  public async displayElement(
    elementKey:
      | 'wrapper'
      | 'list'
      | 'emptyElement'
      | 'initialElement'
      | 'paginationNext'
      | 'paginationPrevious'
      | 'loader',
    show = true,
    animate = true
  ): Promise<void> {
    const { listAnimation } = this;

    const elementToDisplay = this[elementKey];
    if (!elementToDisplay) return;

    if (listAnimation && animate) {
      const { animateIn, animateOut, options } = listAnimation;

      await (show ? animateIn : animateOut)(elementToDisplay, options);
    } else {
      elementToDisplay.style.display = show ? '' : 'none';
      elementToDisplay.style.opacity = show ? '1' : '0';
    }
  }

  /**
   * Switches the current page.
   *
   * @param targetPage The target page to set.
   *
   * @param renderItems Defines if the list should be re-rendered.
   * If `false`, the rendering responsibilities should be handled by another controller.
   *
   * @returns An awaitable Promise that resolves after the list has re-rendered.
   */
  public async switchPage(targetPage: number, renderItems = true) {
    const { currentPage: previousPage, showPaginationQuery } = this;

    if (targetPage === previousPage) return;

    await this.emit('switchpage', targetPage);

    this.currentPage = targetPage;

    this.scrollToAnchor();

    if (showPaginationQuery) setPaginationQueryParams(this);

    if (renderItems) await this.renderItems();
  }

  /**
   * Inits pagination on the instance.
   * @param showQuery If `true`, pagination query params will be added to the URL when switching pages.
   */
  public initPagination(showQuery?: boolean) {
    this.paginationActive = true;
    this.showPaginationQuery = !!showQuery;
  }

  /**
   * Adds a missing `PaginationButtonElement` to the list.
   * @param element A {@link PaginationButtonElement}.
   * @param elementKey The button element key.
   */
  public addPaginationButton(
    element: PaginationButtonElement,
    elementKey: 'paginationNext' | 'paginationPrevious',
    childIndex: number
  ) {
    const { paginationWrapper } = this;

    if (!paginationWrapper || this[elementKey] || childIndex < 0) return;

    element.style.display = 'none';

    paginationWrapper.insertBefore(element, paginationWrapper.children[childIndex]);

    this[elementKey] = element;
  }

  /**
   * Adds an `Empty State` element to the list.
   * @param element The element to add.
   */
  public addEmptyElement(element: HTMLElement) {
    const { wrapper, list, emptyElement } = this;

    if (emptyElement) return;

    element.style.display = 'none';
    wrapper.insertBefore(element, list?.nextSibling || null);

    this.emptyElement = element;
  }

  /**
   * Adds a `Loader` element to the list.
   * @param element The element to add.
   */
  public addLoader(element: HTMLElement) {
    const { loader } = this;

    if (loader) return;

    element.style.display = 'none';

    this.loader = element;
  }

  /**
   * Adds an `Items Count` element to the list.
   * @param element The element to add.
   */
  public addItemsCount(element: HTMLElement) {
    if (this.itemsCount) return;

    this.itemsCount = element;

    const update = () => updateItemsCount(element, this.items.length);

    update();
    this.on('additems', update);
  }

  /**
   * Adds a `Visible Count` element to the list.
   * @param element The element to add.
   */
  public addVisibleCount(element: HTMLElement) {
    if (this.visibleCount) return;

    this.visibleCount = element;

    const update = () => updateItemsCount(element, Math.min(this.itemsPerPage, this.validItems.length));

    update();
    this.on('renderitems', update);
  }

  /**
   * Scrolls to the anchor element of the list.
   */
  public scrollToAnchor() {
    const { scrollAnchor } = this;

    if (!scrollAnchor) return;

    window.setTimeout(() => scrollAnchor.scrollIntoView({ behavior: 'smooth' }), 100);
  }

  /**
   * @returns An attribute value, if exists on the `Collection List Wrapper` or the `Collection List`.
   * @param attributeKey The key of the attribute
   */
  public getAttribute(attributeKey: string): string | null | undefined {
    const { wrapper, list } = this;

    return wrapper.getAttribute(attributeKey) || list?.getAttribute(attributeKey);
  }

  /**
   * Gets the instance of the list for a specific attribute key.
   * @param key The attribute key. Example: `fs-cmsfilter-element`.
   *
   * @example 'fs-cmsfilter-element="list-2"' // Returns 2.
   */
  public getInstanceIndex(key: string): number | undefined {
    const { wrapper, list } = this;

    return getInstanceIndex(wrapper, key) || (list ? getInstanceIndex(list, key) : undefined);
  }
}
