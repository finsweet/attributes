import type { animations, Easings } from '@finsweet/attributes-utils';

import { cleanupTooltips, initTooltip } from './actions';
import type { TooltipOptions } from './utils';

// Store the elements with .helper class on page load
let helperElements: HTMLElement[] = [];

const load = () => {
  const target = document.querySelector<HTMLScriptElement>('script[docs]');

  console.log('docs script:', target);

  const targetAttribute = target?.getAttribute('target') || '.helper';
  const key = target?.getAttribute('key') || '?';
  const animation = (target?.getAttribute('animation') || 'fade') as keyof typeof animations;
  const duration = target?.getAttribute('duration') || '150';
  const easing = (target?.getAttribute('easing') || 'ease') as Easings[number];
  // get tooltip theme color
  const textColor = target?.getAttribute('text-color') || '#003238';
  const themeColor = target?.getAttribute('theme-color') || 'var(--aqua)';
  const arrow = target?.getAttribute('arrow') === 'true';
  const badge = target?.getAttribute('badge') === 'true';

  // show outline only
  const outlineOnly = target?.getAttribute('outline-only') === 'true';

  const options: TooltipOptions = {
    animation,
    duration: parseInt(duration),
    easing,
    textColor,
    themeColor,
    arrow,
    badge,
    outlineOnly,
    key,
    targetAttribute,
  };

  console.log('Target script:', target);
  console.log('options', options);

  const elements = document.querySelectorAll<HTMLElement>(targetAttribute);

  console.log('elements', elements?.length > 0);

  if (elements.length > 0 && target) {
    helperElements = Array.from(elements);

    helperElements.forEach((element) => {
      if (outlineOnly) {
        if (themeColor) element.style.outlineColor = options.themeColor;

        return;
      }

      // Init the tooltips
      initTooltip(element, options);
    });
  }

  // init the .helper class on key press
  document.addEventListener('keydown', (e) => {
    if (e.key === key) {
      helperElements.forEach((element) => {
        if (outlineOnly) {
          element.classList.toggle('helper');
          if (themeColor) element.style.outlineColor = options.themeColor;

          return;
        }

        if (element) {
          element.classList.toggle('helper');

          if (element.classList.contains('helper')) {
            initTooltip(element, options);
          } else {
            cleanupTooltips(element);
          }
        }
      });
    }
  });
};

const checkAllSolutionsLoaded = async (): Promise<boolean> => {
  if (!window?.fsAttributes?.solutions) return true;

  const loadingPromises = Object.values(window.fsAttributes.solutions).map((solution) => solution.loading);

  try {
    const results = await Promise.all(loadingPromises);
    return results.every((result) => result && result.length > 0);
  } catch (error) {
    console.error('A promise was rejected with error:', error);
    return false;
  }
};

const finsweetCoreScript = () => {
  // Select all script elements src containing attributes.js
  const scripts = document.querySelectorAll('script');
  const fsScripts = Array.from(scripts).filter((script) => script.src.includes('attributes.js'));

  return fsScripts;
};

const waitForAllSolutions = async () => {
  // check for finsweet core script
  const fsScripts = finsweetCoreScript();

  if (fsScripts.length === 0) {
    load();

    return;
  }

  let allLoaded = false;

  // Keep checking until all promises are loaded for all attribute solutions
  while (!allLoaded) {
    allLoaded = await checkAllSolutionsLoaded();

    if (!allLoaded) {
      console.log('Not all solutions loaded, waiting to retry...');

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.log('All finsweet solutions loaded:', allLoaded);

  // Load the helper script
  load();
};

document.addEventListener('DOMContentLoaded', waitForAllSolutions);
