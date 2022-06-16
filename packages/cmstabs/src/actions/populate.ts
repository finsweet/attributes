import type { CMSItem } from '@finsweet/attributes-cmscore';
import { TABS_CSS_CLASSES, CURRENT_CSS_CLASS } from '@finsweet/ts-utils';
import type { TabsMenuElement, TabsContentElement, TabLinkElement, TabPaneElement } from '@finsweet/ts-utils';
import { ARIA_ROLE_KEY } from '@global/constants/a11ty';

import { getSelector, queryElement } from '../utils/constants';
import type { PopulateData } from '../utils/types';

// Constants destructuring
const {
  tabsContent: tabsContentCSSClass,
  tabPane: tabPaneCSSClass,
  tabsMenu: tabsMenuCSSClass,
  tabLink: tabLinkCSSClass,
  activeTab: activeTabCSSClass,
} = TABS_CSS_CLASSES;

/**
 * Creates a new `Tab Link` and `Tab Pane` for each `Collection Item`.
 * @param populateData
 * @returns A `createTabsFromItems` callback.
 */
export const populateTabsFromLists = ({ listInstances, tabsElement }: PopulateData) => {
  const tabsMenu = tabsElement.querySelector<TabsMenuElement>(`.${tabsMenuCSSClass}`);
  const tabsContent = tabsElement.querySelector<TabsContentElement>(`.${tabsContentCSSClass}`);
  const existingTabLinks = tabsElement.querySelectorAll<TabLinkElement>(`.${tabLinkCSSClass}`);
  const existingTabPanes = tabsElement.querySelectorAll<TabPaneElement>(`.${tabPaneCSSClass}`);

  if (!tabsMenu || !tabsContent || !existingTabLinks.length || !existingTabPanes.length) return;

  // Store the template CSS classes
  const tabLinkCSS = existingTabLinks[0].classList.value;
  const tabPaneCSS = existingTabPanes[0].classList.value;

  // Remove existing items
  for (const element of [...existingTabLinks, ...existingTabPanes]) element.remove();

  let itemIndex = 0;

  /**
   * Adds a new `Tab Link` and `Tab Pane` for each `Collection Item`.
   * @param items The `CMSItem` instances.
   */
  const createTabsFromItems = (items: CMSItem[]) => {
    for (const { element } of items) {
      element.removeAttribute(ARIA_ROLE_KEY);

      const newTabLink = document.createElement('div');
      newTabLink.setAttribute('class', tabLinkCSS);

      const newTabPane = document.createElement('div');
      newTabPane.setAttribute('class', tabPaneCSS);

      for (const element of [newTabLink, newTabPane]) element.dataset.wTab = `Tab ${itemIndex}`;

      if (itemIndex === 0) {
        newTabLink.classList.add(CURRENT_CSS_CLASS);
        newTabPane.classList.add(activeTabCSSClass);
      }

      // Populate the `Tab Link` and `Tab Pane`
      let newTabLinkContent = queryElement('tabLink', { operator: 'prefixed', scope: element });

      if (!newTabLinkContent) {
        newTabLinkContent = document.createElement('div');
        newTabLinkContent.innerHTML = /* html */ `Use <strong>${getSelector(
          'element',
          'tabLink'
        )}</strong> to define this Tab Link content.`;
      }

      newTabLink.appendChild(newTabLinkContent);
      newTabPane.appendChild(element);

      // Populate the `Tabs` component
      tabsMenu.appendChild(newTabLink);
      tabsContent.appendChild(newTabPane);

      // Increment item index
      itemIndex += 1;
    }
  };

  for (const { wrapper, items } of listInstances) {
    // Create tabs
    createTabsFromItems(items);

    // Hide the Collection List Wrapper
    wrapper.style.display = 'none';
  }

  return createTabsFromItems;
};
