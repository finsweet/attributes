import throttle from 'just-throttle';

/**
 * Observes an element intersecting on the page.
 * @param numberElement The element to observe.
 * @param threshold The threshold, on a 0-100 scale.
 * @param callback Runs when the intersection is valid.
 *
 * @returns A cleanup callback.
 */
export const observeIntersection = (numberElement: Element, threshold: number, callback: () => void) => {
  const checkValidity = (top: number) => {
    const valid = window.innerHeight * (1 - threshold / 100) - top >= 0;
    if (valid) {
      cleanup();
      callback();
    }
  };

  const handleScroll = throttle(async () => {
    const { top } = numberElement.getBoundingClientRect();
    checkValidity(top);
  }, 100);

  const observer = new IntersectionObserver((entries) => {
    for (const { isIntersecting, intersectionRect } of entries) {
      const action = isIntersecting ? 'addEventListener' : 'removeEventListener';
      window[action]('scroll', handleScroll);

      if (isIntersecting) {
        checkValidity(intersectionRect.top);
      }
    }
  });

  const cleanup = () => {
    observer.disconnect();
    window.removeEventListener('scroll', handleScroll);
  };

  observer.observe(numberElement);

  return cleanup;
};
