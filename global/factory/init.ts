import { createImportURL, importSupport } from '$global/import';

import { assessScript } from './assess';
import { ATTRIBUTES, getSelector } from './constants';
import type { GlobalAttributeParams } from './types';

type FsAttributes = typeof window.fsAttributes;

/**
 * Inits an Attribute.
 * Makes sure the global {@link window.fsAttributes} instance is initted.
 *
 * @param params.init The init callback. It can either have no parameters or accept a Record with the passed scriptAttributes param.
 * @param params.version The package version, for debugging purposes.
 * @param params.attributeKey The Attribute key. Example: `cmsload`.
 * @param params.scriptAttributes An optional object that contains the Attribute's <script> parameters.
 */
export const initAttribute = <AttributeKeys extends Record<string, string>>({
  scriptAttributes,
  attributeKey,
  version,
  init,
}: {
  scriptAttributes?: AttributeKeys;
  attributeKey: string;
  version: string;
  init: (scriptAttributes: GlobalAttributeParams<AttributeKeys>['attributes']) => void;
}) => {
  initAttributes();

  window.fsAttributes[attributeKey] ||= {};

  const { preventsLoad, attributes } = assessScript(scriptAttributes);

  const attribute = window.fsAttributes[attributeKey];
  attribute.version = version;
  attribute.init = init;

  if (!preventsLoad) {
    window.Webflow ||= [];
    window.Webflow.push(() => init(attributes));
  }
};

/**
 * Makes sure the window object is defined.
 */
const initAttributes = () => {
  const attributesKeys = getAttributesKeys();

  // FsAttributes already exists so we just make sure that any newly imported <script> is also parsed and initted.
  if (window.fsAttributes && !Array.isArray(window.fsAttributes)) {
    initAttributesControls(window.fsAttributes, attributesKeys);
    return;
  }

  // Init FsAttributes
  const fsAttributes = createFsAttributes(attributesKeys);

  initAttributesControls(fsAttributes, attributesKeys);
  runExistingCallbacks(fsAttributes);

  window.fsAttributes = fsAttributes;
  window.FsAttributes = window.fsAttributes;

  importSupport();
};

/**
 * Creates the base {@link window.fsAttributes} object.
 * @param attributesKeys
 */
const createFsAttributes = (attributesKeys: string[]) => {
  const fsAttributes = {
    // TODO: Remove this once cmscore@1.9.0 has rolled out
    cms: {},

    push(...args) {
      for (const [attributeName, callback] of args) {
        this[attributeName]?.loading?.then(callback);
      }
    },

    // TODO: Support importing ESM versions
    async import(attributeKey, version) {
      const attribute = fsAttributes[attributeKey];
      if (attribute) return attribute;

      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = createImportURL(attributeKey, version);
        script.async = true;
        script.onload = () => {
          const [attributeControls] = initAttributesControls(fsAttributes, [attributeKey]);
          resolve(attributeControls);
        };

        document.head.append(script);
      });
    },

    destroy() {
      for (const attributeKey of attributesKeys) {
        window.fsAttributes[attributeKey]?.destroy?.();
      }
    },
  } as FsAttributes;

  return fsAttributes;
};

/**
 * Scans the current page to detect all the Attributes that are imported via a <script> tag.
 * @returns An array with the keys of all Attributes that are imported in the page.
 */
const getAttributesKeys = () => {
  const srcSelector = getSelector('src', 'finsweet', { operator: 'contains' });
  const devSelector = getSelector('dev');
  const scripts = [...document.querySelectorAll<HTMLScriptElement>(`script${srcSelector}, script${devSelector}`)];

  const attributesKeys = scripts.reduce<string[]>((acc, script) => {
    const attributeName = script.getAttribute(ATTRIBUTES.dev.key) || script.src.match(/[\w-. ]+(?=(\.js)$)/)?.[0];
    if (attributeName && !acc.includes(attributeName)) acc.push(attributeName);

    return acc;
  }, []);

  return attributesKeys;
};

/**
 * Sets a loading promise for each attribute package.
 * @param fsAttributes The {@link FsAttributes} object.
 */
const initAttributesControls = (fsAttributes: FsAttributes, attributesKeys: string[]) => {
  const fsAttributesControls = attributesKeys.map((attributeKey) => {
    let attribute = fsAttributes[attributeKey];
    if (attribute) return attribute;

    fsAttributes[attributeKey] = {};

    attribute = fsAttributes[attributeKey];

    attribute.loading = new Promise((resolve) => {
      attribute.resolve = (value: unknown) => {
        resolve(value);
        delete attribute.resolve;
      };
    });

    return attribute;
  });

  return fsAttributesControls;
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
