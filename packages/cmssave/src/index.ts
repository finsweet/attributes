import { initAttributes } from '$global/factory';

import { version } from '../package.json';
import { init } from './init';
import { ATTRIBUTE } from './utils/constants';

/**
 * Init
 */
initAttributes({
  init,
  version,
  attributeKey: ATTRIBUTE,
});
