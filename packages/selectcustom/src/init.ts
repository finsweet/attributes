import { isNotEmpty } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, CMS_SELECT_ATTRIBUTE, SELECT_CUSTOM_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { listenEvents } from './actions/events';
import { observeElements } from './actions/observe';
import { populateOptions } from './actions/populate';
import { collectSettings } from './actions/settings';
import { queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<HTMLElement[]> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE, CMS_SELECT_ATTRIBUTE);

  const referenceElements = queryElement<HTMLElement>('dropdown', { all: true, operator: 'prefixed' });

  const cleanups = referenceElements.map(initCustomSelect).filter(isNotEmpty);

  return finalizeAttribute(SELECT_CUSTOM_ATTRIBUTE, referenceElements, () => {
    for (const cleanup of cleanups) cleanup();
  });
};

/**
 * Inits a new custom select instance.
 * @param referenceElement The element that has the `dropdown` attribute.
 *
 * @returns A callback to destroy all listeners.
 */
const initCustomSelect = (referenceElement: HTMLElement) => {
  const settings = collectSettings(referenceElement);
  if (!settings) return;

  populateOptions(settings);
  const disconnectObservers = observeElements(settings);
  const removeEventListeners = listenEvents(settings);

  return () => {
    disconnectObservers();
    removeEventListeners();
  };
};
