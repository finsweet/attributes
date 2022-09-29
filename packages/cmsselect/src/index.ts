import { CMS_SELECT_ATTRIBUTE } from '$global/constants/attributes';
import { assessScript, initAttributes } from '$global/factory';
import { importCMSCore } from '$packages/cmscore';

import { version } from '../package.json';
import { init } from './init';

/**
 * Init
 */
initAttributes();
importCMSCore();

window.fsAttributes[CMS_SELECT_ATTRIBUTE] ||= {};

const { preventsLoad } = assessScript();
const attribute = window.fsAttributes[CMS_SELECT_ATTRIBUTE];

attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
