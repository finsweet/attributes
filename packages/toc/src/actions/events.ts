import { addListener, isElement } from '@finsweet/ts-utils';

/**
 * Prevents the TOC links from adding the hash in the URL.
 * @param tocWrapper
 * @param hideURLHash Defines if the URL hash should be hidden after clicking the links.
 *
 * @returns A callback to remove the event listener.
 */
export const listenTOCLinkClicks = (tocWrapper: HTMLElement, hideURLHash?: boolean) => {
  const clickCleanup = addListener(tocWrapper, 'click', (e) => {
    if (!isElement(e.target)) return;

    const link = e.target.closest('a');
    if (!link) return;

    e.stopPropagation();

    if (!hideURLHash) return;

    window.setTimeout(() => {
      const { origin, pathname, search } = window.location;

      history.replaceState('', document.title, origin + pathname + search);
    });
  });

  return clickCleanup;
};
