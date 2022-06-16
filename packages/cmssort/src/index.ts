import { importCMSCore } from '@finsweet/attributes-cmscore';
import { assessScript, initAttributes } from '@global/factory';
import { importAnimations } from '@global/import';

import { version } from '../package.json';
import { init } from './init';
import { ATTRIBUTE } from './utils/constants';

/**
 * Init
 */
initAttributes();
importCMSCore();
importAnimations();

window.fsAttributes[ATTRIBUTE] ||= {};

const { preventsLoad } = assessScript();
const attribute = window.fsAttributes[ATTRIBUTE];

attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
