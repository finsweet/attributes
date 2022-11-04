import { CMS_ATTRIBUTE_ATTRIBUTE, EXAMPLE_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { logHello } from './actions/console';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  logHello();

  return finalizeAttribute(EXAMPLE_ATTRIBUTE);
};
