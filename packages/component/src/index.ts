import { COMPONENT_ATTRIBUTE } from '$global/constants/attributes';
import { initAttribute } from '$global/factory';

import { version } from '../package.json';
import { init } from './init';
import { ATTRIBUTES } from './utils/constants';

/**
 * Init
 */
initAttribute({
  init,
  version,
  attributeKey: COMPONENT_ATTRIBUTE,
  scriptAttributes: {
    proxy: ATTRIBUTES.proxy.key,
  },
});
