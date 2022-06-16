import { assessScript, initAttributes } from '@global/factory';

import { version } from '../package.json';
import { importHighlightJS } from './actions/import';
import { init } from './init';
import { ATTRIBUTE } from './utils/constants';

/**
 * Init
 */
initAttributes();
importHighlightJS();

window.fsAttributes[ATTRIBUTE] ||= {};

const attribute = window.fsAttributes[ATTRIBUTE];
const { preventsLoad } = assessScript();

attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
