import { importCMSCore } from '@finsweet/attributes-cmscore';
import { CMS_NEST_ATTRIBUTE } from '@global/constants/attributes';
import { assessScript, initAttributes } from '@global/factory';

import { version } from '../package.json';
import { init } from './init';

/**
 * Init
 */
initAttributes();
importCMSCore();

window.fsAttributes[CMS_NEST_ATTRIBUTE] ||= {};

const { preventsLoad } = assessScript();
const attribute = window.fsAttributes[CMS_NEST_ATTRIBUTE];

attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
