import { cloneNode, isNotEmpty, restartWebflow } from '@finsweet/attributes-utils';

import { attachPageStyles } from './actions/css';
import { getComponentPage } from './actions/prefetch';
import { convertRelativeUrlsToAbsolute, isSameWebflowProject } from './utils/helpers';
import { queryElement } from './utils/selectors';
import type { ComponentData, ComponentTargetData } from './utils/types';

/**
 * Inits the component targets.
 * @param componentTargetsData
 * @returns The components data.
 */
export const initComponents = async (componentTargetsData: ComponentTargetData[]): Promise<ComponentData[]> => {
  const componentsData = (await Promise.all(componentTargetsData.map(initComponent))).filter(isNotEmpty);

  const shouldResetIx = componentsData.some(({ resetIx }) => resetIx);
  if (shouldResetIx) {
    await restartWebflow();
  }

  return componentsData;
};

/**
 * Inits the component target.
 * @param componentTargetData
 * @returns The component data.
 */
const initComponent = async (componentTargetData: ComponentTargetData): Promise<ComponentData | undefined> => {
  const { target, instance, proxiedSource, source, loadCSS, autoRender } = componentTargetData;

  const page = getComponentPage(proxiedSource || source);
  if (!page) return;

  let component = queryElement('component', { instance, scope: page });
  if (!component) return;

  // We need to clone the component because other components might be using the same node
  component = cloneNode(component);

  const isSameSite = isSameWebflowProject(page);
  if (isSameSite) {
    if (autoRender) target.append(component);

    return {
      ...componentTargetData,
      component,
    };
  }

  // Create a shadow root
  let shadowRoot: ShadowRoot | undefined;

  // Load the CSS
  // To load the external CSS, we attach a Shadow DOM to the target element
  if (loadCSS) {
    shadowRoot = target.attachShadow({ mode: 'open' });

    await attachPageStyles(shadowRoot, page);
  }

  // Convert relative URLs to absolute URLs
  convertRelativeUrlsToAbsolute(component, source);

  // Render the component
  if (autoRender) {
    (shadowRoot || target).append(component);
  }

  return {
    ...componentTargetData,
    shadowRoot,
    component,
  };
};
