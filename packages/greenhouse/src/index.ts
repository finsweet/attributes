import { assessScript, initAttributes } from '@global/factory';
import { GREENHOUSE_ATTRIBUTE } from 'global/constants/attributes';

import { version } from '../package.json';
import { init } from './init';
import { ATTRIBUTES } from './utils/constants';

/**
 * Init
 */

initAttributes();

window.fsAttributes[GREENHOUSE_ATTRIBUTE] ||= {};

const { preventsLoad, attributes } = assessScript({
  board: ATTRIBUTES.board.key,
  queryParam: ATTRIBUTES.queryparam.key,
});

const attribute = window.fsAttributes[GREENHOUSE_ATTRIBUTE];
attribute.version = version;

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(() => init(attributes));
}
