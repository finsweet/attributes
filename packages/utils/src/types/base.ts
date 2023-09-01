/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as ATTRIBUTES from '../constants/attributes';

export type FsAttributeKey = (typeof ATTRIBUTES)[keyof typeof ATTRIBUTES];

export type AttributeElements = readonly string[];

export type AttributeSettings = {
  [name: string]: {
    key: string;
    values?: {
      [valueKey: string]: string;
    };
  };
};

export type FsAttributes = {
  /**
   * Run a callback (or multiple callbacks) after an Attribute has loaded.
   * @param args A {@link FsAttributesCallback} array.
   */
  push: (...args: FsAttributesCallback[]) => void;

  /**
   * Dynamically imports an Attribute solution.
   * @param solution
   * @returns A Promise that resolves once the Attribute has loaded.
   */
  import: (
    solution: FsAttributeKey,
    globalSettings?: {
      [k: string]: string;
    }
  ) => Promise<any> | undefined;

  /**
   * Destroys all Attributes instances.
   */
  destroy?: () => void;

  /**
   * Contains access to each Attribute solution.
   */
  solutions: {
    [key in FsAttributeKey]?: FsAttributeControls;
  };

  /**
   * Contains the Attributes that are currently running.
   */
  process: Set<FsAttributeKey>;
};

export type FsAttributesCallback = [FsAttributeKey, (value: any) => void];

export type FsAttributeControls<T = any> = {
  /**
   * Defines the Attribute version.
   */
  version?: string;

  /**
   * Resolves the Attribute loading Promise.
   */
  resolve?: (value: T) => void;

  /**
   * A promise that resolves once the Attribute has fully loaded and initted.
   */
  loading?: Promise<T>;

  /**
   * Restarts the Attribute.
   */
  restart?: FsAttributeInit;

  /**
   * Destroys the Attribute instance.
   */
  destroy?: () => void;
};

type AttributeInitResult =
  | {
      result?: any;
      destroy?: () => void;
    }
  | undefined;

export type FsAttributeInit<GlobalSettings extends AttributeSettings = AttributeSettings> = (settings?: {
  [Key in keyof GlobalSettings]?: string;
}) => AttributeInitResult | Promise<AttributeInitResult>;

/**
 * Window object.
 */
declare global {
  interface Window {
    fsAttributes: FsAttributes;
    FsAttributes: FsAttributes;
  }
}
