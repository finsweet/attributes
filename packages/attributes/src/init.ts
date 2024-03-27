import { ATTRIBUTES, type FsAttributeKey, type FsAttributesCallback } from '@finsweet/attributes-utils';

import { loadAttribute } from './load';

/**
 * Inits the Finsweet Attributes library.
 */
export const init = () => {
  const { fsAttributes } = window;

  // Avoid initting the Attributes API more than once.
  // If the API is already initted, just init the individual Attributes and escape.
  if (fsAttributes && !Array.isArray(fsAttributes)) {
    initAttributes();
    return;
  }

  // Collect pre-existing callbacks
  const callbacks = Array.isArray(fsAttributes) ? (fsAttributes as FsAttributesCallback[]) : [];

  // Collect library scripts
  const scripts = [...document.querySelectorAll<HTMLScriptElement>(`script[type="module"][src="${import.meta.url}"]`)];

  console.log({ scripts, url: import.meta.url });

  // Init Attributes object
  window.fsAttributes = window.FsAttributes = {
    scripts,
    solutions: {},
    process: new Set<FsAttributeKey>(),

    load: initAttribute,

    push(...args) {
      for (const [key, callback] of args) {
        this.solutions[key]?.loading?.then(callback);
      }
    },

    destroy() {
      for (const solution in this.solutions) {
        this.solutions[solution as keyof typeof this.solutions]?.destroy?.();
      }
    },
  };

  // Init Attributes
  initAttributes();

  // Run pre-existing callbacks
  window.fsAttributes.push(...callbacks);
};

/**
 * Inits all Attributes that are defined in the current script.
 */
const initAttributes = () => {
  for (const script of window.fsAttributes.scripts) {
    for (const attribute of Object.values(ATTRIBUTES)) {
      const isDefined = script.hasAttribute(`fs-${attribute}`);
      if (!isDefined) continue;

      initAttribute(attribute);
    }
  }
};

/**
 * Inits an individual Attribute.
 * @param attribute
 * @param script The <script> tag that defines the Attribute.
 *
 * @returns A Promise that resolves once the Attribute has loaded and executed.
 */
const initAttribute = async (attribute: FsAttributeKey) => {
  // Ensure that the attribute is only initted once
  if (window.fsAttributes.process.has(attribute)) return;

  window.fsAttributes.process.add(attribute);

  // Init controls
  const controls = (window.fsAttributes.solutions[attribute] ||= {});

  controls.loading = new Promise((resolve) => {
    controls.resolve = (value) => {
      resolve(value);
      delete controls.resolve;
    };
  });

  // Load Attribute package
  try {
    const { init, version } = await loadAttribute(attribute);

    // Init attribute
    const { result, destroy } = (await init()) || {};

    // Finalize controls
    controls.version = version;

    controls.destroy = () => {
      destroy?.();
      window.fsAttributes.process.delete(attribute);
    };

    controls.restart = () => {
      controls.destroy?.();
      return window.fsAttributes.load(attribute);
    };

    controls.resolve?.(result);

    return result;
  } catch (err) {
    console.error(err);
  }
};
