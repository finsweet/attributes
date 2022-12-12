import { SHOPIFY_ATTRIBUTE } from '$global/constants/attributes';
import { initAttribute } from '$global/factory';

import { version } from '../package.json';
import { init } from './init';
import { ATTRIBUTES } from './utils/constants';

initAttribute({
  init,
  version,
  attributeKey: SHOPIFY_ATTRIBUTE,
  scriptAttributes: {
    token: ATTRIBUTES.token.key,
    domain: ATTRIBUTES.domain.key,
    productPage: ATTRIBUTES.productPage.key,
    collectionPage: ATTRIBUTES.collectionPage.key,
    redirectURL: ATTRIBUTES.redirectURL.key,
  },
});
