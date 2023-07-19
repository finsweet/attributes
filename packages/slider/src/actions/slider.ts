import { createCMSListInstance } from '@finsweet/attributes-cmscore';
import { getCollectionElements } from '@finsweet/attributes-utils';
import Swiper from 'swiper';
import {
  Autoplay,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFade,
  EffectFlip,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from 'swiper/modules';
import type { PaginationOptions } from 'swiper/types/modules/pagination';
import type { SwiperOptions } from 'swiper/types/swiper-options';

import {
  getAttribute,
  getBreakpointParams,
  getInstanceIndex,
  getPaginationActiveThumbClass,
  getPaginationBulletClass,
  queryAllElements,
  queryElement,
  swiperInstancesStore,
  transformPaginationType,
} from '../utils';

export const initSlider = (sliderElement: HTMLElement) => {
  if (swiperInstancesStore.get(sliderElement)) return;

  const instanceIndex = getInstanceIndex(sliderElement);
  const sliderWrapperElement = sliderElement.firstElementChild;
  const sliderItemElement = sliderWrapperElement?.firstElementChild || sliderElement;

  //Navigation
  const prevButton = queryElement('previous', { instanceIndex });
  const nextButton = queryElement('next', { instanceIndex });

  //General
  const centeredSlides = getAttribute(sliderItemElement, 'centeredslides');
  const autoHeight = getAttribute(sliderItemElement, 'autoheight');
  const loop = getAttribute(sliderItemElement, 'loop');
  const draggable = getAttribute(sliderItemElement, 'draggable');
  const scrollbar = getAttribute(sliderItemElement, 'scrollbar');
  const direction = getAttribute(sliderItemElement, 'direction') as 'horizontal' | 'vertical';
  const nextSlideClass = getAttribute(sliderItemElement, 'nextslideclass');
  const prevSlideClass = getAttribute(sliderItemElement, 'prevslideclass');
  const activeSlideClass = getAttribute(sliderItemElement, 'activeslideclass');
  const disableSlideClass = getAttribute(sliderItemElement, 'disablednextprev');

  //Pagination
  const paginationWrapper = queryElement('pagination-wrapper', { instanceIndex });
  const activeProgressBar = queryElement('progress-active', { instanceIndex });
  const bulletElement = queryElement('bullet', { instanceIndex });
  const thumbElement = queryElement('bullet-cms', { instanceIndex });
  const paginationType = getAttribute(sliderElement, 'paginationtype') || 'bullets';
  const paginationClickable = getAttribute(sliderElement, 'paginationclickable');
  const activeBulletClass = getAttribute(sliderItemElement, 'bulletactive');

  //Autoplay
  const autoPlay = getAttribute(sliderItemElement, 'autoplay');
  const autoPlayDelay = getAttribute(sliderItemElement, 'autoplaydelay');
  const autoPlayInteraction = getAttribute(sliderItemElement, 'autoplayinteraction');
  const pauseOnHover = getAttribute(sliderItemElement, 'pauseonhover');
  const speed = getAttribute(sliderItemElement, 'speed');

  //Breakpoints
  const mobilePortrait = getAttribute(sliderItemElement || sliderElement, 'mobileportrait');
  const mobileLandscape = getAttribute(sliderItemElement || sliderElement, 'mobilelandscape');
  const tablet = getAttribute(sliderItemElement || sliderElement, 'tablet');
  const desktop = getAttribute(sliderItemElement || sliderElement, 'desktop');
  const mdsize = getAttribute(sliderItemElement || sliderElement, '1280');
  const lgsize = getAttribute(sliderItemElement || sliderElement, '1440');
  const xlsize = getAttribute(sliderItemElement || sliderElement, '1920');
  const mobilePortraitParams = getBreakpointParams(mobilePortrait);
  const mobileLandscapeParams = getBreakpointParams(mobileLandscape);
  const tabletParams = getBreakpointParams(tablet);
  const desktopParams = getBreakpointParams(desktop);
  const mdParams = getBreakpointParams(mdsize);
  const lgParams = getBreakpointParams(lgsize);
  const xlParams = getBreakpointParams(xlsize);

  //Lightbox
  const lightBoxPopups = queryAllElements('popup', { instanceIndex });

  //Scrollbar
  const scrollbarElement = queryElement('scrollbar', { instanceIndex });

  //Effects
  const effect = getAttribute(sliderElement, 'effect') || undefined;
  const coverflowDepth = getAttribute(sliderElement, 'coverflowdepth');
  const coverflowModifier = getAttribute(sliderElement, 'coverflowmodifier');
  const coverflowRotate = getAttribute(sliderElement, 'coverflowrotate');
  const coverflowScale = getAttribute(sliderElement, 'coverflowscale');
  const coverflowShadows = getAttribute(sliderElement, 'coverflowshadows');
  const flipLimit = getAttribute(sliderElement, 'fliplimit');
  const flipShadows = getAttribute(sliderElement, 'flipshadows');
  const cubeShadow = getAttribute(sliderElement, 'cubeshadow');
  const cubeOffset = getAttribute(sliderElement, 'cubeoffset');
  const cubeScale = getAttribute(sliderElement, 'cubescale');
  const cardsOffset = getAttribute(sliderElement, 'cardsoffset');
  const cardsRotate = getAttribute(sliderElement, 'cardsrotate');
  const cardsShadows = getAttribute(sliderElement, 'cardsshadows');

  const breakpointsOptions = {} as { [width: number]: SwiperOptions };

  if (mobilePortraitParams)
    breakpointsOptions['300'] = {
      slidesPerView: mobilePortraitParams.slidesPerView,
      slidesPerGroup: mobilePortraitParams.slidesPerGroup,
      spaceBetween: mobilePortraitParams.spaceBetween,
    };

  if (mobileLandscapeParams)
    breakpointsOptions['480'] = {
      slidesPerView: mobileLandscapeParams.slidesPerView,
      slidesPerGroup: mobileLandscapeParams.slidesPerGroup,
      spaceBetween: mobileLandscapeParams.spaceBetween,
    };

  if (tabletParams)
    breakpointsOptions['767'] = {
      slidesPerView: tabletParams.slidesPerView,
      slidesPerGroup: tabletParams.slidesPerGroup,
      spaceBetween: tabletParams.spaceBetween,
    };

  if (desktopParams)
    breakpointsOptions['960'] = {
      slidesPerView: desktopParams.slidesPerView,
      slidesPerGroup: desktopParams.slidesPerGroup,
      spaceBetween: desktopParams.spaceBetween,
    };

  if (mdParams)
    breakpointsOptions['1280'] = {
      slidesPerView: mdParams.slidesPerView,
      slidesPerGroup: mdParams.slidesPerGroup,
      spaceBetween: mdParams.spaceBetween,
    };

  if (lgParams)
    breakpointsOptions['1440'] = {
      slidesPerView: lgParams.slidesPerView,
      slidesPerGroup: lgParams.slidesPerGroup,
      spaceBetween: lgParams.spaceBetween,
    };

  if (xlParams)
    breakpointsOptions['1920'] = {
      slidesPerView: xlParams.slidesPerView,
      slidesPerGroup: xlParams.slidesPerGroup,
      spaceBetween: xlParams.spaceBetween,
    };

  const paginationOptions: PaginationOptions = {
    el: paginationWrapper,
    type: transformPaginationType(paginationType),
    bulletClass: getPaginationBulletClass(bulletElement || thumbElement),
    bulletActiveClass: activeBulletClass,
    clickable: !!paginationClickable || true,
    renderFraction: (currentClass: string, totalClass: string) => {
      if (!paginationWrapper) return '';
      const current = queryElement('pagination-current', { scope: paginationWrapper });
      const total = queryElement('pagination-total', { scope: paginationWrapper });
      current?.classList.add(currentClass);
      total?.classList.add(totalClass);
      return paginationWrapper.innerHTML;
    },
    progressbarFillClass: activeProgressBar?.className,
    renderProgressbar() {
      if (!activeProgressBar) return '';
      activeProgressBar.style.transformOrigin = 'left top';
      activeProgressBar.style.width = '100%';
      return activeProgressBar.outerHTML;
    },
  };

  const scrollOptions = {
    el: scrollbarElement,
    draggable: true,
  };

  const initThumbnailSwiper = () => {
    if (!paginationWrapper || !paginationWrapper.parentNode || paginationType !== 'thumbs') return;
    return new Swiper(paginationWrapper.parentNode as HTMLElement, {
      wrapperClass: paginationWrapper?.className,
      slideClass: paginationWrapper?.firstElementChild?.classList[0],
      slidesPerView: 'auto',
    });
  };

  const movePopupWithSlider = () => {
    if (lightBoxPopups) {
      const activePopup = sliderElement.querySelector<HTMLElement>('[fs-slider-element="popup"][style*="opacity: 1"]');
      if (!activePopup) return;
      activePopup.style.transition = 'transform 0.3s ease';
      activePopup.style.transform = `translateX(${sliderInstance.translate * -1}px)`;
    }
  };

  const observer = new MutationObserver((mutationsList) => {
    const updatedElements = new WeakMap<HTMLElement, boolean>();

    mutationsList.forEach((mutation) => {
      if (mutation.attributeName === 'style') {
        const targetElement = mutation.target as HTMLElement;

        if (!updatedElements.has(targetElement)) {
          updatedElements.set(targetElement, true);
          targetElement.style.transform = `translateX(${sliderInstance.translate * -1}px)`;
          updatedElements.delete(targetElement);
        }
      }
    });
  });

  lightBoxPopups.forEach(function (element) {
    observer.observe(element, { attributes: true });
  });

  const generalOptions: SwiperOptions = {
    modules: [
      Pagination,
      Navigation,
      Autoplay,
      Scrollbar,
      EffectFade,
      EffectCards,
      EffectFlip,
      EffectCube,
      EffectCoverflow,
      EffectCreative,
      Thumbs,
    ],
    wrapperClass: sliderWrapperElement?.className,
    slideClass: sliderItemElement?.classList[0],
    autoHeight: !!autoHeight,
    loop: effect === 'marquee' ? true : !!loop,
    speed: effect === 'marquee' ? 10000 : Number(speed) || 300,
    direction: direction || 'horizontal',
    simulateTouch: !!draggable,
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    breakpoints: breakpointsOptions,
    centeredSlides: !!centeredSlides,
    pagination: paginationWrapper ? paginationOptions : false,
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    scrollbar: scrollbar ? scrollOptions : false,
    effect: effect,
    fadeEffect: {
      crossFade: true,
    },
    coverflowEffect: {
      depth: Number(coverflowDepth),
      modifier: Number(coverflowModifier),
      rotate: Number(coverflowRotate),
      scale: Number(coverflowScale),
      slideShadows: !!coverflowShadows,
    },
    flipEffect: {
      limitRotation: !!flipLimit,
      slideShadows: !!flipShadows,
    },
    cubeEffect: {
      shadow: !!cubeShadow,
      slideShadows: !!cubeOffset,
      shadowScale: Number(cubeScale),
    },
    cardsEffect: {
      perSlideOffset: Number(cardsOffset),
      perSlideRotate: Number(cardsRotate),
      slideShadows: !!cardsShadows,
    },
    autoplay:
      effect === 'marquee'
        ? { delay: 0, disableOnInteraction: false }
        : autoPlay
        ? {
            delay: Number(autoPlayDelay || 300),
            disableOnInteraction: !!autoPlayInteraction,
            pauseOnMouseEnter: !!pauseOnHover,
          }
        : false,
    thumbs: {
      swiper: initThumbnailSwiper(),
      slideThumbActiveClass: getPaginationActiveThumbClass(thumbElement) || 'fs-is-active',
    },
    containerModifierClass: 'fs-',
    slideNextClass: nextSlideClass,
    slidePrevClass: prevSlideClass,
    slideActiveClass: activeSlideClass,
    noSwipingClass: disableSlideClass,
  };

  const sliderInstance = new Swiper(sliderElement, generalOptions);
  swiperInstancesStore.set(sliderElement, sliderInstance);

  // Update the popup position when the slider is moved
  sliderInstance.on('slideChange', movePopupWithSlider);

  //CMS support
  const collectionWrapper = getCollectionElements(sliderElement, 'wrapper');
  if (collectionWrapper) {
    const cmsListInstance = createCMSListInstance(collectionWrapper);
    cmsListInstance?.on('renderitems', () => sliderInstance.update());
  }

  return sliderInstance;
};
