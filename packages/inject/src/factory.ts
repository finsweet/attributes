import { cloneNode, isNotEmpty, restartWebflow, RICH_TEXT_BLOCK_CSS_CLASS } from '@finsweet/attributes-utils';

import { attachPageStyles } from './actions/css';
import { getComponentPage } from './actions/prefetch';
import { convertRelativeUrlsToAbsolute, isSameWebflowProject } from './utils/helpers';
import { queryAllElements } from './utils/selectors';
import type { ComponentData, ComponentTargetData } from './utils/types';

/**
 * Inits the component targets.
 * @param componentTargetsData
 * @returns The components data.
 */
export const initComponents = async (componentTargetsData: ComponentTargetData[]): Promise<ComponentData[]> => {
  const componentsData = (await Promise.all(componentTargetsData.map(initComponent))).filter(isNotEmpty).flat();

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
const initComponent = async (componentTargetData: ComponentTargetData): Promise<Array<ComponentData> | undefined> => {
  const { target, instance, proxiedSource, source, loadCSS, autoRender, positions } = componentTargetData;

  const componentsSource = proxiedSource || source;

  const page = componentsSource ? await getComponentPage(componentsSource) : document;
  if (!page) return;

  const components = [
    ...queryAllElements('component', { instance, scope: page }),
    ...queryAllElements('element', { instance, scope: page }),
  ].map((component) => cloneNode(component));

  if (!components.length) return;

  const targetChildren = [...target.children];
  const isSameSite = isSameWebflowProject(page);
  const isRTB = target.classList.contains(RICH_TEXT_BLOCK_CSS_CLASS);

  const componentsToInject = isRTB ? components : [components[0]];
  if (!componentsToInject.length) return;

  return Promise.all(
    components
      .map<ComponentData | undefined>((component, index) => {
        const render = (component: HTMLElement) => {
          // Rich Text Block component injection
          if (isRTB) {
            const position = positions[index] ?? 0.5;

            let targetPosition = Math.round(targetChildren.length * position);
            let referenceNode = targetChildren[targetPosition];
            let previousNode = targetChildren[targetPosition - 1];

            while (previousNode && /^h[1-6]$/i.test(previousNode.tagName)) {
              targetPosition -= 1;
              referenceNode = targetChildren[targetPosition];
              previousNode = targetChildren[targetPosition - 1];
            }

            if (targetPosition < 0) {
              target.prepend(component);
            } else {
              target.insertBefore(component, referenceNode || null);
            }
          }

          // Normal component injection
          else {
            target.append(component);
          }
        };

        // Same site component
        if (isSameSite) {
          if (autoRender) {
            render(component);
          }

          return {
            ...componentTargetData,
            component,
          };
        }

        // External component
        if (!source) return;

        // Create a shadow root
        let shadowRoot: ShadowRoot | undefined;
        let shadowRootTarget: HTMLElement | undefined;

        // Load the CSS
        // To load the external CSS, we attach a Shadow DOM to the target element
        if (loadCSS) {
          shadowRootTarget = document.createElement('div');
          shadowRootTarget.style.display = 'contents';

          shadowRoot = shadowRootTarget.attachShadow({ mode: 'open' });

          attachPageStyles(shadowRoot, page).then(() => {
            shadowRoot!.append(component);
          });
        }

        // Convert relative URLs to absolute URLs
        convertRelativeUrlsToAbsolute(component, source);

        // Render the component
        if (autoRender) {
          render(shadowRootTarget || component);
        }

        return {
          ...componentTargetData,
          shadowRoot,
          component,
        };
      })
      .filter(isNotEmpty)
  );
};
