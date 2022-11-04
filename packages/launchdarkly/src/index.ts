import { LAUNCHDARKLY_ATTRIBUTE } from '$global/constants/attributes';
import { initAttribute } from '$global/factory';

import { version } from '../package.json';
import { init } from './init';
import { ATTRIBUTES } from './utils/constants';

initAttribute({
  init,
  version,
  attributeKey: LAUNCHDARKLY_ATTRIBUTE,
  scriptAttributes: {
    devClientId: ATTRIBUTES.devClientId.key,
    prodClientId: ATTRIBUTES.prodClientId.key,
    eventsToTrack: ATTRIBUTES.eventsToTrack.key,
  },
});
