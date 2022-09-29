import { CODE_HIGHLIGHT_ATTRIBUTE } from '$global/constants/attributes';
import { assessScript, initAttributes } from '$global/factory';

import { version } from '../package.json';
import { importHighlightJS } from './actions/import';
import { init } from './init';

/**
 * Init
 */
initAttributes();
importHighlightJS();

window.fsAttributes[CODE_HIGHLIGHT_ATTRIBUTE] ||= {};

const attribute = window.fsAttributes[CODE_HIGHLIGHT_ATTRIBUTE];
const { preventsLoad } = assessScript();

attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
