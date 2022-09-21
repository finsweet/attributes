import { assessScript, initAttributes } from '@global/factory';
import { CMS_ATTRIBUTE_ATTRIBUTE } from 'global/constants/attributes';

import { version } from '../package.json';
import { init } from './init';

/**
 * Init
 */
initAttributes();

window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE] ||= {};

const { preventsLoad } = assessScript();
const attribute = window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE];

attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
