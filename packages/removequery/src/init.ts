import { type FinsweetAttributeInit, waitAttributeLoaded, waitWebflowReady } from '@finsweet/attributes-utils';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();
  await waitAttributeLoaded('list');
  await waitAttributeLoaded('queryparam');

  const url = new URL(window.location.href);

  url.search = '';

  window.history.replaceState({}, '', url);

  return {};
};
