import type { SliderElement } from '@finsweet/ts-utils';

import type { CMSList } from '$packages/cmscore';

export interface PopulateData {
  listInstances: CMSList[];
  slider: SliderElement;
}
