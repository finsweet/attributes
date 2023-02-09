import { isNotEmpty } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, CMS_SELECT_ATTRIBUTE, COMBO_BOX_ATTRIBUTE } from '$global/constants/attributes';
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

  const cleanups = referenceElements.map(initComboBox).filter(isNotEmpty);

  return finalizeAttribute(COMBO_BOX_ATTRIBUTE, referenceElements, () => {
    for (const cleanup of cleanups) cleanup();
  });
};

/**
 * Inits a new combo box instance.
 * @param referenceElement The element that has the `dropdown` attribute.
 *
 * @returns A callback to destroy all listeners.
 */
const initComboBox = (referenceElement: HTMLElement) => {
  const settings = collectSettings(referenceElement);
  if (!settings) return;

  populateOptions(settings, '', false, true);

  const disconnectObservers = observeElements(settings);
  const removeEventListeners = listenEvents(settings);

  return () => {
    disconnectObservers();
    removeEventListeners();
  };
};
