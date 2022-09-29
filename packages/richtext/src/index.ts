import { RICH_TEXT_ATTRIBUTE } from '$global/constants/attributes';
import { assessScript, initAttributes } from '$global/factory';

import { version } from '../package.json';
import { init } from './init';

/**
 * Init
 */
initAttributes();

window.fsAttributes[RICH_TEXT_ATTRIBUTE] ||= {};

const attribute = window.fsAttributes[RICH_TEXT_ATTRIBUTE];
const { preventsLoad } = assessScript();

attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
