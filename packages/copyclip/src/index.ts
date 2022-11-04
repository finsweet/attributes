import { COPY_CLIP_ATTRIBUTE } from '$global/constants/attributes';
import { initAttribute } from '$global/factory';

import { version } from '../package.json';
import { init } from './init';

/**
 * Init
 */
initAttribute({
  init,
  version,
  attributeKey: COPY_CLIP_ATTRIBUTE,
});
