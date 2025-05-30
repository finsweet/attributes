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
  const { target, instance, proxiedSource, source, noCSS, autoRender, positions } = componentTargetData;

  const componentsSource = proxiedSource || source;

  const page = componentsSource ? await getComponentPage(componentsSource) : document;
  if (!page) return;

  const components = [
    ...queryAllElements('component', { instance, scope: page }),
    ...queryAllElements('element', { instance, scope: page }),
  ].map((component) => cloneNode(component));

  if (!components.length) return;

  const targetChildren = [...target.children];
  const isSamePage = page === document;
  const isSameSite = isSameWebflowProject(page);
  const isRTB = target.classList.contains(RICH_TEXT_BLOCK_CSS_CLASS);

  const componentsToInject = isRTB ? components : [components[0]];
  if (!componentsToInject.length) return;

  return Promise.all(
    components
      .map<ComponentData | undefined>((component, index) => {
        let shadowRoot: ShadowRoot | undefined;
        let shadowRootWrapper: HTMLElement | undefined;

        const render = (element: HTMLElement) => {
          // Handle CSS
          if (!isSamePage && !noCSS) {
            shadowRootWrapper = document.createElement('div');
            shadowRootWrapper.style.display = 'contents';

            shadowRoot = shadowRootWrapper.attachShadow({ mode: 'open' });

            attachPageStyles(shadowRoot, page).then(() => {
              shadowRoot!.append(element);
            });
          }

          const toRender = shadowRootWrapper || element;

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
              target.prepend(toRender);
            } else {
              target.insertBefore(toRender, referenceNode || null);
            }
          }

          // Normal component injection
          else {
            if (componentTargetData.replace) {
              target.replaceWith(toRender);
            } else {
              target.append(toRender);
            }
          }
        };

        // Convert relative URLs to absolute URLs
        if (!isSameSite && source) {
          convertRelativeUrlsToAbsolute(component, source);
        }

        // Render the component
        if (autoRender) {
          render(component);
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
