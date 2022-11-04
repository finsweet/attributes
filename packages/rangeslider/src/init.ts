import { addListener, getHiddenParent, isNotEmpty, isVisible, noop } from '@finsweet/ts-utils';
import debounce from 'just-debounce';

import { CMS_ATTRIBUTE_ATTRIBUTE, RANGE_SLIDER_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { adjustValueToStep } from '$global/helpers';

import { getClientX } from './actions/events';
import { getSettings } from './actions/settings';
import { getClosestValidHandle } from './actions/values';
import type { Handle } from './components/Handle';
import { createFillInstance, createHandleInstances } from './factory';
import { getSelector } from './utils/constants';
import type { HandleInstances } from './utils/types';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<HandleInstances[]> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const wrapperElements = [
    ...document.querySelectorAll<HTMLElement>(getSelector('element', 'wrapper', { operator: 'prefixed' })),
  ];

  const rangeSlidersData = wrapperElements.map(initRangeSlider).filter(isNotEmpty);

  const handleInstances = rangeSlidersData.map(({ handles }) => handles);

  return finalizeAttribute(RANGE_SLIDER_ATTRIBUTE, handleInstances, () => {
    for (const { destroy } of rangeSlidersData) destroy();
  });
};

/**
 * Inits a range slider.
 * @param wrapperElement The wrapper element.
 * @returns The {@link HandleInstances}.
 */
const initRangeSlider = (wrapperElement: HTMLElement) => {
  const settings = getSettings(wrapperElement);
  if (!settings) return;

  const handles = createHandleInstances(settings);
  if (!handles) return;

  createFillInstance(settings, handles);

  const { maxRange, minRange, step, precision, totalRange, trackElement, updateOnRelease } = settings;

  let { trackWidth, trackLeft, trackRight } = settings;
  let focusedHandle: Handle | undefined;
  let focusedHandleHasUpdated = false;

  /**
   * Calculates the value based on where the user clicked and adjusts it to the step increment,
   * @param clientX The event `clientX` value.
   */
  const calculateNewValue = (clientX: number) => {
    const value = minRange + ((clientX - trackLeft) * totalRange) / trackWidth;

    const adjustedValue = adjustValueToStep(value, step, precision, minRange);

    return adjustedValue;
  };

  /**
   * Handles when the user moves the cursor/finger while holding down a {@link Handle}.
   * @param e A `mousemove` or `touchmove` event.
   */
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!focusedHandle) return;

    if (e instanceof MouseEvent) e.preventDefault();

    const clientX = getClientX(e);
    const [minValue, maxValue] = focusedHandle.getConstraints();

    let value: number;

    if (trackLeft > clientX) value = minValue;
    else if (trackRight < clientX) value = maxValue;
    else value = calculateNewValue(clientX);

    const hasUpdatedValue = focusedHandle.setValue(value, !updateOnRelease);

    focusedHandleHasUpdated ||= hasUpdatedValue;
  };

  /**
   * Handles when the user releases the currently focused {@link Handle}.
   * @param e A `mouseup` or `touchend` event.
   */
  const handleMouseUp = (e: MouseEvent | TouchEvent) => {
    if (e.cancelable) e.preventDefault();

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchend', handleMouseUp);

    if (updateOnRelease && focusedHandleHasUpdated) focusedHandle?.updateInputElement();

    focusedHandleHasUpdated = false;

    focusedHandle?.element.blur();
    focusedHandle = undefined;
  };

  /**
   * Handles when the user holds down a {@link Handle}.
   * @param e A `mousedown` or `touchstart` event.
   */
  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    if (e.cancelable) e.preventDefault();

    const clientX = getClientX(e);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleMouseMove, { passive: true });
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    let value: number;

    if (trackLeft > clientX) value = minRange;
    else if (trackRight < clientX) value = maxRange;
    else value = calculateNewValue(clientX);

    const closestHandle = getClosestValidHandle(value, handles);
    if (!closestHandle) return;

    closestHandle.element.focus();

    focusedHandle = closestHandle;

    const hasUpdatedValue = closestHandle.setValue(value, !updateOnRelease);

    focusedHandleHasUpdated ||= hasUpdatedValue;
  };

  /**
   * Updates the stored `trackWidth` value and the Handles' position.
   */
  const handleDOMMutation = () => {
    trackWidth = trackElement.clientWidth;

    ({ left: trackLeft, right: trackRight } = trackElement.getBoundingClientRect());

    for (const handle of handles) {
      if (handle) handle.updateTrackWidth(trackWidth);
    }
  };

  /**
   * If the wrapper is initially hidden, observes mutations and performs the needed actions.
   */
  const observeWrapperVisibility = () => {
    const hiddenParent = getHiddenParent(wrapperElement);
    if (!hiddenParent) return noop;

    const observer = new MutationObserver(() => {
      if (isVisible(hiddenParent)) handleDOMMutation();
    });

    observer.observe(hiddenParent, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => observer.disconnect();
  };

  /**
   * Init events
   */
  const cleanups = [
    observeWrapperVisibility(),
    addListener(trackElement, 'mousedown', handleMouseDown),
    addListener(trackElement, 'touchstart', handleMouseDown, { passive: true }),
    addListener(window, 'resize', debounce(handleDOMMutation, 50)),
  ];

  return {
    handles,
    destroy: () => {
      for (const cleanup of cleanups) cleanup();
    },
  };
};
