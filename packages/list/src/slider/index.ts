import { ARIA_ROLE_KEY, SLIDER_CSS_CLASSES } from '@finsweet/attributes-utils';

import type { List, ListItem } from '../components';

/**
 * Inits the list sliders.
 * @param list
 * @param slidersReferences
 */
export const initListSliders = (list: List, slidersReferences: HTMLElement[]) => {
  list.webflowModules.add('slider');

  slidersReferences.forEach((sliderReference) => initListSlider(list, sliderReference));
};

/**
 * Inits a list slider.
 * @param list
 * @param sliderReference
 */
const initListSlider = (list: List, sliderReference: HTMLElement) => {
  const sliderElement = sliderReference.closest(`.${SLIDER_CSS_CLASSES.slider}`);
  if (!sliderElement) return;

  const sliderMask = sliderElement.querySelector(`.${SLIDER_CSS_CLASSES.sliderMask}`);
  if (!sliderMask) return;

  const existingSlides = sliderElement.querySelectorAll(`.${SLIDER_CSS_CLASSES.slide}`);
  if (!existingSlides.length) return;

  // Store the template CSS classes
  const slideCSS = existingSlides[0].classList.value;

  // Remove existing slides
  for (const slide of existingSlides) slide.remove();

  // Store rendered items
  const renderedItems = new Map<ListItem, HTMLDivElement>();

  list.addHook('render', (items = []) => {
    for (const item of items) {
      if (renderedItems.has(item)) continue;

      item.element.removeAttribute(ARIA_ROLE_KEY);

      const newSlide = document.createElement('div');
      newSlide.setAttribute('class', slideCSS);

      newSlide.appendChild(item.element);
      sliderMask.appendChild(newSlide);

      renderedItems.set(item, newSlide);
    }

    for (const [item, slide] of renderedItems) {
      if (items.includes(item)) continue;

      slide?.remove();
      renderedItems.delete(item);
    }
  });
};
