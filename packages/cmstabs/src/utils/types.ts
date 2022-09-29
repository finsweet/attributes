import type { TabsElement } from '@finsweet/ts-utils';

import type { CMSList } from '$packages/cmscore';

export interface PopulateData {
  listInstances: CMSList[];
  tabsElement: TabsElement;
}
