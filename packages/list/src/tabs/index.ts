import { ARIA_ROLE_KEY, cloneNode, TABS_CSS_CLASSES } from '@finsweet/attributes-utils';

import type { List } from '../components';
import { queryElement } from '../utils/selectors';

/**
 * Inits the list tabs.
 * @param list
 * @param tabsReferences
 */
export const initListTabs = (list: List, tabsReferences: HTMLElement[]) => {
  list.webflowModules.add('tabs');

  tabsReferences.forEach((sliderReference) => initListTab(list, sliderReference));
};

/**
 * Inits a list slider.
 * @param list
 * @param tabsReference
 */
const initListTab = (list: List, tabsReference: HTMLElement) => {
  const tabsElement = tabsReference.closest(`.${TABS_CSS_CLASSES.tabs}`);
  if (!tabsElement) return;

  const tabsMenu = tabsElement.querySelector(`.${TABS_CSS_CLASSES.tabsMenu}`);
  if (!tabsMenu) return;

  const tabsContent = tabsElement.querySelector(`.${TABS_CSS_CLASSES.tabsContent}`);
  if (!tabsContent) return;

  const existingTabLinks = tabsElement.querySelectorAll(`.${TABS_CSS_CLASSES.tabLink}`);
  if (!existingTabLinks.length) return;

  const existingTabPanes = tabsElement.querySelectorAll(`.${TABS_CSS_CLASSES.tabPane}`);
  if (!existingTabPanes.length) return;

  // Store the template CSS classes
  const tabLinkCSS = existingTabLinks[0].classList.value;
  const tabPaneCSS = existingTabPanes[0].classList.value;

  // Remove existing elements
  for (const element of [...existingTabLinks, ...existingTabPanes]) {
    element.remove();
  }

  // Store rendered items
  const renderedItems = new Map<
    string,
    {
      tabLink: HTMLElement;
      tabPane: HTMLElement;
    }
  >();

  list.addHook('beforeRender', (items = []) => {
    for (const item of items) {
      if (renderedItems.has(item.id)) continue;

      const elementClone = cloneNode(item.element);
      elementClone.removeAttribute(ARIA_ROLE_KEY);

      const tabLink = document.createElement('div');
      tabLink.setAttribute('class', tabLinkCSS);

      const tabPane = document.createElement('div');
      tabPane.setAttribute('class', tabPaneCSS);

      let tabLinkContent = queryElement('tab-link', { scope: elementClone });

      if (tabLinkContent) {
        tabLinkContent = cloneNode(tabLinkContent);
      } else {
        tabLinkContent = document.createElement('div');
        tabLinkContent.innerHTML = /* html */ `Missing <strong>fs-list-element="tab-link"</strong>`;
      }

      tabLink.appendChild(tabLinkContent);
      tabsMenu.appendChild(tabLink);
      tabPane.appendChild(elementClone);
      tabsContent.appendChild(tabPane);

      renderedItems.set(item.id, { tabLink, tabPane });
    }

    for (const [itemId, { tabLink, tabPane }] of renderedItems) {
      if (items.some((item) => item.id === itemId)) continue;

      tabLink?.remove();
      tabPane?.remove();
      renderedItems.delete(itemId);
    }

    [...renderedItems.values()].forEach(({ tabLink, tabPane }, index) => {
      const dataset = `Tab ${index}`;

      tabLink.dataset.wTab = dataset;
      tabPane.dataset.wTab = dataset;
    });

    return [];
  });
};
