/**
 * Function to preload all images within an element with a timeout.
 * @param element - The HTML element to search for images within.
 * @param callback - The callback function to be called when all images are loaded or when the timeout is reached.
 */
export function preloadImages(element: HTMLElement, callback: () => void) {
  const images = element.querySelectorAll('img');
  const imageCount = images.length;

  if (imageCount === 0) {
    callback();
    return;
  }

  const timeoutDuration = 6000; // Timeout for images to load
  let loadedImages = 0;
  let isCallbackCalled = false;

  const handleTimeout = () => {
    if (!isCallbackCalled) {
      isCallbackCalled = true;
      callback();
    }
  };

  const timeoutId = setTimeout(handleTimeout, timeoutDuration);

  images.forEach((image) => {
    image.onload = () => {
      loadedImages = loadedImages + 1;
      if (loadedImages === imageCount) {
        clearTimeout(timeoutId);
        if (!isCallbackCalled) {
          isCallbackCalled = true;
          callback();
        }
      }
    };
    image.src = image.src; // Trigger the image to load
  });
}
