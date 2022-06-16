import type { CMSList, CMSItem, createCMSListInstances, createCMSListInstance } from '..';

/**
 * `CMSList` Types
 */
export interface CMSListEvents {
  shouldnest: CMSItem[];
  shouldcollectprops: CMSItem[];
  shouldsort: CMSItem[];
  shouldfilter: undefined;

  renderitems: CMSItem[];
  additems: CMSItem[];

  switchpage: number;

  nestinitialitems: CMSItem[];

  finishload: undefined;
}

/**
 * `CMSItem` Types
 */
export interface CMSItemProps {
  [key: string]: {
    /**
     * Defines the prop values.
     */
    values: Set<string>;

    /**
     * Defines the elements that hold the prop values.
     * The Map is used as [propValue, element].
     */
    elements: Map<
      string,
      {
        /**
         * The prop element.
         */
        element: HTMLElement;

        /**
         * Stores the original outer HTML of the element before any mutations.
         */
        originalHTML: string;
      }
    >;

    /**
     * Defines filter values to highlight in a Map like:
     * ```
     * [propValue, data]
     * ```
     */
    highlightData?: Map<string, { filterValue?: string; highlightCSSClass: string }>;

    /**
     * Defines the type of the value.
     * @example `date` | `number`
     */
    type?: string | null;

    /**
     * Defines the mode of the prop.
     * @example `from` | `to`.
     */
    range?: string | null;
  };
}

/**
 * Dynamic Import type
 */
export interface CMSCore {
  version: string;
  CMSList: typeof CMSList;
  CMSItem: typeof CMSItem;
  createCMSListInstances: typeof createCMSListInstances;
  createCMSListInstance: typeof createCMSListInstance;
}

export type CMSCoreImport = Promise<CMSCore | undefined>;
