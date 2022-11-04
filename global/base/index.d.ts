/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CollectionListWrapperElement } from '@finsweet/ts-utils';

import type { createImportURL } from '$global/import';
import type { AnimationImport } from '$packages/animation/src/types';
import type { CMSList } from '$packages/cmscore';
import type { CMSCoreImport } from '$packages/cmscore/src/utils/types';
import type { CMSFilters } from '$packages/cmsfilter/src/components/CMSFilters';

type FsAttributesCallback =
  | [
      'cmsload' | 'cmsnest' | 'cmscombine' | 'cmsprevnext' | 'cmsslider' | 'cmssort' | 'cmstabs',
      (value: CMSList[]) => void
    ]
  | ['cmsfilter', (value: CMSFilters[]) => void]
  | [string, (value: any) => void];

type FsAttributesBase = {
  /**
   * Run a callback (or multiple callbacks) after an Attribute has loaded.
   * @param args A {@link FsAttributesCallback} array.
   */
  push: (...args: FsAttributesCallback[]) => void;

  /**
   * Dynamically import an Attribute to the page.
   * @param attributeKey
   * @param version
   */
  import: (...args: Parameters<typeof createImportURL>) => Promise<FsAttributeControls>;

  /**
   * Destroys all Attributes instances.
   */
  destroy?: () => void;

  // TODO: Remove this after cmscore@1.9.0 has rolled out
  cms?: {
    coreVersion?: string;
    coreImport?: CMSCoreImport;
    listElements?: CollectionListWrapperElement[];
    listInstances?: CMSList[];
    filtersInstances?: CMSFilters[];
  };
};

interface FsAttributeControls<T = any> {
  /**
   * Defines the Attribute version.
   */
  version?: string;

  /**
   * Inits the Attribute.
   */
  init?: (...args: any[]) => T | Promise<T>;

  /**
   * A promise that resolves once the Attribute has fully loaded and initted.
   */
  loading?: Promise<T>;

  /**
   * Resolves the Attribute loading Promise.
   */
  resolve?: (value: T) => void;

  /**
   * Destroys the Attribute instance.
   */
  destroy?: () => void;
}

type FsAttributesControls = {
  cmscore?: {
    version?: string;
    import?: CMSCoreImport;
    listInstances?: Map<CollectionListWrapperElement, CMSList>;
  };

  animation?: FsAttributeControls & {
    import?: AnimationImport;
  };

  support?: {
    import?: Promise<boolean>;
  };

  [key: string]: FsAttributeControls;
};

export type FsAttributes = FsAttributesBase & FsAttributesControls;

/**
 * Window object.
 */
declare global {
  interface Window {
    fsAttributes: FsAttributes;
    FsAttributes: FsAttributes;
  }
}
