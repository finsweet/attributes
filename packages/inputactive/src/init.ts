import { CMS_ATTRIBUTE_ATTRIBUTE, INPUT_ACTIVE_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { initInputActiveClasses } from './factory';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const cleanup = initInputActiveClasses();

  return finalizeAttribute(INPUT_ACTIVE_ATTRIBUTE, undefined, cleanup);
};
