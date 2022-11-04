import { VIDEO_HLS_ATTRIBUTE } from '$global/constants/attributes';
import { initAttribute } from '$global/factory';
import { importCMSCore } from '$global/import';

import { version } from '../package.json';
import { init } from './init';

/**
 * Init
 */
initAttribute({
  init,
  version,
  attributeKey: VIDEO_HLS_ATTRIBUTE,
});

importCMSCore();
