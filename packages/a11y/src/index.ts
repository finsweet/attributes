import { assessScript, initAttributes } from '@global/factory';
import { A11Y_ATTRIBUTE } from 'global/constants/attributes';

import { version } from '../package.json';
import { init } from './init';

/**
 * Init
 */
initAttributes();

window.fsAttributes[A11Y_ATTRIBUTE] ||= {};

const { preventsLoad } = assessScript();
const attribute = window.fsAttributes[A11Y_ATTRIBUTE];

attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
