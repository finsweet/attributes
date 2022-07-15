import { initAttributes } from '@global/factory';

import { version } from '../package.json';
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
  testMode,
} = scriptAttributes;

const attribute = window.fsAttributes[ATTRIBUTE];

attribute.version = version;

if (preventsLoad) attribute.init = init(scriptAttributes);
else {
  window.Webflow ||= [];
  window.Webflow.push(init(scriptAttributes));
}

if (testMode) {
  const initFunction = window.fsAttributes['fs-shopify'].init;
  if (typeof initFunction === 'function') {
    initFunction();
  }
}
