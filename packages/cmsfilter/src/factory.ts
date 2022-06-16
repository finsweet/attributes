import { addListAnimation } from '@finsweet/attributes-cmscore';
import type { CMSList } from '@finsweet/attributes-cmscore';
import { isKeyOf, FORM_CSS_CLASSES } from '@finsweet/ts-utils';
import type { FormBlockElement } from '@finsweet/ts-utils';

import { CMSFilters } from './components/CMSFilters';
import { CMSTags } from './components/CMSTags';
import {
  ATTRIBUTES,
  DEFAULT_ACTIVE_CSS_CLASS,
  DEFAULT_DEBOUNCING,
  DEFAULT_HIGHLIGHT_CSS_CLASS,
  queryElement,
  TAG_FORMATS,
} from './utils/constants';

// Constants destructuring
const {
  element: { key: elementKey },
  duration: { key: durationKey },
  easing: { key: easingKey },
  showQuery: { key: showQueryKey, values: showQueryValues },
  tagFormat: { key: tagsFormatKey },
  highlight: { key: highlightKey, values: highlightValues },
  highlightCSS: { key: highlightCSSKey },
  activeCSS: { key: activeCSSKey },
  debouncing: { key: debouncingKey },
} = ATTRIBUTES;

/**
 * Creates a new {@link CMSFilters} instance.
 * @param listInstance The {@link CMSList} instance.
 * @returns The new instance, if valid.
 */
export const createCMSFiltersInstance = (listInstance: CMSList): CMSFilters | undefined => {
  const instanceIndex = listInstance.getInstanceIndex(elementKey);

  // Base elements
  const filters = queryElement('filters', { instanceIndex });
  if (!filters) return;

  const formBlock = filters.closest<FormBlockElement>(`.${FORM_CSS_CLASSES.formBlock}`);
  if (!formBlock) return;

  // Empty State Element
  const emptyElement = queryElement<HTMLElement>('empty', { instanceIndex });
  if (emptyElement) listInstance.addEmptyElement(emptyElement);

  // Initial State Element
  const initialElement = queryElement<HTMLElement>('initial', { instanceIndex });
  if (initialElement) listInstance.initialElement = initialElement;

  // Scroll Anchor Element
  if (!listInstance.scrollAnchor) {
    const scrollAnchor = queryElement<HTMLElement>('scrollAnchor', { instanceIndex });
    if (scrollAnchor) listInstance.scrollAnchor = scrollAnchor;
  }

  // Items Count Element
  if (!listInstance.itemsCount) {
    const itemsCount = queryElement<HTMLElement>('itemsCount', { instanceIndex });
    if (itemsCount) listInstance.addItemsCount(itemsCount);
  }

  // Results Count Element
  const resultsElement = queryElement<HTMLElement>('resultsCount', { instanceIndex });

  // Query Params
  const showQueryParams = listInstance.getAttribute(showQueryKey) === showQueryValues.true;

  // Highlight
  const highlightAll = listInstance.getAttribute(highlightKey) === highlightValues.true;
  const highlightCSSClass = listInstance.getAttribute(highlightCSSKey) || DEFAULT_HIGHLIGHT_CSS_CLASS;

  // Active CSS
  const activeCSSClass = listInstance.getAttribute(activeCSSKey) || DEFAULT_ACTIVE_CSS_CLASS;

  // Debouncing
  const debouncing = parseFloat(listInstance.getAttribute(debouncingKey) || DEFAULT_DEBOUNCING);

  // Make sure instances are unique
  const {
    fsAttributes: { cms },
  } = window;

  cms.filtersInstances ||= [];

  if (cms.filtersInstances[instanceIndex || 0]) return;

  // Create instance
  const filtersInstance = new CMSFilters(formBlock, listInstance, {
    resultsElement,
    showQueryParams,
    highlightAll,
    highlightCSSClass,
    activeCSSClass,
    debouncing,
  });

  cms.filtersInstances[instanceIndex || 0] ||= filtersInstance;

  // Add animation
  addListAnimation(listInstance, { durationKey, easingKey });

  return filtersInstance;
};

/**
 * Creates a new {@link CMSTags} instance.
 * @param listInstance The {@link CMSList} instance.
 * @param filtersInstance The {@link CMSFilters} instance.
 * @returns The new instance, if valid.
 */
export const createCMSTagsInstance = async (
  listInstance: CMSList,
  filtersInstance: CMSFilters
): Promise<CMSTags | undefined> => {
  const instanceIndex = listInstance.getInstanceIndex(elementKey);

  const tagTemplate = queryElement<HTMLElement>('tagTemplate', { instanceIndex });
  if (!tagTemplate) return;

  const rawTagsFormat = listInstance.getAttribute(tagsFormatKey);
  const globalTagsFormat = isKeyOf(rawTagsFormat, TAG_FORMATS) ? rawTagsFormat : undefined;

  const tagsInstance = new CMSTags(tagTemplate, filtersInstance, listInstance, globalTagsFormat);

  await filtersInstance.addTagsInstance(tagsInstance);

  return tagsInstance;
};
