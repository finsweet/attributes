import { addListener, FORM_CSS_CLASSES, isFormField, isVisible, sameValues } from '@finsweet/ts-utils';
import type { FormBlockElement } from '@finsweet/ts-utils';
import debounce from 'just-debounce';

import { importAnimations } from '$global/import';
import type { CMSList } from '$packages/cmscore';

import { clearFilterData } from '../actions/clear';
import { collectFiltersData, collectFiltersElements } from '../actions/collect';
import { displayFilterElements } from '../actions/display';
import { assessFilter } from '../actions/filter';
import { handleFilterInput } from '../actions/input';
import { getQueryParams, setQueryParams } from '../actions/query';
import { syncFilterKeyResults, updateFilterKeyResults, updateListResults } from '../actions/results';
import { ATTRIBUTES } from '../utils/constants';
import type { FilterElement, FiltersData } from '../utils/types';
import type { CMSTags } from './CMSTags';

// Constants
const {
  field: { key: fieldKey },
  range: { key: rangeKey },
  type: { key: typeKey },
} = ATTRIBUTES;

/**
 * Instance of a `cmsfilter` form that contains all the filter inputs.
 */
export class CMSFilters {
  /**
   * The <form> element that holds all filters.
   */
  public readonly form;

  /**
   * An element where the amount of matching results is displayed.
   */
  public readonly resultsElement;

  /**
   * Reset buttons settings.
   */
  public readonly resetButtonsData;

  /**
   * A `<input type="submit">` button.
   */
  public readonly submitButton;

  /**
   * The filters data.
   */
  public filtersData!: FiltersData;

  /**
   * Defines if any filter element that must be hidden when empty exists.
   */
  public hideEmptyFilters!: boolean;

  /**
   * Defines if any filter element has a results display element.
   */
  public showFilterResults!: boolean;

  /**
   * Defines if any filter element must highlight its matching results.
   */
  public highlightResults!: boolean;

  /**
   * Destroys the instance's listeners.
   */
  public destroy;

  /**
   * The debounced `applyFilters` action, based on the user's debouncing settings.
   */
  private debouncedApplyFilters?: () => void;

  /**
   * Defines if some filter is currently being restarted.
   */
  private restartingFilters = false;

  /**
   * Defines if any filter is currently active.
   */
  private filtersActive?: boolean;

  /**
   * Defines if the submit button is visible.
   */
  private submitButtonVisible;

  /**
   * Defines a {@link CMSTags} instance.
   */
  private tagsInstance?: CMSTags;

  /**
   * Defines if the filters query must be printed in the Address bar.
   */
  private readonly showQueryParams;

  /**
   * Defines if the filters form should not prevent default behavior when submitting it.
   */
  private readonly allowSubmit;

  /**
   * Defines the global active CSS class to apply on active filters.
   */
  private readonly activeCSSClass: string;

  /**
   * Defines the global debouncing to apply on filters.
   */
  private readonly debouncing: number;

  /**
   * Defines if all results should be highlighted.
   */
  private readonly highlightAll: boolean;

  /**
   * Defines the global highlight CSS class to appy on highlighted elements.
   */
  private readonly highlightCSSClass: string;

  constructor(
    /**
     * Defines the `Form Block` element that hold all filters.
     */
    public readonly formBlock: FormBlockElement,

    /**
     * Defines a {@link CMSList} instance.
     */
    public readonly listInstance: CMSList,
    {
      resultsElement,
      showQueryParams,
      allowSubmit,
      highlightAll,
      highlightCSSClass,
      activeCSSClass,
      debouncing,
    }: {
      resultsElement: HTMLElement | null;
      showQueryParams: boolean;
      allowSubmit: boolean;
      highlightAll: boolean;
      highlightCSSClass: string;
      activeCSSClass: string;
      debouncing: number;
    }
  ) {
    const { form, submitButton, resetButtonsData } = collectFiltersElements(formBlock);

    this.form = form;
    this.submitButton = submitButton;
    this.resetButtonsData = resetButtonsData;
    this.resultsElement = resultsElement;
    this.showQueryParams = showQueryParams;
    this.allowSubmit = allowSubmit;
    this.activeCSSClass = activeCSSClass;
    this.debouncing = debouncing;
    this.highlightAll = highlightAll;
    this.highlightCSSClass = highlightCSSClass;
    this.submitButtonVisible = !!submitButton && isVisible(submitButton);

    // Init
    const cleanupPromise = this.init();

    this.destroy = async () => {
      const cleanup = await cleanupPromise;
      cleanup();
    };
  }

