import { COPY_CLIP_ATTRIBUTE } from '$global/constants/attributes';
import { assessScript } from '$global/factory/assess';
import { initAttributes } from '$global/factory/init';

import { version } from '../package.json';
import { init } from './init';

/**
 * Init
 */
initAttributes();

window.fsAttributes[COPY_CLIP_ATTRIBUTE] ||= {};

const { preventsLoad } = assessScript();
const attribute = window.fsAttributes[COPY_CLIP_ATTRIBUTE];

attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
