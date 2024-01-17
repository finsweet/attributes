import type { CMSList } from '@finsweet/attributes-cmscore';
import type { SliderElement } from '@finsweet/attributes-utils';

export interface PopulateData {
  listInstances: CMSList[];
  slider: SliderElement;
  instanceIndex?: string;
}