  /**
   * Inits the instance.
   *
   * @returns A cleanup callback.
   */
  private async init() {
    const { listInstance, hideEmptyFilters, showFilterResults } = this;

    this.storeFiltersData();

    for (const item of listInstance.items) item.collectProps({ fieldKey, rangeKey, typeKey });

    updateListResults(this, listInstance);

    syncFilterKeyResults(this, listInstance);

    if (hideEmptyFilters) displayFilterElements(this);

    if (showFilterResults) updateFilterKeyResults(this);

    getQueryParams(this);

    await importAnimations();

    this.applyFilters();

    return this.listenEvents();
  }

  /**
   * Listens for internal events.
   *
   * @returns A callback to destroy all event listeners.
   */
  private async listenEvents() {
    const { form, resetButtonsData, submitButton } = this;

    // Form
    const submitCleanup = addListener(form, 'submit', (e) => this.handleSubmit(e));
    const inputCleanup = addListener(form, 'input', (e) => this.handleInputEvents(e));

    // Reset buttons
    const resetButtonsCleanups: (() => void)[] = [];

    for (const [resetButton, filterKeys] of resetButtonsData) {
      const clickCleanup = addListener(resetButton, 'click', () => this.resetFilters(filterKeys));
      resetButtonsCleanups.push(clickCleanup);

      const radioField = resetButton.closest(`.${FORM_CSS_CLASSES.radioField}`);
      if (!radioField) continue;

      const radio = radioField.querySelector('input');
      if (!radio) continue;

      const radioCleanup = addListener(radio, 'input', () => {
        if (radio.checked) this.resetFilters(filterKeys);
      });
      resetButtonsCleanups.push(radioCleanup);
    }

    // Submit button visibility
    let windowResizeCleanup: () => void;

    if (submitButton) {
      windowResizeCleanup = addListener(
        window,
        'resize',
        debounce(() => {
          this.submitButtonVisible = isVisible(submitButton);
        }, 50)
      );
    }

    // Destroy callback.
    return () => {
      submitCleanup();
      inputCleanup();
      windowResizeCleanup?.();
      for (const cleanup of resetButtonsCleanups) cleanup();
    };
  }

  /**
   * Handles input events.
   * @param e The `InputEvent`.
   */
  private async handleInputEvents({ target }: Event) {
    const { submitButtonVisible, filtersData, restartingFilters } = this;

    if (!isFormField(target)) return;

    let elementData: FilterElement | undefined;

    const filterData = filtersData.find(({ elements }) => {
      elementData = elements.find((data) => data.element === target);

      return elementData;
    });

    if (!filterData || !elementData) return;

    const validInput = handleFilterInput(target, filterData, elementData);
    if (!validInput) return;

    if (restartingFilters || submitButtonVisible) return;

    const { debouncing } = elementData;

    this.debouncedApplyFilters ||= debounce(this.applyFilters, debouncing);

    await this.debouncedApplyFilters();
  }

  /**
   * Handles form submit events.
   * @param e The `Submit` event.
   */
  private async handleSubmit(e: Event) {
    if (!this.allowSubmit) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    await this.applyFilters();
  }

