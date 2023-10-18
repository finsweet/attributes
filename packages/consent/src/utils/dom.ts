import {
  animations,
  isScrollable,
  removeTrailingSlash,
  restartWebflow,
  waitWebflowReady,
} from '@finsweet/attributes-utils';

import { Debug } from '../components';
import { type IFrameData, type ScriptData } from '../utils';
import { getElementSelector } from './selectors';

/**
 * Fetches the components from a specified source and renders them to the DOM.
 * @param source The source URL. It can be both an absolute or a relative URL.
 */
export const renderComponentsFromSource = async (source: string, resetix: boolean): Promise<void> => {
  const { origin, pathname, href } = window.location;
  const { origin: baseOrigin, pathname: basePathname, href: baseHref } = new URL(document.baseURI);

  try {
    // If the source is a relative URL, construct the full path
    if (source.startsWith('/')) {
      const rawBase = baseHref === href ? origin : baseOrigin + basePathname;
      source = removeTrailingSlash(rawBase) + source;
    }

    // If the current page is the same of the source, return
    const { origin: sourceOrigin, pathname: sourcePathname } = new URL(source);
    if (sourceOrigin + sourcePathname === origin + pathname) return;

    // Get the source page
    const response = await fetch(source);
    const data = await response.text();

    const parser = new DOMParser();
    const sourceDocument = parser.parseFromString(data, 'text/html');

    // Get the components and render them to the DOM

    const components = [
      getElementSelector('banner'),
      getElementSelector('fixed-preferences'),
      getElementSelector('preferences'),
    ];

    components.forEach((selector) => {
      // Get the component
      const component = sourceDocument.querySelector(selector);
      if (component) document.body.appendChild(component);
    });

    // Restart Webflow in case any interaction exists, to make sure it works after mounting the element
    if (resetix) {
      await waitWebflowReady();

      await restartWebflow(['ix2']);
    }
  } catch (error) {
    Debug.alert(`${error}`, 'error');
  }
};

/**
 * @returns The first scrollable element inside a parent, or the parent itself.
 * @param parent
 */
export const findFirstScrollableElement = (parent: HTMLElement): Element | undefined => {
  if (isScrollable(parent)) return parent;

  const children = parent.querySelectorAll('*');
  for (const child of children) if (isScrollable(child)) return child;
};

/**
 * Creates a new script element based on the one passed to the function.
 * @param element Original element stored in the ScriptData interface.
 * @returns The new script element.
 */
export const createNewScriptElement = ({ element }: ScriptData): ScriptData['element'] => {
  const newElement = document.createElement('script');

  newElement.type = 'text/javascript';
  newElement.innerText = element.innerText;
  newElement.text = element.text;
  if (element.src) newElement.src = element.src;

  return newElement;
};

/**
 * Creates a new iframe element based on the one passed to the function.
 * @param element Original element stored in the ScriptData interface.
 * @param src The src of the iFrame
 * @param placeholder A placeholder element that will be hidden when the new iFrame is loaded.
 * @returns The new iFrame element.
 */
export const createNewIFrameElement = ({ element, src, placeholder }: IFrameData): HTMLIFrameElement => {
  const newElement = document.createElement('iframe');

  for (const { name, value } of element.attributes) newElement.setAttribute(name, value);
  newElement.innerText = element.innerText;
  newElement.src = src;

  // Hide the placeholder when the iFrame is fully loaded
  if (placeholder)
    newElement.addEventListener('load', async () => {
      await animations['fade'].animateOut(placeholder, { display: 'none' });
    });

  return newElement;
};
