# `list` Attribute

Supercharge your Webflow CMS and static lists.

## Getting Started

Please follow the documentation at [finsweet.com/attributes](https://www.finsweet.com/attributes) to learn how to use Attributes in your Webflow projects.

## Accessing the API

To learn how to access the API, please check the general [API Reference](../attributes/README.md#api-reference) documentation:

```javascript
window.FinsweetAttributes ||= [];
window.FinsweetAttributes.push([
  'list',
  (listInstances) => {
    // Your code goes here.
  },
]);
```

The `result` object contains the [List](#the-list-object) instances that are currently active on the page.

## The `List` object

### Reactivity

List instances have a set of [reactive properties](#reactive-properties) powered by [@vue/reactivity](https://vuejs.org/api/reactivity-core.html). These properties allow us to track them and run logic when they change.

### Lifecycle of the items

The items in the list instances follow a lifecycle that is divided into the following phases:

1. `start`: The items are in their initial state.
2. `filter`: The items are being filtered.
3. `sort`: The items are being sorted.
4. `static`: The static items are injected.
5. `pagination`: The items are being paginated.
6. `beforeRender`: The items are about to be rendered.
7. `render`: The items are being rendered.
8. `afterRender`: The items have been rendered.

Not all phases are always executed, as the lifecycle may start at any point depending on the actions taken by the user. For example, if the user interacts with the sorting controls, the lifecycle will start at the `sort` phase. If the user interacts with the pagination controls, the lifecycle will start at the `pagination` phase.

You can hook into any of these phases by using the [List.addHook()](#listaddhookkey-callback) method, allowing you to run custom logic and interact with the items at any point in the lifecycle.

### Adding and removing items from the list

The [List.items](#reactive-properties) property is a [shallowRef](https://vuejs.org/api/reactivity-advanced#shallowref) array that contains the items in the list. You can add and remove items from the list by simply mutating the array:

```javascript
listInstance.items.value = listInstance.items.value.filter((item) => {
  return item.fields.target.value === 'adults';
});
```

To create new item instances, you can use the [List.createItem()](#listcreateitemelement) method, which takes a DOM element as an argument and returns a new [ListItem](#the-listitem-object) instance:

```javascript
const newItem = listInstance.createItem(element);

listInstance.items.value = [...listInstance.items.value, newItem];
```

### Updating the filters

The [List.filters](#reactive-properties) property is a [ref](https://vuejs.org/api/reactivity-core.html#ref) object that contains the filters applied to the list. You can update the filters by simply mutating the object:

```javascript
listInstance.filters.value.groups[0].conditions.push({
  id: 'new-condition',
  type: 'checkbox',
  fieldKey: 'premium',
  op: 'equal',
  value: 'true',
});
```

### Updating the sorting

The [List.sorting](#reactive-properties) property is a [ref](https://vuejs.org/api/reactivity-core.html#ref) object that contains the sorting applied to the list. You can update the sorting by simply mutating the object:

```javascript
listInstance.sorting.value.fieldKey = 'name';
listInstance.sorting.value.direction = 'asc';
```

### Updating the pagination

You can update the pagination by simply mutating the [List.currentPage](#reactive-properties) and/or [List.itemsPerPage](#reactive-properties) properties:

```javascript
listInstance.currentPage.value = 2;
```

### Watching for changes

You can watch for any changes to the [reactive properties](#reactive-properties) using the [List.watch()](#listwatchsource-callback-options) method:

```javascript
listInstance.watch(
  () => listInstance.items,
  (newItems, oldItems) => {
    console.log('Items updated:', newItems, oldItems);
  }
);
```

You can also use the [List.effect()](#listeffectcallback-options) method to run a function whenever the reactive properties change:

```javascript
listInstance.effect(() => {
  console.log('Total items:', listInstance.items.value.length);
});
```

### Reactive properties

| Property        | Reactive Type                                                      | Value Type                         | Description                                          |
| --------------- | ------------------------------------------------------------------ | ---------------------------------- | ---------------------------------------------------- |
| `items`         | [shallowRef](https://vuejs.org/api/reactivity-advanced#shallowref) | [ListItem[]](#the-listitem-object) | The items in the list.                               |
| `filters`       | [ref](https://vuejs.org/api/reactivity-core.html#ref)              | [Filters](#the-filters-object)     | The filters applied to the list.                     |
| `sorting`       | [ref](https://vuejs.org/api/reactivity-core.html#ref)              | [Sorting](#the-sorting-object)     | The sorting applied to the list.                     |
| `currentPage`   | [ref](https://vuejs.org/api/reactivity-core.html#ref)              | `number`                           | The current page number.                             |
| `itemsPerPage`  | [ref](https://vuejs.org/api/reactivity-core.html#ref)              | `number`                           | The amount of items to display on each page.         |
| `totalPages`    | [computed](https://vuejs.org/api/reactivity-core.html#computed)    | `number`                           | The total number of pages.                           |
| `hasInteracted` | [computed](https://vuejs.org/api/reactivity-core.html#computed)    | `number`                           | Defines if the user has interacted with the filters. |
| `allFieldsData` | [computed](https://vuejs.org/api/reactivity-core.html#computed)    | `Object`                           | Defines the data for all item fields in the list.    |

### Standard properties

| Property                        | Type                               | Description                                                                                           |
| ------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `pageIndex`                     | `number`                           | The index of the list in the page.                                                                    |
| `instance`                      | `string \| null`                   | The instance key of the list, if defined using `[fs-list-instance]`.                                  |
| `wrapperElement`                | `HTMLElement`                      | The wrapper element of the list.                                                                      |
| `listElement`                   | `HTMLElement \| null`              | The list element.                                                                                     |
| `paginationWrapperElement`      | `HTMLElement \| null \| undefined` | The pagination wrapper element.                                                                       |
| `paginationCountElement`        | `HTMLElement \| null \| undefined` | The page count element.                                                                               |
| `initialElement`                | `HTMLElement \| null \| undefined` | An initial element to display when there are no filters applied.                                      |
| `loaderElement`                 | `HTMLElement \| null \| undefined` | A custom loader element.                                                                              |
| `itemsCountElement`             | `HTMLElement \| null \| undefined` | An element that displays the total amount of items in the list.                                       |
| `resultsCountElement`           | `HTMLElement \| null \| undefined` | An element that displays the total amount of items after filtering.                                   |
| `visibleCountElement`           | `HTMLElement \| null \| undefined` | An element that displays the amount of visible items.                                                 |
| `visibleCountFromElement`       | `HTMLElement \| null \| undefined` | An element that displays the lower range of visible items.                                            |
| `visibleCountToElement`         | `HTMLElement \| null \| undefined` | An element that displays the upper range of visible items.                                            |
| `scrollAnchorElement`           | `HTMLElement \| null \| undefined` | The scroll anchor element.                                                                            |
| `scrollAnchorFilterElement`     | `HTMLElement \| null \| undefined` | A custom scroll anchor element for filter actions.                                                    |
| `scrollAnchorSortElement`       | `HTMLElement \| null \| undefined` | A custom scroll anchor element for sort actions.                                                      |
| `scrollAnchorPaginationElement` | `HTMLElement \| null \| undefined` | A custom scroll anchor element for pagination actions.                                                |
| `initialItemsPerPage`           | `number`                           | Defines the original amount of items per page.                                                        |
| `showQuery`                     | `boolean`                          | Defines if the filtering, sorting and pagination state should be added to the URL.                    |
| `highlight`                     | `boolean \| undefined`             | Defines if the matched fields when filtering should be highlighted.                                   |
| `cache`                         | `boolean`                          | Defines if loaded Items can be cached using IndexedDB after fetching them.                            |
| `webflowModules`                | `Set<WebflowModule>`               | Defines the Webflow modules to restart after rendering.                                               |
| `paginationSearchParam`         | `string \| undefined`              | Defines the URL query key for the paginated pages.                                                    |
| `searchParamsPrefix`            | `string`                           | Defines the query prefix for all the list's query params.                                             |
| `loadingSearchParamsData`       | `Promise<void> \| undefined`       | An awaitable Promise that resolves once the pagination data has been retrieved.                       |
| `loadingPaginationElements`     | `Promise<void> \| undefined`       | An awaitable Promise that resolves once the pagination elements have been loaded.                     |
| `loadingPaginatedItems`         | `Promise<void> \| undefined`       | An awaitable Promise that resolves once all the Webflow CMS paginated items have been loaded.         |
| `readingFilters`                | `boolean \| undefined`             | Defines if the filter field values are being collected from the DOM or event listeners are being set. |
| `settingFilters`                | `boolean \| undefined`             | Defines if the filter field values are being set to the DOM.                                          |

### Methods

#### `List.addHook(key, callback)`

The `addHook` method allows you to add a custom hook to the list instance. The hook will be called when the specified phase is reached.

It takes two arguments:

- `key` (string): The key of the hook. This should be one of the lifecycle phases: `start`, `filter`, `sort`, `pagination`, `beforeRender`, `render`, or `afterRender`.
- `callback` (function): The callback function that will be called when the hook is reached. The callback function receives as an argument the array of [items](#the-listitem-object) returned from the previous phase and accepts an array of items to be returned as well. If the callback function returns a promise, the list instance will wait for the promise to resolve before continuing with the lifecycle.

```javascript
// Ensure that only items for the current target are displayed
listInstance.addHook('filter', (items) => {
  const isAdult = localStorage.getItem('isAdult') === 'true';

  const filteredItems = items.filter((item) => {
    return isAdult ? item.fields.target.value === 'adults' : item.fields.target.value === 'kids';
  });

  return filteredItems;
});
```

#### `List.triggerHook(key)`

The `triggerHook` method allows you to trigger a specific lifecycle phase. This is useful if you want to manually trigger a phase without waiting for the user to interact with the list:

```javascript
const isAdultButton = document.querySelector('#isAdultButton');

isAdultButton.addEventListener('click', () => {
  localStorage.setItem('isAdult', 'true');
  listInstance.triggerHook('filter');
});
```

#### `List.createItem(element)`

The `createItem` method creates a new [ListItem](#the-listitem-object) instance from a given DOM element. See [adding and removing items from the list](#adding-and-removing-items-from-the-list) for more details.

#### `List.watch(source, callback, options)`

The `watch` method from the [@vue/reactivity](https://vuejs.org/api/reactivity-core.html#watch).

#### `List.effect(callback, options)`

The `effect` method from the [@vue/reactivity](https://vuejs.org/api/reactivity-core.html#watcheffect).

#### `List.destroy()`

The `destroy` method destroys the list instance. This will remove all event listeners and reactivity tracking.

## The `ListItem` object

The `ListItem` class represents a single collection item within a list. It contains data about the item's fields, DOM elements, and provides methods for interacting with the item.

### Properties

| Property         | Type                         | Description                                                             |
| ---------------- | ---------------------------- | ----------------------------------------------------------------------- |
| `id`             | `string`                     | A unique ID for the item.                                               |
| `element`        | `CollectionItemElement`      | The DOM element of the collection item.                                 |
| `list`           | `List`                       | Reference to the parent List instance.                                  |
| `currentIndex`   | `number \| undefined`        | The element's current index in the rendered DOM.                        |
| `href`           | `string \| undefined`        | The URL of the item's `Template Page` if it exists.                     |
| `fields`         | `ListItemFields`             | Contains the item's field data.                                         |
| `nesting`        | `Promise<void> \| undefined` | An awaitable Promise that resolves when the item's nesting is complete. |
| `startingClass`  | `string`                     | The class to apply before rendering the item.                           |
| `highlightClass` | `string`                     | The class to apply when highlighting matched fields during filtering.   |
| `stagger`        | `number \| undefined`        | Defines a stagger delay for the item's transitions.                     |

### Field Types

Fields that are defined using the `fs-list-field` attribute are stored in the `ListItem.fields` property. By default fields are typed as text, but they can be defined as numbers or dates using the `fs-list-fieldtype` attribute.

```typescript
type ListItemFields = {
  [fieldKey: string]: ListItemField;
};

type ListItemField =
  | {
      type: 'text';
      rawValue: string | string[];
      value: string | string[];
    }
  | {
      type: 'date';
      rawValue: string | string[];
      value: Date | Date[];
    }
  | {
      type: 'number';
      rawValue: string | string[];
      value: number | number[];
    };
```

### Methods

#### `ListItem.collectFields()`

The `collectFields` method scans the item's DOM element for field elements, extracts their values, and stores them in the `ListItem.fields` property.

## The `Filters` object

The `Filters` object contains the definition of the filters applied to the list.

```typescript
type Filters = {
  groupsMatch?: FilterMatch; // The match type for the groups. Defaults to 'and'.
  groups: FiltersGroup[];
};

type FilterMatch = 'and' | 'or';

type FiltersGroup = {
  id: string; // A unique identifier for the group.
  conditionsMatch: FilterMatch; // The match type for the group conditions. Defaults to 'and'.
  conditions: FiltersCondition[];
};

type FiltersCondition = {
  id: string; // A unique identifier for the condition.
  type: string; // The form field type.
  fieldKey: string; // The field key of the condition.
  value: string | string[]; // The value of the condition.
  op?: FilterOperator; // The operator to use for the condition. Defaults to `contain`.
  filterMatch?: FilterMatch; // The match type for the value, in case of multiple condition values. Defaults to `or`.
  fieldMatch?: FilterMatch; // The match type for the field, in case of multiple field values. Defaults to `or`.
  fuzzyThreshold?: number; // The threshold for fuzzy matching.
  interacted?: boolean; // If the user has interacted with the form field.
  customTagField?: string; // A custom field name to display in the tags.
};

type FilterOperator =
  | 'start'
  | 'empty'
  | 'equal'
  | 'not-equal'
  | 'contain'
  | 'not-contain'
  | 'not-start'
  | 'end'
  | 'not-end'
  | 'greater-equal'
  | 'greater'
  | 'less-equal'
  | 'less'
  | 'not-empty';
```

## The `Sorting` object

The `Sorting` object contains the definition of the sorting applied to the list.

```typescript
type Sorting = {
  fieldKey?: string;
  direction?: 'asc' | 'desc';
  interacted?: boolean;
};
```

## License

[Apache 2.0](../../LICENSE.md)
