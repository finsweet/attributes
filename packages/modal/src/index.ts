import { MODAL_ATTRIBUTE } from '$global/constants/attributes';
import { initAttribute } from '$global/factory';
import { importAnimations } from '$global/import';

import { version } from '../package.json';
import { init } from './init';

/**
 * Init
 */
initAttribute({
  init,
  version,
  attributeKey: MODAL_ATTRIBUTE,
});

importAnimations();
