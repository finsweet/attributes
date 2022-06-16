import type { AnimationImport } from '@finsweet/attributes-animation/src/types';
import type { CMSList } from '@finsweet/attributes-cmscore';
import type { CMSCoreImport } from '@finsweet/attributes-cmscore/src/utils/types';
import type { CMSFilters } from '@finsweet/attributes-cmsfilter/src/components/CMSFilters';
import type { CollectionListWrapperElement } from '@finsweet/ts-utils';

type FsAttributesCallback =
  | [
      'cmsload' | 'cmsnest' | 'cmscombine' | 'cmsprevnext' | 'cmsslider' | 'cmssort' | 'cmstabs',
      (value: CMSList[]) => void
    ]
  | ['cmsfilter', (value: CMSFilters[]) => void];

type FsAttributesBase = {
  animationImport?: AnimationImport;
  supportImport?: Promise<boolean>;

  push: (...args: FsAttributesCallback[]) => void;

  cms: {
    coreVersion?: string;
    coreImport?: CMSCoreImport;
    listElements?: CollectionListWrapperElement[];
    listInstances?: CMSList[];
    filtersInstances?: CMSFilters[];
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FsAttributeInit<T = any> {
  version?: string;
  init?: () => T | Promise<T>;
  loading?: Promise<T>;
  resolve?: (value: T) => void;
}

type FsAttributesInit = {
  [key: string]: FsAttributeInit;
};

export type FsAttributes = FsAttributesBase & FsAttributesInit;

/**
 * Window object.
 */
declare global {
  interface Window {
    fsAttributes: FsAttributes;
    FsAttributes: FsAttributes;
  }
}
