/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as ATTRIBUTES from '../constants/attributes';

export type FinsweetAttributeKey = (typeof ATTRIBUTES)[keyof typeof ATTRIBUTES];

export type AttributeElements = readonly string[];

export type AttributeSettings = {
  [name: string]: {
    key: string;
    values?: {
      [valueKey: string]: string;
    };
  };
};

export type FinsweetAttributes = {
  /**
   * Run a callback (or multiple callbacks) after an Attribute has loaded.
   * @param args A {@link FinsweetAttributesCallback} array.
   */
  push: (...args: FinsweetAttributesCallback[]) => void;

  /**
   * Dynamically imports an Attribute solution.
   * @param attribute
   * @returns A Promise that resolves once the Attribute has loaded.
   */
  load: (attribute: FinsweetAttributeKey) => Promise<any> | undefined;

  /**
   * Destroys all Attributes instances.
   */
  destroy?: () => void;

  /**
   * Contains access to each Attribute solution.
   */
  solutions: {
    [key in FinsweetAttributeKey]?: FinsweetAttributeControls;
  };

  /**
   * Contains the Attributes that are currently running.
   */
  process: Set<FinsweetAttributeKey>;

  /**
   * Contains the script tags that define the Attributes library.
   * Can be multiple as the user might import the library multiple times.
   */
  scripts: HTMLScriptElement[];
};

export type FinsweetAttributesCallback = [FinsweetAttributeKey, (value: any) => void];

export type FinsweetAttributeControls<T = any> = {
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
  restart?: FinsweetAttributeInit;

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

export type FinsweetAttributeInit = () => AttributeInitResult | Promise<AttributeInitResult>;

/**
 * Window object.
 */
declare global {
  interface Window {
    finsweetAttributes: FinsweetAttributes;
    FinsweetAttributes: FinsweetAttributes;
  }
}
