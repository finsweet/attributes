import type { CMSList } from '@finsweet/attributes-cmscore';
import type { TabsElement } from '@finsweet/attributes-utils';

export interface PopulateData {
  listInstances: CMSList[];
  tabsElement: TabsElement;
  instanceIndex?: string;
}
