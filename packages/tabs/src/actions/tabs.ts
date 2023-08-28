import { getCollectionElements } from '@finsweet/attributes-utils';

import {
  getActiveClassAttributeValue,
  getAttribute,
  getInstanceIndex,
  getTabNameFromQuery,
  queryAllElements,
  queryElement,
} from '../utils';

export const initTabs = (menu: HTMLElement) => {
  const instanceIndex = getInstanceIndex(menu);
  const content = queryElement('content', { instanceIndex });
  const querySupport = getAttribute(menu, 'querytabs');
  const customNamesElements = queryAllElements('name', { instanceIndex, scope: menu });
  const customNames = customNamesElements.map((element) => element.textContent?.replace(/\s/g, '-'));

  if (!content) {
    return;
  }

  const menuActiveClass = getActiveClassAttributeValue(menu) || 'is-active';
  const contentActiveClass = getActiveClassAttributeValue(content) || 'is-active';

  const scrollAnchor = queryElement('scroll-anchor');

  const menuItems =
    getCollectionElements(menu, 'items') ||
    Array.from(menu.children).filter((menuItem) => {
      return menuItem.getAttribute('fs-tabs-element') !== 'omit';
    });
  const contentItems = getCollectionElements(content, 'items') || Array.from(content.children);

  if (!menuItems || !contentItems) {
    return;
  }

  const setTab = (index: number) => {
    contentItems.forEach((contentItem) => {
      contentItem.style.display = 'none';
      contentItem.classList.remove(contentActiveClass);
    });

    contentItems[index].style.display = 'flex';
    contentItems[index].classList.add(contentActiveClass);

    menuItems.forEach((item) => {
      item.classList.remove(menuActiveClass);
    });

    menuItems[index].classList.add(menuActiveClass);

    if (scrollAnchor) {
      scrollAnchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', () => {
      setTab(index);
    });
  });

  function setInitialTabFromQuery() {
    const tabName = getTabNameFromQuery();
    if (tabName) {
      const tabIndex = customNames.indexOf(tabName);
      if (tabIndex >= 0 && tabIndex < menuItems.length) {
        setTab(tabIndex);
      }
    }
  }

  for (let i = 1; i < contentItems.length; i++) {
    contentItems[i].style.display = 'none';
  }
  menuItems[0].classList.add(menuActiveClass);

  if (querySupport) setInitialTabFromQuery();
};
