import { type FsAttributeInit, noop, waitWebflowReady } from '@finsweet/attributes-utils';

import cleanUrl from './actions/clean-url';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const result = cleanUrl();

  return {
    result,
    destroy: () => noop,
  };
};
