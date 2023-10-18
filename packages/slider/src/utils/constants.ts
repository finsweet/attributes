import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines an Swiper elements.
   */
  'slider',
  'previous',
  'next',
  'bullet-cms',
  'progress-active',
  'pagination-wrapper',
  'bullet',
  'count-current',
  'count-total',
  'scrollbar',
  'scrollbar-wrapper',
  'popup',
  'progress',
  'progress-wrapper',
] as const satisfies AttributeElements;

export const SETTINGS = {
  //General
  autoheight: { key: 'autoheight', values: { true: 'true' } },
  slidesperview: { key: 'slidesperview' },
  slidespergroup: { key: 'slidespergroup' },
  initial: { key: 'initial' },
  loop: { key: 'loop', values: { true: 'true' } },
  draggable: { key: 'draggable', values: { true: 'true' } },
  scrollbar: { key: 'scrollbar', values: { true: 'true' } },
  centeredslides: { key: 'centeredslides' },
  slideclass: { key: 'slideclass' },
  nextslideclass: { key: 'nextslideclass' },
  prevslideclass: { key: 'prevslideclass' },
  disablednextprev: { key: 'disablednextprev' },
  activeslideclass: { key: 'activeslideclass' },
  speed: { key: 'speed' },
  direction: {
    key: 'direction',
    values: {
      horizontal: 'horizontal',
      vertical: 'vertical',
    },
  },

  //Autoplay
  autoplay: { key: 'autoplay', values: { true: 'true' } },
  autoplaydelay: { key: 'autoplaydelay' },
  autoplayinteraction: { key: 'autoplayinteraction', values: { true: 'true' } },
  pauseonhover: { key: 'pauseonhover', values: { true: 'true' } },

  //Pagination
  paginationtype: {
    key: 'paginationtype',
    values: {
      bullets: 'bullets',
      count: 'count',
      progressbar: 'progress',
    },
  },
  paginationclickable: { key: 'paginationclickable', values: { true: 'true' } },

  //Navigation
  bulletactive: { key: 'bulletactive' },
  cmsactive: { key: 'cmsactive' },

  //Breakpoints
  mobileportrait: { key: 'mobileportrait' },
  mobilelandscape: { key: 'mobilelandscape' },
  tablet: { key: 'tablet' },
  desktop: { key: 'desktop' },
  '1280': { key: '1280' },
  '1440': { key: '1440' },
  '1920': { key: '1920' },

  //Effects
  effect: {
    key: 'effect',
    values: {
      slide: 'slide',
      fade: 'fade',
      cube: 'cube',
      coverflow: 'coverflow',
      flip: 'flip',
      creative: 'creative',
      marquee: 'marquee',
    },
  },
  coverflowdepth: { key: 'coverflowdepth' },
  coverflowmodifier: { key: 'coverflowmodifier' },
  coverflowrotate: { key: 'coverflowrotate' },
  coverflowscale: { key: 'coverflowscale' },
  coverflowshadows: { key: 'coverflowshadows', values: { true: 'true' } },
  cubeshadow: { key: 'cubeshadow', values: { true: 'true' } },
  cubeoffset: { key: 'cubeoffset' },
  cubescale: { key: 'cubescale' },
  cardsoffset: { key: 'cardsoffset' },
  cardsrotate: { key: 'cardsrotate' },
  cardsshadows: { key: 'cardsshadows' },
  fliplimit: { key: 'fliplimit', values: { true: 'true' } },
  flipshadows: { key: 'flipshadows', values: { true: 'true' } },
} as const satisfies AttributeSettings;
