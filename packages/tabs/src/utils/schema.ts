import type { Schema, SchemaSettings } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

const SCHEMA_SETTINGS: SchemaSettings<typeof SETTINGS> = {
  querytabs: {
    ...SETTINGS.querytabs,
    name: 'Query tabs',
    description:
      'Default is false. This allows a user to load a page with a defined tab open. Using a query on the url, developers can send users to "Tab 2" by the following url: https://website.com/careers?tab2',
    type: 'boolean',
  },
  activeclass: {
    ...SETTINGS.activeclass,
    name: 'Active class',
    description:
      'When a tab item in the menu or content is active, the specified class will be added to this element. This can be placed on the menu element, the content element, or any element nested inside either element. For example, this can be placed on the text element nested inside the menu element.',
    type: 'text',
  },
  timer: {
    ...SETTINGS.timer,
    name: 'Timer',
    description:
      'When set, the slider will automatically change tabs. For example, if set to 3000, every 3 seconds, the tabs component advances to the next slide.',
    type: 'text',
  },
  timerstopclick: {
    ...SETTINGS.timerstopclick,
    name: 'Timer stop-click',
    description:
      'The automatic timer will stop on click by default. The user can set this to false if they never want the timer to stop.',
    type: 'boolean',
  },
  timerstart: {
    ...SETTINGS.timerstart,
    name: 'Timer start',
    description: 'Decides when the automatic timer starts. Default is scroll-into-view.',
    type: 'select',
  },
  name: {
    ...SETTINGS.name,
    name: 'Tab name',
    description:
      'Custom name for each tab by placing an name attribute on a Text Element nested in the item of the fs-tabs-element = menu element. If a user adds fs-tabs-name = green to a Text Element inside the menu, https://website.com/careers#tabs-section?green will open that tab immediately upload load.',
    type: 'text',
  },
  animation: {
    ...SETTINGS.animation,
    name: 'Animation',
    description: 'Default animation for the component. Defaults to no animations if not set.',
    type: 'select',
  },
  easing: {
    ...SETTINGS.easing,
    name: 'Easing',
    description: 'Easing options for the animation. Default is none.',
    type: 'select',
  },
  duration: {
    ...SETTINGS.duration,
    name: 'Duration',
    description: 'Duration of the animation. Default is none.',
    type: 'text',
  },
};

export const SCHEMA: Schema<typeof ELEMENTS, typeof SETTINGS> = {
  groups: [],
  elements: [
    {
      key: 'tabs',
      name: 'Tabs',
      description: 'Wrapper for the menu and content elements.',
      allowedTypes: ['Block'],
      settings: [
        SCHEMA_SETTINGS.animation,
        SCHEMA_SETTINGS.duration,
        SCHEMA_SETTINGS.easing,
        SCHEMA_SETTINGS.querytabs,
        SCHEMA_SETTINGS.activeclass,
        SCHEMA_SETTINGS.timer,
        SCHEMA_SETTINGS.name,
        SCHEMA_SETTINGS.timerstart,
        SCHEMA_SETTINGS.timerstopclick,
      ],
    },
    {
      key: 'menu',
      name: 'Menu',
      description:
        'Collection list element that contains the tab menu items. This is placed on the list wrapper or list element. Clicking on the menu item triggers corresponding item in the content list to show.',
      allowedTypes: ['Block'],
      settings: [],
    },
    {
      key: 'content',
      name: 'Content',
      description: 'Collection list element that contains the tab content items.',
      allowedTypes: ['Block'],
      settings: [],
    },
    {
      key: 'scroll-anchor',
      name: 'Scroll anchor',
      description:
        'On tab change, anchor scroll to [this] element. This is useful for building a full page as a tab component. On each tab change, we can anchor scroll the user to the top of the page.',
      allowedTypes: ['Block'],
      settings: [],
    },
    {
      key: 'omit',
      name: 'Omit',
      description:
        'For Static setups, we may need to omit one of the items. For example, if we used Finsweet Tabs to created a fixed left sidebar, we may want to add category titles to the tab items. In this case we can "omit" or "ignore" any specific item inside a list. This can be placed on an item element inside the "menu" or "content".',
      allowedTypes: ['Block'],
      settings: [],
    },
    {
      key: 'name',
      name: 'Name',
      description:
        'For Static setups, we may need to omit one of the items. For example, if we used Finsweet Tabs to created a fixed left sidebar, we may want to add category titles to the tab items. In this case we can "omit" or "ignore" any specific item inside a list. This can be placed on an item element inside the "menu" or "content".',
      allowedTypes: ['Block'],
      settings: [],
    },
    {
      key: 'timer-interaction',
      name: 'Timer interaction',
      description:
        'When set, this element will be programmatically clicked. This will allow a user to set a Webflow Interaction to match the timer.',
      allowedTypes: ['Block'],
      settings: [],
    },
  ],
};
