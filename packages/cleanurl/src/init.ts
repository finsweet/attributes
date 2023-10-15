import { type FsAttributeInit, noop, waitWebflowReady } from '@finsweet/attributes-utils';

import cleanUrl from './actions/clean-url';
import type { FsCleanUrlSettings } from './utils/types';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async (globalSettings: FsCleanUrlSettings = {}) => {
  await waitWebflowReady();

  const result = cleanUrl(globalSettings);
  return {
    result,
    destroy: () => noop,
  };
};
