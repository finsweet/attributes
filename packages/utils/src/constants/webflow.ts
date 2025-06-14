import type { WebflowBreakpoint } from '../types';

export const WEBFLOW_ASSETS_CDN_ORIGIN = 'https://cdn.prod.website-files.com';

export const CURRENT_CSS_CLASS = 'w--current';

export const RICH_TEXT_BLOCK_CSS_CLASS = 'w-richtext';

export const HTML_EMBED_CSS_CLASS = 'w-embed';

export const SLIDER_CSS_CLASSES = {
  slider: 'w-slider',
  slide: 'w-slide',
  sliderMask: 'w-slider-mask',
  sliderNav: 'w-slider-nav',
  sliderDot: 'w-slider-dot',
  activeSliderDot: 'w-active',
} as const;

export const TABS_CSS_CLASSES = {
  tabs: 'w-tabs',
  tabsContent: 'w-tab-content',
  tabPane: 'w-tab-pane',
  tabsMenu: 'w-tab-menu',
  tabLink: 'w-tab-link',
  activeTab: 'w--tab-active',
} as const;

export const NAVBAR_CSS_CLASSES = {
  navMenu: 'w-nav-menu',
} as const;

export const CMS_CSS_CLASSES = {
  wrapper: 'w-dyn-list',
  list: 'w-dyn-items',
  item: 'w-dyn-item',
  paginationWrapper: 'w-pagination-wrapper',
  paginationNext: 'w-pagination-next',
  paginationPrevious: 'w-pagination-previous',
  pageCount: 'w-page-count',
  emptyState: 'w-dyn-empty',
} as const;

export const FORM_CSS_CLASSES = {
  formBlock: 'w-form',
  checkboxField: 'w-checkbox',
  checkboxInput: 'w-checkbox-input',
  radioField: 'w-radio',
  radioInput: 'w-radio-input',
  checkboxOrRadioLabel: 'w-form-label',
  checkboxOrRadioFocus: 'w--redirected-focus',
  checkboxOrRadioChecked: 'w--redirected-checked',
  successMessage: 'w-form-done',
  errorMessage: 'w-form-fail',
} as const;

export const DROPDOWN_CSS_CLASSES = {
  dropdown: 'w-dropdown',
  dropdownToggle: 'w-dropdown-toggle',
  dropdownList: 'w-dropdown-list',
} as const;

export const COMMERCE_CSS_CLASSES = {
  addToCartForm: 'w-commerce-commerceaddtocartform',
} as const;

export const LIGHTBOX_CSS_CLASSES = {
  trigger: 'w-lightbox',
} as const;

export const WEBFLOW_BREAKPOINTS: Map<WebflowBreakpoint, string> = new Map([
  ['tiny', '(max-width: 479px)'],
  ['small', '(max-width: 767px)'],
  ['medium', '(max-width: 991px)'],
  ['main', '(min-width: 992px)'],
]);