  /**
   * Toggles the {@link CMSFilters.filtersActive} state.
   * If the {@link CMSList.initialElement} is defined, it toggles its visibility accordingly.
   *
   * @param filtersAreEmpty `true` if there are currently no filters to apply.
   * @returns An awaitable Promise.
   */
  private async toggleFiltersState(filtersAreEmpty: boolean) {
    const { listInstance, filtersActive } = this;

    const newActiveState = !filtersAreEmpty;
    if (filtersActive === newActiveState) return;

    this.filtersActive = newActiveState;

    if (!listInstance.initialElement) return;

    await listInstance.displayElement(newActiveState ? 'initialElement' : 'wrapper', false, false);
    await listInstance.displayElement(newActiveState ? 'wrapper' : 'initialElement', true, filtersActive !== undefined);
  }

  /**
   * Mutates each `CMSItem`'s state to define if it should be displayed or not.
   *
   * @param addingItems Defines if new items are being added.
   * In that case, the rendering responsibilities are handled by another controller.
   *
   * @param syncTags Defines if the {@link CMSTags} instance should be syncronized. Defaults to `true`.
   */
  public async applyFilters(addingItems?: boolean, syncTags = true): Promise<void> {
    // Remove current debouncing
    this.debouncedApplyFilters = undefined;

    const { listInstance, filtersData, filtersActive, highlightResults, tagsInstance, showQueryParams } = this;
    const { items, initialElement } = listInstance;

    // Abort if no filtering is needed
    const filtersAreEmpty = filtersData.every(({ values }) => !values.size);

    if (filtersAreEmpty && !filtersActive) {
      await this.toggleFiltersState(filtersAreEmpty);
      return;
    }

    // Define show/hide of each item based on the match
    for (const item of items) {
      item.valid = assessFilter(item, filtersData, filtersAreEmpty, highlightResults);
    }

    if (addingItems) return;

    // Render the items
    await listInstance.switchPage(1, false);

    listInstance.scrollToAnchor();

    if (showQueryParams) setQueryParams(filtersData);

    await Promise.all([
      // Render items
      (async () => {
        if (filtersAreEmpty) {
          await this.toggleFiltersState(filtersAreEmpty);
          await listInstance.renderItems(false, !initialElement);
        } else {
          await listInstance.renderItems(false, !initialElement);
          await this.toggleFiltersState(filtersAreEmpty);
        }
      })(),

      // Sync the `CMSTags`
      (async () => {
        if (syncTags) await tagsInstance?.syncTags();
      })(),
    ]);
  }

  /**
   * Resets the active filters.
   * @param filterKeys If passed, only this filter key will be resetted.
   * @param value If passed, only that specific value and the elements that hold it will be cleared.
   */
  public async resetFilters(filterKeys?: string[], value?: string): Promise<void> {
    this.restartingFilters = true;

    const { filtersData } = this;

    if (!filterKeys || !filterKeys.length) for (const filterData of filtersData) clearFilterData(filterData);
    else {
      const filterData = filtersData.find((data) => sameValues(data.filterKeys, filterKeys));
      if (!filterData) return;

      clearFilterData(filterData, value);
    }

    const syncTags = !value;

    await this.applyFilters(false, syncTags);

    this.restartingFilters = false;
  }

  /**
   * Adds a {@link CMSTags} instance.
   * @param tagsInstance The `CMSTags` instance.
   */
  public async addTagsInstance(tagsInstance: CMSTags) {
    this.tagsInstance = tagsInstance;

    await tagsInstance.syncTags();
  }

  /**
   * Stores the data of all filters.
   * @returns The stored {@link FiltersData}.
   */
  public storeFiltersData() {
    const { form, activeCSSClass, debouncing, highlightAll, highlightCSSClass } = this;

    const filtersData = collectFiltersData(form, activeCSSClass, debouncing, highlightAll, highlightCSSClass);

    this.filtersData = filtersData;
    this.showFilterResults = filtersData.some(({ elements }) => elements.some(({ resultsElement }) => resultsElement));
    this.hideEmptyFilters = filtersData.some(({ elements }) => elements.some(({ hideEmpty }) => hideEmpty));
    this.highlightResults = filtersData.some(({ highlight }) => highlight);

    return filtersData;
  }
}
