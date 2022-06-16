import type { CMSList } from '@finsweet/attributes-cmscore';
import { cloneNode, Debug } from '@finsweet/ts-utils';

import { hasRemoveTrigger, updateTagText } from '../actions/tags';
import { ATTRIBUTES, getSelector, queryElement } from '../utils/constants';
import type { FilterData, TagData, TagFormat, TagsData } from '../utils/types';
import type { CMSFilters } from './CMSFilters';

export class CMSTags {
  private readonly wrapper: HTMLElement;

  private tagsData: TagsData = [];
  private hasRemoveTrigger = false;

  constructor(
    private readonly template: HTMLElement,
    private readonly filtersInstance: CMSFilters,
    private readonly listInstance: CMSList,
    private readonly globalTagsFormat?: TagFormat
  ) {
    this.wrapper = template.parentElement || Debug.alert('The tags have no parent wrapper.', 'error');

    this.init();
  }

  /**
   * Inits the instance.
   */
  private init() {
    const { template, wrapper } = this;

    template.remove();

    this.hasRemoveTrigger = hasRemoveTrigger(template);

    wrapper.addEventListener('click', (e) => this.handleClick(e));
  }

  /**
   * Handles click events on the `wrapper` element.
   * @param e The Mouse Event.
   */
  private handleClick(e: MouseEvent) {
    const { target } = e;

    if (!(target instanceof Element)) return;

    const { hasRemoveTrigger, tagsData, listInstance } = this;

    const tagElement = target.closest<HTMLElement>(
      getSelector('element', 'tagTemplate', { instanceIndex: listInstance.getInstanceIndex(ATTRIBUTES.element.key) })
    );
    if (!tagElement) return;

    const removeElement = target.closest(getSelector('element', 'tagRemove', { operator: 'prefixed' }));
    if (hasRemoveTrigger && !removeElement) return;

    const tagData = tagsData.find(({ element }) => element === tagElement);
    if (tagData) this.removeTag(tagData, true);
  }

  /**
   * Adds a new tag.
   * @param filterKeys The `filterKeys` that correspond to the tag.
   * @param values The `value` that corresponds to the tag.
   */
  private async addTag(filterData: FilterData, values: TagData['values']) {
    const {
      wrapper,
      template,
      tagsData,
      globalTagsFormat,
      listInstance: { listAnimation },
    } = this;

    const element = cloneNode(template);

    const textNode = queryElement('tagText', { operator: 'prefixed', scope: element }) || element;

    const tagData: TagData = {
      element,
      values,
      textNode,
      filterData,
    };

    updateTagText(tagData, globalTagsFormat);

    tagsData.push(tagData);

    if (listAnimation) {
      const { animateIn, options } = listAnimation;

      await animateIn(element, { target: wrapper, ...options });
    } else {
      element.style.opacity = '1';
      wrapper.appendChild(element);
    }
  }

  /**
   * Updates a tag's content.
   * @param tagData A {@link TagData} record.
   * @param newValues The new value to store.
   */
  private async updateTag(tagData: TagData, newValues: string[]) {
    const { globalTagsFormat } = this;

    tagData.values = newValues;

    updateTagText(tagData, globalTagsFormat);
  }

  /**
   * Removes an existing tag.
   * @param tagData A {@link TagData} record.
   * @param resetFilters If set to `true`, the `tagremove` event will be emitted.
   */
  private async removeTag(tagData: TagData, resetFilters?: boolean) {
    const {
      element,
      values,
      filterData: { filterKeys },
    } = tagData;
    const {
      tagsData,
      filtersInstance,
      listInstance: { listAnimation },
    } = this;

    // Remove the data
    this.tagsData = tagsData.filter((data) => data !== tagData);

    await Promise.all([
      // Reset filters
      Promise.all(
        values.map(async (value) => {
          if (resetFilters) return filtersInstance.resetFilters(filterKeys, value);
        })
      ),

      // Remove the element
      (async () => {
        if (listAnimation) {
          const { animateOut, options } = listAnimation;

          await animateOut(element, { remove: true, ...options });
        } else element.remove();
      })(),
    ]);
  }

  /**
   * Syncs the tags with the existing `FiltersData`.
   * @returns An awaitable Promise that resolves once all animations have concluded.
   */
  public async syncTags() {
    const {
      tagsData,
      filtersInstance: { filtersData },
    } = this;

    await Promise.all(
      filtersData.map((filterData) => {
        const { values, mode: filterMode } = filterData;

        const filterValues = [...values];

        const existingTags = tagsData.filter((tagData) => tagData.filterData === filterData);

        // Just update the text if it's a single value or a range
        if (
          existingTags.length === 1 &&
          (filterValues.length === 1 || (filterMode === 'range' && filterValues.length))
        ) {
          const [tagData] = existingTags;

          this.updateTag(tagData, filterValues);

          return;
        }

        // Otherwise re-render the differences
        const valuesToAdd = [...filterValues].filter(
          (filterValue) => !existingTags.some(({ values }) => values.includes(filterValue))
        );

        const tagsToRemove = existingTags.filter(({ values }) =>
          values.every((value) => !filterValues.includes(value))
        );

        return Promise.all([
          // Add tags
          (async () => {
            if (filterMode === 'range' && valuesToAdd.length) return this.addTag(filterData, valuesToAdd);

            return Promise.all(valuesToAdd.map((value) => this.addTag(filterData, [value])));
          })(),

          // Remove tags
          Promise.all(tagsToRemove.map((tagData) => this.removeTag(tagData))),
        ]);
      })
    );
  }
}
