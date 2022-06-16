import { initAttributes } from '@global/factory';

import { version } from '../package.json';
import { initializeShopifyClient } from './actions/shopifyClient';
import { assessScriptAttributes, init } from './init';
import { ATTRIBUTE } from './utils/constants';

/**
 * Init
 */
initAttributes();

window.fsAttributes[ATTRIBUTE] ||= {};

const scriptAttributes = assessScriptAttributes();
const {
  globalAttributeParams: { preventsLoad },
} = scriptAttributes;

const attribute = window.fsAttributes[ATTRIBUTE];

attribute.version = version;

if (preventsLoad) attribute.init = init(scriptAttributes);
else {
  window.Webflow ||= [];
  window.Webflow.push(init(scriptAttributes));
}
