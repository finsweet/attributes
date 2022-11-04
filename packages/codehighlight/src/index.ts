import { CODE_HIGHLIGHT_ATTRIBUTE } from '$global/constants/attributes';
import { initAttribute } from '$global/factory';

import { version } from '../package.json';
import { importHighlightJS } from './actions/import';
import { init } from './init';

/**
 * Init
 */
initAttribute({
  init,
  version,
  attributeKey: CODE_HIGHLIGHT_ATTRIBUTE,
});

importHighlightJS();
