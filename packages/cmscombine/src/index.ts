import { importCMSCore } from '@finsweet/attributes-cmscore';
import { assessScript, initAttributes } from '@global/factory';

import { version } from '../package.json';
import { ATTRIBUTE } from './constants';
import { init } from './init';

/**
 * Init
 */
initAttributes();
importCMSCore();

window.fsAttributes[ATTRIBUTE] ||= {};

const { preventsLoad } = assessScript();
const attribute = window.fsAttributes[ATTRIBUTE];

attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
