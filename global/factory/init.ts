import { importSupport } from '$global/import';

import { ATTRIBUTES, getSelector } from './constants';

type FsAttributes = typeof window.fsAttributes;

/**
 * Makes sure the window object is defined.
 */
export const initAttributes = () => {
  if (window.fsAttributes && !Array.isArray(window.fsAttributes)) return;

  const fsAttributes = {
    cms: {},
    push(...args) {
      for (const [attributeName, callback] of args) this[attributeName]?.loading?.then(callback);
    },
  } as FsAttributes;

  initLoadPromises(fsAttributes);
  runExistingCallbacks(fsAttributes);

  window.fsAttributes = fsAttributes;
  window.FsAttributes = window.fsAttributes;

  importSupport();
};

/**
 * Sets a loading promise for each attribute package.
 * @param fsAttributes The {@link FsAttributes} object.
 */
const initLoadPromises = (fsAttributes: FsAttributes) => {
  const srcSelector = getSelector('src', 'finsweet', { operator: 'contains' });
  const devSelector = getSelector('dev');
  const scripts = [...document.querySelectorAll<HTMLScriptElement>(`script${srcSelector}, script${devSelector}`)];

  const attributes = scripts.reduce<string[]>((acc, script) => {
    const attributeName = script.getAttribute(ATTRIBUTES.dev.key) || script.src.match(/[\w-. ]+(?=(\.js)$)/)?.[0];
    if (attributeName && !acc.includes(attributeName)) acc.push(attributeName);

    return acc;
  }, []);

  for (const attributeName of attributes) {
    fsAttributes[attributeName] = {};
    const attribute = fsAttributes[attributeName];

    attribute.loading = new Promise((resolve) => {
      attribute.resolve = (value: unknown) => {
        resolve(value);
        delete attribute.resolve;
      };
    });
  }
};

/**
 * Runs the existing callbacks in the `window.fsAttributes` object.
 * @param fsAttributes The {@link FsAttributes} object.
 */
const runExistingCallbacks = (fsAttributes: FsAttributes) => {
  const existingCallbacks = Array.isArray(window.fsAttributes)
    ? (window.fsAttributes as Parameters<FsAttributes['push']>)
    : [];
  fsAttributes.push(...existingCallbacks);
};
