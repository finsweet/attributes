import type { CMSList } from '$packages/cmscore';

export interface CombineData {
  lists: CMSList[];
  target: CMSList;
  instanceIndex?: number;
}
