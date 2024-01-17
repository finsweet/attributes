import {
  type FinsweetAttributeInit,
  isNotEmpty,
  waitAttributeLoaded,
  waitWebflowReady,
} from '@finsweet/attributes-utils';

import { listenEvents } from './actions/events';
import { observeElements } from './actions/observe';
import { populateOptions } from './actions/populate';
import { collectSettings } from './actions/settings';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();
  await waitAttributeLoaded('cmsselect');

  const referenceElements = queryAllElements('dropdown');

  const cleanups = referenceElements.map(initCustomSelect).filter(isNotEmpty);

  return {
    result: referenceElements,
    destroy() {
      for (const cleanup of cleanups) cleanup();
    },
  };
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
