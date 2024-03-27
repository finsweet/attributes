/**
 * Library declaration
 */
declare global {
  interface Window {
    Webflow?: Webflow | Callback[];
  }
}

/**
 * Callback type for the Webflow.push() method.
 */
type Callback = (value?: unknown) => unknown;

export type WebflowModule = 'ix2' | 'commerce' | 'lottie' | 'lightbox' | 'slider' | 'tabs';

interface WebflowCommerce {
  destroy: () => void;
  init: (params: { siteId: string; apiUrl: string }) => void;
}

interface WebflowLightbox {
  preview: () => void;
  design: () => void;
  ready: () => void;
}

interface WebflowSlider {
  preview: () => void;
  design: () => void;
  ready: () => void;
  destroy: () => void;
  redraw: () => void;
}

type WebflowTabs = WebflowSlider;

interface WebflowIx2 {
  destroy: () => void;
  init: () => void;
  actions: {
    [key: string]: (...params: unknown[]) => unknown;
  };
  store: {
    dispatch: (param: unknown) => void;
    getState: () => {
      ixData: {
        actionLists: unknown;
        eventTypeMap: unknown;
        events: unknown;
        mediaQueries: unknown;
        mediaQueryKeys: unknown;
      };
      ixElements: {
        [key: string]: unknown;
      };
      ixInstances: {
        [key: string]: unknown;
      };
      ixRequest: {
        [key: string]: unknown;
      };
      ixSession: {
        eventState: {
          [key: string]: unknown;
        };
        [key: string]: unknown;
      };
    };
  };
}

/**
 * Includes methods of the Webflow.js object
 */
export interface Webflow extends Pick<Callback[], 'push'> {
  destroy: () => void;
  ready: () => void;
  env: () => boolean;
  require: <Key extends WebflowModule>(
    key: Key
  ) =>
    | (Key extends 'commerce'
        ? WebflowCommerce
        : Key extends 'lightbox'
        ? WebflowLightbox
        : Key extends 'slider'
        ? WebflowSlider
        : Key extends 'tabs'
        ? WebflowTabs
        : WebflowIx2)
    | undefined;
}

/**
 * CMS
 */
export type CollectionListWrapperElement = HTMLDivElement;
export type CollectionListElement = HTMLDivElement;
export type CollectionItemElement = HTMLDivElement;
export type CollectionEmptyElement = HTMLDivElement;
export type PaginationWrapperElement = HTMLDivElement;
export type PaginationButtonElement = HTMLAnchorElement;
export type PageCountElement = HTMLDivElement;

/**
 * Forms
 */
export type FormBlockElement = HTMLDivElement;
export type FormSuccessElement = HTMLDivElement;
export type FormErrorElement = HTMLDivElement;

/**
 * Sliders
 */
export type SliderElement = HTMLDivElement;
export type SliderMaskElement = HTMLDivElement;
export type SlideElement = HTMLDivElement;
export type SliderArrowElement = HTMLDivElement;
export type SliderNavElement = HTMLDivElement;
export type SliderDotElement = HTMLDivElement;

/**
 * Tabs
 */
export type TabsElement = HTMLDivElement;
export type TabsMenuElement = HTMLDivElement;
export type TabLinkElement = HTMLLinkElement;
export type TabsContentElement = HTMLDivElement;
export type TabPaneElement = HTMLDivElement;

/**
 * Rich Text Block
 */
export type RichTextBlockElement = HTMLDivElement;

/**
 * Dropdowns
 */
export type DropdownElement = HTMLDivElement;
export type DropdownToggle = HTMLDivElement;
export type DropdownList = HTMLElement;

/**
 * The default Webflow Breakpoint names.
 */
export type WebflowBreakpoint = 'main' | 'medium' | 'small' | 'tiny';
