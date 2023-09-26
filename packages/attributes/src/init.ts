import { ATTRIBUTES, type FsAttributeKey, type FsAttributesCallback } from '@finsweet/attributes-utils';

import { loadAttribute } from './load';

declare const SCRIPT_SRC: string;

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

  // Init Attributes object
  window.fsAttributes = window.FsAttributes = {
    solutions: {},
    process: new Set<FsAttributeKey>(),

    push(...args) {
      for (const [key, callback] of args) {
        this.solutions[key]?.loading?.then(callback);
      }
    },

    import(solution, globalSettings) {
      if (this.process.has(solution)) return;

      return initAttribute(solution, { globalSettings });
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
  const scripts = document.querySelectorAll<HTMLScriptElement>(`script[type="module"][src^="${SCRIPT_SRC}"]`);

  for (const script of scripts) {
    for (const attribute of Object.values(ATTRIBUTES)) {
      const isDefined = script.hasAttribute(`fs-${attribute}`);
      if (!isDefined) continue;

      initAttribute(attribute, { script });
    }
  }
};

/**
 * Inits an individual Attribute.
 * @param attribute
 * @param params.script The <script> tag that defines the Attribute.
 * @param params.globalSettings Global settings that are passed via the API import method.
 *
 * @returns A Promise that resolves once the Attribute has loaded and executed.
 */
const initAttribute = async (
  attribute: FsAttributeKey,
  {
    script,
    globalSettings,
  }: {
    script?: HTMLScriptElement;
    globalSettings?: {
      [k: string]: string;
    };
  }
) => {
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
    const { init, version, SETTINGS } = await loadAttribute(attribute);

    // Parse global settings from the <script> tag,
    // only if they were not explicitly provided via the API import
    if (!globalSettings && script) {
      const globalSettingsEntries = Object.entries(SETTINGS).reduce<[string, string][]>((acc, [, { key }]) => {
        const value = script.getAttribute(`fs-${attribute}-${key}`);
        if (!value) return acc;

        acc.push([key, value]);

        return acc;
      }, []);

      globalSettings = Object.fromEntries(globalSettingsEntries);
    }

    // Init attribute
    const { result, destroy } = (await init(globalSettings)) || {};

    // Finalize controls
    controls.version = version;

    controls.destroy = () => {
      destroy?.();
      window.fsAttributes.process.delete(attribute);
    };

    controls.restart = () => {
      controls.destroy?.();
      return window.fsAttributes.import(attribute, globalSettings);
    };

    controls.resolve?.(result);

    return result;
  } catch (err) {
    console.error(err);
  }
};
