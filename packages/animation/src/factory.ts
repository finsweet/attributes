import { animate, stagger as staggerDelay } from 'motion';

import type { AnimationFunctions, AnimationProps } from './types';

/**
 * Creates a new Animation.
 * @param props The animaiton props.
 * @returns A new `in` and `out` Animation functions.
 */
export const createAnimation = ({ initialStyles, keyframes }: AnimationProps): AnimationFunctions => {
  /**
   * Prepares the {@link animateIn} elements by setting the initial styles and rendering them to the DOM.
   * @param elements The elements to prepare.
   * @param options.target If defined, the element will be appended to the target.
   * @param options.insertAfter A child of the target. If defined, the element will be appended right after this anchor element.
   */
  const prepareIn: AnimationFunctions['prepareIn'] = (elements, options = {}) => {
    const { target, insertAfter, display = '' } = options;

    if (!Array.isArray(elements)) elements = [elements];

    for (const element of elements) {
      element.style.display = display;
      Object.assign(element.style, initialStyles);

      if (target && insertAfter !== undefined) {
        if (insertAfter) target.insertBefore(element, insertAfter.nextSibling);
        else target.prepend(element);
      } else if (target) target.appendChild(element);
    }
  };

  /**
   * In animation.
   * @param elements The elements to animate.
   * @param options.target If defined, the element will be appended to the target.
   * @param options.insertAfter A child of the target. If defined, the element will be appended right after this anchor element.
   * @param options.prepared Defines if the animation has been prepared beforehand, useful to avoid performing double preparation.
   * @param options.stagger If defined, the animation will be staggered using this time value.
   * @param options.animationOptions The main options of the animation. Reference: {@link [Motion One](https://motion.dev/dom/animate#options)}.
   * @returns An awaitable promise.
   */
  const animateIn: AnimationFunctions['animateIn'] = async (elements, options = {}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { prepared, stagger, display, ...animationOptions } = options;

    if (!prepared) prepareIn(elements, options);

    const { finished } = animate(elements, keyframes, {
      delay: stagger ? staggerDelay(stagger) : undefined,
      ...animationOptions,
    });

    return await finished;
  };

  /**
   * Out animation.
   * @param elements The elements to animate.
   * @param options.remove If defined, the element will be removed from the DOM after the animation ends.
   * @param options.stagger If defined, the animation will be staggered using this time value.
   * @param options.animationOptions The main options of the animation. Reference: {@link [Motion One](https://motion.dev/dom/animate#options)}.
   * @returns An awaitable promise.
   */
  const animateOut: AnimationFunctions['animateOut'] = async (elements, options = {}) => {
    const { remove, stagger, target, insertAfter, display = 'none', ...animationOptions } = options;

    if (!Array.isArray(elements)) elements = [elements];

    elements = elements.filter((element) => document.body.contains(element));

    const { finished } = animate(elements, keyframes, {
      ...animationOptions,
      delay: stagger ? staggerDelay(stagger) : undefined,
      direction: 'reverse',
    });

    await finished;

    for (const element of elements) {
      if (target && insertAfter !== undefined) {
        if (insertAfter) target.insertBefore(element, insertAfter.nextSibling);
        else target.prepend(element);
      } else if (target) target.appendChild(element);

      if (remove) element.remove();
      else element.style.display = display;
    }
  };

  return { prepareIn, animateIn, animateOut };
};
