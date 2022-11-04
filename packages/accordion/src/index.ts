import { ACCORDION_ATTRIBUTE } from '$global/constants/attributes';
import { initAttribute } from '$global/factory';

import { version } from '../package.json';
import { init } from './init';

/**
 * Init
 */
initAttribute({
  init,
  version,
  attributeKey: ACCORDION_ATTRIBUTE,
});
