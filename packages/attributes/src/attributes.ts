import {
  ATTRIBUTES,
  type FinsweetAttributeKey,
  type FinsweetAttributesCallback,
  waitDOMReady,
} from '@finsweet/attributes-utils';

import { loadAttribute } from './load';

const ATTRIBUTES_ATTRIBUTE_PREFIX = 'fs-attributes';
const ATTRIBUTE_KEYS = new Set(Object.values(ATTRIBUTES));

/**
 * Inits the Finsweet Attributes library.
 */
const init = () => {
  const { finsweetAttributes } = window;

  // Avoid initting the Attributes API more than once.
  // If the API is already initted, just init the individual Attributes and escape.
  if (finsweetAttributes && !Array.isArray(finsweetAttributes)) {
    initAttributes();
    return;
  }

  // Collect pre-existing callbacks
  const callbacks = Array.isArray(finsweetAttributes) ? (finsweetAttributes as FinsweetAttributesCallback[]) : [];

  // Collect library scripts
  const scripts = [...document.querySelectorAll<HTMLScriptElement>(`script[type="module"][src="${import.meta.url}"]`)];

  // Init Attributes object
  window.finsweetAttributes = window.FinsweetAttributes = {
    scripts,
    modules: {},
    process: new Set<FinsweetAttributeKey>(),

    load: initAttribute,

    push(...args) {
      for (const [key, callback] of args) {
        this.modules[key]?.loading?.then(callback);
      }
    },

    destroy() {
      for (const solution in this.modules) {
        this.modules[solution as keyof typeof this.modules]?.destroy?.();
      }
    },
  };

  // Init Attributes
  initAttributes();

  // Run pre-existing callbacks
  window.finsweetAttributes.push(...callbacks);
};

/**
 * Inits all Attributes that are defined in the current script
 * or in the DOM if fs-attributes-auto is enabled.
 */
const initAttributes = () => {
  let autoLoad = false;

  for (const script of window.finsweetAttributes.scripts) {
    autoLoad ||= script.getAttribute(`${ATTRIBUTES_ATTRIBUTE_PREFIX}-auto`) === 'true';

    for (const key of ATTRIBUTE_KEYS) {
      const isDefined = script.hasAttribute(`fs-${key}`);
      if (!isDefined) continue;

      initAttribute(key);
    }
  }

  if (!autoLoad) return;

  waitDOMReady().then(() => {
    const usedAttributes = new Set<FinsweetAttributeKey>();
    const allElements = document.querySelectorAll('*');

    for (const element of allElements) {
      for (const name of element.getAttributeNames()) {
        const fsMatch = name.match(/^fs-([^-]+)/);
        const key = fsMatch?.[1] as FinsweetAttributeKey | undefined;

        if (key && ATTRIBUTE_KEYS.has(key)) {
          usedAttributes.add(key);
        }
      }
    }

    for (const attribute of usedAttributes) {
      initAttribute(attribute);
    }
  });
};

/**
 * Inits an individual Attribute.
 * @param key
 * @param script The <script> tag that defines the Attribute.
 *
 * @returns A Promise that resolves once the Attribute has loaded and executed.
 */
const initAttribute = async (key: FinsweetAttributeKey) => {
  // Ensure that the attribute is only initted once
  if (window.finsweetAttributes.process.has(key)) return;

  window.finsweetAttributes.process.add(key);

  // Init controls
  const controls = (window.finsweetAttributes.modules[key] ||= {});

  controls.loading = new Promise((resolve) => {
    controls.resolve = (value) => {
      resolve(value);
      delete controls.resolve;
    };
  });

  // Load Attribute package
  try {
    const { init, version } = await loadAttribute(key);

    // Init attribute
    const { result, destroy } = (await init()) || {};

    // Finalize controls
    controls.version = version;

    controls.destroy = () => {
      destroy?.();
      window.finsweetAttributes.process.delete(key);
    };

    controls.restart = () => {
      controls.destroy?.();
      return window.finsweetAttributes.load(key);
    };

    controls.resolve?.(result);

    return result;
  } catch (err) {
    console.error(err);
  }
};

// Init
init();
