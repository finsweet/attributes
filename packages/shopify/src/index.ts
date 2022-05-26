import { initAttributes } from '$global/factory/init';

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
initializeShopifyClient(scriptAttributes);

if (preventsLoad) attribute.init = init;
else {
  window.Webflow ||= [];
  window.Webflow.push(init);
}
