import { getCollectionElements } from '@finsweet/attributes-utils';

import { DisplayController } from '../../../consent/src/components';
import {
  getActiveClassAttributeValue,
  getAttribute,
  getTabNameFromQuery,
  queryAllElements,
  queryElement,
  type TEffects,
  type TTimer,
} from '../utils';
import { setPointerEventsNoneToElementAndChildren } from '../utils';

export const initTabs = (tabWrapper: HTMLElement) => {
  const menu = queryElement('menu', { scope: tabWrapper });
  const content = queryElement('content', { scope: tabWrapper });

  if (!menu || !content) {
    return;
  }

  const querySupport = getAttribute(menu, 'querytabs');
  const effect = (getAttribute(menu, 'effect') || 'fade') as TEffects;
  const customNamesElements = queryAllElements('name', { scope: menu });
  const customNames = customNamesElements.map((element) => element.textContent?.replace(/\s/g, '-'));
  const timer = getAttribute(menu, 'timer');
  const timerStopClick = getAttribute(menu, 'timerstopclick');
  const timerStart = (getAttribute(menu, 'timerstart') || 'load') as TTimer;
  let intervalId: number | null = null;
  const interactionElements = queryAllElements('timer-interaction', { scope: tabWrapper });

  for (const element of interactionElements) {
    setPointerEventsNoneToElementAndChildren(element);
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

  const setTab = async (index: number) => {
    contentItems.forEach(async (contentItem) => {
      contentItem.style.display = 'none';
      contentItem.classList.remove(contentActiveClass);
    });

    const dsiplay = new DisplayController({
      element: contentItems[index],
      displayProperty: 'flex',
      animation: effect,
    });

    dsiplay.show();
    contentItems[index].classList.add(contentActiveClass);

    menuItems.forEach((item) => {
      item.classList.remove(menuActiveClass);
    });

    menuItems[index].classList.add(menuActiveClass);

    if (scrollAnchor) {
      scrollAnchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabs = (index: number) => {
    setTab(index);
    const clickEvent = new Event('click', { bubbles: true, cancelable: true });
    interactionElements[index]?.dispatchEvent(clickEvent);
    if (intervalId && timerStopClick !== 'false') {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };

  menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', () => handleTabs(index));
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

  contentItems.forEach((contentItem) => {
    contentItem.style.display = 'none';
  });
  menuItems[0].classList.add(menuActiveClass);

  if (querySupport) setInitialTabFromQuery();

  const setTimerInterval = () => {
    return window.setInterval(() => {
      const currentIndex = menuItems.findIndex((item) => item.classList.contains(menuActiveClass));
      const nextIndex = (currentIndex + 1) % menuItems.length;
      setTab(nextIndex);
    }, parseInt(timer || '0', 10));
  };

  const startTimer = () => {
    const startTimerConditions = {
      'scroll-into-view': () => {
        if (scrollAnchor) {
          const observer = new IntersectionObserver(
            (entries) => {
              if (entries[0].isIntersecting) {
                intervalId = setTimerInterval();
                observer.disconnect();
              }
            },
            { root: null, rootMargin: '0px', threshold: 0.1 }
          );
          observer.observe(scrollAnchor);
        }
      },
      load: () => {
        intervalId = setTimerInterval();
      },
      click: () => {
        tabWrapper.addEventListener('click', () => {
          if (intervalId) {
            window.clearInterval(intervalId);
            intervalId = null;
          } else {
            intervalId = setTimerInterval();
          }
        });
      },
    };

    const startTimerFunction = startTimerConditions[timerStart];
    if (startTimerFunction) {
      startTimerFunction();
    }
  };

  if (timer) startTimer();

  return {
    clean: () => {
      menuItems.forEach((menuItem, index) => {
        menuItem.removeEventListener('click', () => handleTabs(index));
      });
      if (intervalId) {
        window.clearInterval(intervalId);
      }
      intervalId = null;
    },
  };
};
