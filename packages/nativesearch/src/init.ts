import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  return {};
};
