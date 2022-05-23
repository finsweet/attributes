import { assessScript } from '$global/factory/assess';
import { initAttributes } from '$global/factory/init';

import { version } from '../package.json';
import { init } from './init';
import { ATTRIBUTE } from './utils/constants';

/**
 * Init
 */
initAttributes();

window.fsAttributes[ATTRIBUTE] ||= {};

const { preventsLoad } = assessScript();
const attribute = window.fsAttributes[ATTRIBUTE];

attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
