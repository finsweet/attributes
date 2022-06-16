import type { CMSList } from '@finsweet/attributes-cmscore';

export interface CombineData {
  lists: CMSList[];
  target: CMSList;
  instanceIndex?: number;
}
