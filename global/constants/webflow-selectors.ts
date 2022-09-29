import { CMS_CSS_CLASSES, SLIDER_CSS_CLASSES, DROPDOWN_CSS_CLASSES, TABS_CSS_CLASSES } from '@finsweet/ts-utils';

import type { DOMSelector } from '$global/types/schema';

export const COLLECTION_LIST: DOMSelector = {
  label: 'Collection List',
  selectors: [`.${CMS_CSS_CLASSES.list}`, `.${CMS_CSS_CLASSES.wrapper}`],
};

export const COLLECTION_ITEM: DOMSelector = {
  label: 'Collection Item',
  selectors: [`.${CMS_CSS_CLASSES.item}`],
};

export const FORM: DOMSelector = {
  label: 'Form',
  selectors: ['form'],
};

export const FORM_BLOCK: DOMSelector = {
  label: 'Form Block',
  selectors: ['div.w-form'],
};

export const TEXT_ELEMENT: DOMSelector = {
  label: 'Text Element',
  selectors: ['p', 'span', 'div'],
};

export const DIV_BLOCK: DOMSelector = {
  label: 'Div Block',
  selectors: ['div', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'address', 'figure'],
};

export const BUTTON: DOMSelector = {
  label: 'Button',
  selectors: ['a.w-button'],
};

export const LINK_BLOCK: DOMSelector = {
  label: 'Link Block',
  selectors: ['a.w-inline-block'],
};

export const TEXT_LINK: DOMSelector = {
  label: 'Text Link',
  selectors: ['a'],
};

export const IMAGE: DOMSelector = {
  label: 'Image',
  selectors: ['img'],
};

export const TEXT_BLOCK: DOMSelector = {
  label: 'Text Block',
  selectors: ['div'],
};

export const HEADING_H1: DOMSelector = {
  label: 'Heading H1',
  selectors: ['h1'],
};

export const HEADING_H2_H6: DOMSelector = {
  label: 'Heading H2 to H6',
  selectors: ['h2', 'h3', 'h4', 'h5', 'h6'],
};

export const HEADING: DOMSelector = {
  label: 'Heading',
  selectors: [...HEADING_H1.selectors, ...HEADING_H2_H6.selectors],
};

export const PARAGRAPH: DOMSelector = {
  label: 'Paragraph',
  selectors: ['p'],
};

export const CHECKBOX_LABEL: DOMSelector = {
  label: 'Checkbox Label',
  selectors: ['label.w-checkbox span'],
};

export const CHECKBOX: DOMSelector = {
  label: 'Checkbox Input',
  selectors: ['label.w-checkbox input'],
};

export const ALL_INPUTS: DOMSelector = {
  label: 'Any Form Element',
  selectors: [
    'label.w-checkbox',
    'label.w-checkbox span',
    'label.w-checkbox input',
    'label.w-radio',
    'label.w-radio span',
    'label.w-radio input',
    'input',
    'textarea',
  ],
};

export const RADIO_LABEL: DOMSelector = {
  label: 'Radio Label',
  selectors: ['label.w-radio span'],
};

export const SELECT: DOMSelector = {
  label: 'Select',
  selectors: ['select.w-select'],
};

export const SELECT_OPTION: DOMSelector = {
  label: 'Select Option',
  selectors: ['select.w-select option'],
};
export const INPUT: DOMSelector = {
  label: 'Input',
  selectors: ['input'],
};

export const TEXT_INPUT_FIELD: DOMSelector = {
  label: 'Text Input Field',
  selectors: ['input.w-input'],
};

export const EMBED_CODE: DOMSelector = {
  label: 'Embed Code',
  selectors: ['div.w-embed'],
};

export const GIF: DOMSelector = {
  label: 'GIF',
  selectors: ['img'],
};

export const LOTTIE_ANIMATION: DOMSelector = {
  label: 'Lottie Animation',
  selectors: ['[data-animation-type="lottie"]'],
};

export const PAGINATION_WRAPPER: DOMSelector = {
  label: 'Pagination Wrapper',
  selectors: [`.${CMS_CSS_CLASSES.paginationWrapper}`],
};

export const SLIDER: DOMSelector = {
  label: 'Slider',
  selectors: [`.${SLIDER_CSS_CLASSES.slider}`],
};

export const SLIDER_NAV: DOMSelector = {
  label: 'Slider Nav',
  selectors: [`.${SLIDER_CSS_CLASSES.sliderNav}`],
};

export const DROPDOWN: DOMSelector = {
  label: 'Dropdown',
  selectors: [`.${DROPDOWN_CSS_CLASSES.dropdown}`],
};

export const DROPDOWN_ITEM: DOMSelector = {
  label: 'Dropdown Item',
  selectors: [`.${DROPDOWN_CSS_CLASSES.dropdown} a`],
};

export const TABS: DOMSelector = {
  label: 'Tabs',
  selectors: [`.${TABS_CSS_CLASSES.tabs}`],
};

export const SECTION: DOMSelector = {
  label: 'Section',
  selectors: [
    'div.wf-section',
    'header.wf-section',
    'footer.wf-section',
    'nav.wf-section',
    'main.wf-section',
    'section.wf-section',
    'article.wf-section',
    'aside.wf-section',
    'address.wf-section',
    'figure.wf-section',
  ],
};

export const LIST: DOMSelector = {
  label: 'List',
  selectors: ['ul'],
};

export const ANY_ELEMENT: DOMSelector = {
  label: 'Any element',
  selectors: ['*'],
};

export const PRE_CODE: DOMSelector = {
  label: 'Code block',
  selectors: ['pre code'],
};

export const PARENT_WRAPPER: DOMSelector = {
  ...ANY_ELEMENT,
  label: 'Parent Wrapper',
};

export const NAVBAR: DOMSelector = {
  label: 'Nav Bar',
  selectors: ['.w-nav'],
};

export const RICH_TEXT_BLOCK: DOMSelector = {
  label: 'Rich Text Block',
  selectors: ['.w-richtext'],
};

export const FORM_INPUT: DOMSelector = {
  label: 'Form Input',
  selectors: [...TEXT_INPUT_FIELD.selectors, ...SELECT.selectors, 'textarea'],
};

export const LIGHTBOX: DOMSelector = {
  label: 'Webflow Lightbox Component',
  selectors: ['.w-lightbox'],
};
