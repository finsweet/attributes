import { getCollectionElements } from '@finsweet/attributes-utils';

import { getInstanceIndex, queryElement } from '../utils';

export const initTabs = (menu: HTMLElement) => {
  const instanceIndex = getInstanceIndex(menu);
  const content = queryElement('content', { instanceIndex });

  if (!content) {
    return;
  }

  const menuItems = getCollectionElements(menu, 'items') || Array.from(menu.children);
  const contentItems = getCollectionElements(content, 'items') || Array.from(content.children);

  if (!menuItems || !contentItems) {
    return;
  }

  menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', () => {
      contentItems.forEach((contentItem) => {
        contentItem.style.display = 'none';
      });

      contentItems[index].style.display = 'flex';

      menuItems.forEach((item) => {
        item.classList.remove('is-active');
      });

      menuItem.classList.add('is-active');
    });
  });

  for (let i = 1; i < contentItems.length; i++) {
    contentItems[i].style.display = 'none';
  }
  menuItems[0].classList.add('is-active');
};
