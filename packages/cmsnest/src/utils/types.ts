import type { CMSList } from '@finsweet/attributes-cmscore';

interface NestSource {
  listInstance: CMSList;
  emptyElement: HTMLElement | null;
}

export type NestSources = Map<string, NestSource>;

export type NestTargets = Map<string, HTMLElement>;
