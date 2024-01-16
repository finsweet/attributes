import { getCollectionElements, simulateEvent } from '@finsweet/attributes-utils';

import {
  activeTabClass,
  getActiveClassAttributeValue,
  getAttribute,
  getElementSelector,
  getTabNameFromQuery,
  handleVisibility,
  queryAllElements,
  queryElement,
  setPointerEventsNoneToElementAndChildren,
} from '../utils';

export const initTabs = (tabWrapper: HTMLElement) => {
  const menu = queryElement('menu', { scope: tabWrapper });
  const content = queryElement('content', { scope: tabWrapper });

  if (!menu || !content) {
    return;
  }

  const querySupport = getAttribute(menu, 'querytabs');
  const effect = getAttribute(menu, 'effect', true) || 'fade';
  const customNamesElements = queryAllElements('name', { scope: menu });
  const customNames = customNamesElements.map((element) => element.textContent?.replace(/\s/g, '-'));
  const timer = getAttribute(menu, 'timer');
  const timerStopClick = getAttribute(menu, 'timerstopclick');
  const timerStart = getAttribute(menu, 'timerstart', true) || 'load';
  let intervalId: number | null = null;
  const interactionElements = queryAllElements('timer-interaction', { scope: tabWrapper });

  for (const element of interactionElements) {
    setPointerEventsNoneToElementAndChildren(element);
  }

  const menuActiveClass = getActiveClassAttributeValue(menu) || activeTabClass;
  const contentActiveClass = getActiveClassAttributeValue(content) || activeTabClass;

  const scrollAnchor = queryElement('scroll-anchor');

  const menuItems = getCollectionElements(menu, 'items') || [
    ...menu.querySelectorAll(`:scope > :not(${getElementSelector('omit')})`),
  ];
  const contentItems = getCollectionElements(content, 'items') || Array.from(content.children);

  if (!menuItems.length || !contentItems.length) {
    return;
  }

  const setTab = async (index: number) => {
    contentItems.forEach(async (contentItem) => {
      contentItem.style.display = 'none';
      contentItem.classList.remove(contentActiveClass);
    });

    handleVisibility(contentItems[index], effect, 'flex');

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

    if (interactionElements.length > 0) simulateEvent(interactionElements[index], 'click');

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

  setTab(0);

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
