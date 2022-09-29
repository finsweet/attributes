import { CMS_ATTRIBUTE_ATTRIBUTE, CMS_SELECT_ATTRIBUTE, SELECT_CUSTOM_ATTRIBUTE } from '$global/constants/attributes';

import { listenEvents } from './actions/events';
import { observeElements } from './actions/observe';
import { populateOptions } from './actions/populate';
import { collectSettings } from './actions/settings';
import { getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<NodeListOf<HTMLElement>> => {
  await window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE]?.loading;
  await window.fsAttributes[CMS_SELECT_ATTRIBUTE]?.loading;

  const referenceElements = document.querySelectorAll<HTMLElement>(
    getSelector('element', 'dropdown', { operator: 'prefixed' })
  );

  for (const referenceElement of referenceElements) initCustomSelect(referenceElement);

  window.fsAttributes[SELECT_CUSTOM_ATTRIBUTE].resolve?.(referenceElements);

  return referenceElements;
};

/**
 * Inits a new custom select instance.
 * @param referenceElement The element that has the `dropdown` attribute.
 */
const initCustomSelect = (referenceElement: HTMLElement) => {
  const settings = collectSettings(referenceElement);
  if (!settings) return;

  populateOptions(settings);
  observeElements(settings);
  listenEvents(settings);
};
