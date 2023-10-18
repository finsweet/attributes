import { addListAnimation, type CMSList } from '@finsweet/attributes-cmscore';
import { FORM_CSS_CLASSES, type FormBlockElement, parseNumericAttribute } from '@finsweet/attributes-utils';

import { CMSFilters } from './components/CMSFilters';
import { CMSTags } from './components/CMSTags';
import { DEFAULT_ACTIVE_CSS_CLASS, DEFAULT_DEBOUNCING, DEFAULT_HIGHLIGHT_CSS_CLASS } from './utils/constants';
import {
  getAttribute,
  getInstanceIndex,
  getSettingAttributeName,
  hasAttributeValue,
  queryElement,
} from './utils/selectors';

/**
 * Creates a new {@link CMSFilters} instance.
 * @param listInstance The {@link CMSList} instance.
 * @returns The new instance, if valid.
 */
export const createCMSFiltersInstance = (listInstance: CMSList): CMSFilters | undefined => {
  const { listOrWrapper } = listInstance;

  const instanceIndex = getInstanceIndex(listOrWrapper);

  // Base elements
  const filters = queryElement('filters', { instanceIndex });
  if (!filters) return;

  const formBlock = filters.closest<FormBlockElement>(`.${FORM_CSS_CLASSES.formBlock}`);
  if (!formBlock) return;

  // Empty State Element
  const emptyElement = queryElement('empty', { instanceIndex });
  if (emptyElement) listInstance.addEmptyElement(emptyElement);

  // Initial State Element
  const initialElement = queryElement('initial', { instanceIndex });
  if (initialElement) listInstance.initialElement = initialElement;

  // Scroll Anchor Element
  if (!listInstance.scrollAnchor) {
    const scrollAnchor = queryElement('scroll-anchor', { instanceIndex });
    if (scrollAnchor) listInstance.scrollAnchor = scrollAnchor;
  }

  // Items Count Element
  if (!listInstance.itemsCount) {
    const itemsCount = queryElement('items-count', { instanceIndex });
    if (itemsCount) listInstance.addItemsCount(itemsCount);
  }

  // Results Count Element
  const resultsElement = queryElement('results-count', { instanceIndex });

  // Query Params
  const showQueryParams = hasAttributeValue(listOrWrapper, 'showquery', 'true');

  // Allow Form Submission
  const allowSubmit = hasAttributeValue(listOrWrapper, 'allowsubmit', 'true');

  // Highlight
  const highlightAll = hasAttributeValue(listOrWrapper, 'highlight', 'true');
  const highlightCSSClass = getAttribute(listOrWrapper, 'highlightclass') || DEFAULT_HIGHLIGHT_CSS_CLASS;

  // Active CSS
  const activeCSSClass = getAttribute(listOrWrapper, 'active') || DEFAULT_ACTIVE_CSS_CLASS;

  // Debouncing
  const debouncing = parseNumericAttribute(getAttribute(listOrWrapper, 'debounce'), DEFAULT_DEBOUNCING);

  // Create instance
  const filtersInstance = new CMSFilters(formBlock, listInstance, {
    resultsElement,
    showQueryParams,
    allowSubmit,
    highlightAll,
    highlightCSSClass,
    activeCSSClass,
    debouncing,
  });

  // Add animation
  addListAnimation(listInstance, {
    durationKey: getSettingAttributeName('duration'),
    easingKey: getSettingAttributeName('easing'),
  });

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
  const { listOrWrapper } = listInstance;

  const instanceIndex = getInstanceIndex(listOrWrapper);

  const tagTemplate = queryElement('tag-template', { instanceIndex });
  if (!tagTemplate) return;

  const globalTagsFormat = getAttribute(listOrWrapper, 'tagformat', true);

  const tagsInstance = new CMSTags(tagTemplate, filtersInstance, listInstance, globalTagsFormat);

  await filtersInstance.addTagsInstance(tagsInstance);

  return tagsInstance;
};
