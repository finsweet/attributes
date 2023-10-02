
<div align="center">
  <img src='https://placehold.co/600x200/000000/FFFFFF.png?text=Finsweet+Attributes\n::+Internal+utils&font=Source Sans Pro' alt="Project logo">
</div>

<h3 align="center">@finsweet/attributes</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/finsweet/The-Documentation-Compendium.svg)](https://github.com/finsweet/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/finsweet/The-Documentation-Compendium.svg)](https://github.com/finsweet/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A collection of internal utils used by the Finsweet Attributes package.
    <br>
</p>

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About](#about)
- [🚀 Utils](#utils)
  - [Animations](#animations)
  - [Components](#components)
  - [Constants](#constants)
  - [Helpers](#helpers)
    - [Arrays](#arrays)
  - [Types](#types)
- [✍️ Authors](#️-authors)
- [🎉 Acknowledgements](#-acknowledgements)

## 🧐 About

This package is a collection of internal utils used by the Finsweet Attributes package to help existing and future developers to maintain and improve the codebase. It is not intended to be used by anyone outside of the Finsweet team.

## 🚀 Utils

Below is a list of all the util collections included in this package. Each util is a function that can be imported and used in your code.

### A). Animations

#### 1. Factory

- **createAnimation({ initialStyles, keyframes }: AnimationProps)** <br>- Creates a new animation and returns the animation name.

  **Parameters:**

  > - **initialStyles** - The initial styles of the animation.
  > - **keyframes** - The keyframes of the animation.

  **Returns:**
  > `AnimationFunction` - The animation functions that can be used to animate an element. i.e { prepareIn, animateIn, animateOut }

#### 2. Types

- **AnimationProps**
- **AnimationFunctions**
- **Animation**
- **AnimationsObject**
- **Easings**

### B). Components

#### 1. Copy JSON Button

- **class CopyJSONButton**
  
    **Parameters:**
  
    > - **element**: HTMLElement
    > - **copyData**: Record<string, unknown>
    > - **successText**: string
    > - **errorText**: string
    > - **notificationDuration**: number
    > - **successCSSClass**: string

#### 2. Interaction

- **interface InteractionParams**
- **class Interaction**

    **Methods:**

    > - **trigger(click?: 'first' | 'second')**: Promise<boolean>
    > - **isActive()**: boolean
    > - **isRunning()**: boolean
    > - **untilFinished()**: Promise<unknown>

### C). Constants

#### 1. a11y

i. ARIA_ROLE_KEY : `string`
ii. ARIA_ROLE_VALUES : `{slider: string; listbox: string; option: string; columnheader: string; link: string; marquee: string; button: string; radiogroup: string; dialog: string;}`
iii. TABINDEX_KEY : `string`
iv. ARIA_LABEL_KEY : `string`
v. ARIA_LABELLEDBY_KEY : `string`
vi. ARIA_VALUENOW_KEY : `string`
vii. ARIA_VALUEMIN_KEY : `string`
viii. ARIA_VALUEMAX_KEY : `string`
ix. ARIA_SELECTED_KEY  : `string`
x. ARIA_HASPOPUP_KEY : `string`
xi. ARIA_MULTISELECTABLE_KEY : `string`
xii. ARIA_EXPANDED_KEY : `string`
xiii. ARIA_CURRENT_KEY : `string`
xiv. ARIA_ACTIVEDESCENDANT_KEY : `string`
xv. ARIA_PRESSED_KEY : `string`
xvi. ARIA_CONTROLS_KEY : `string`
xvii. ARIA_OWNS_KEY : `string`
xviii. ARIA_ROLEDESCRIPTION_KEY : `string`
xix. ARIA_DESCRIPTION_KEY : `string`
xx. ARIA_HIDDEN_KEY : `string`
xxi. AUTOCOMPLETE_KEY : `string`
xxii. AUTOCAPITALIZE_KEY : `string`
xxiii. ARIA_AUTOCOMPLETE_KEY : `string`
xxiv. ROLE_KEY : `string`
xxv. REQUIRED_KEY : `string`
xxvi. NAME_KEY : `string`
xxvii. ARIA_SETSIZE_KEY : `string`
xxviii. ARIA_POSINSET_KEY : `string`
xxix. ID_KEY : `string`
xxx. ARIA_MODAL_KEY : `string`
xxxi. ARIA_MODAL_VALUES : `{true: string;}`
xxxii. ARIA_SORT_KEY : `string`
xxxiii. ARIA_SORT_VALUES : `{ascending: string; descending: string;}`
xxxiv. CONTENT_EDITABLE_KEY : `string`

#### 2. Attributes

i. A11Y_ATTRIBUTE : `string`
ii. ACCORDION_ATTRIBUTE : `string`
iii. ANIMATION_ATTRIBUTE : `string`
iv. AUTO_VIDEO_ATTRIBUTE : `string`
v. CMS_ATTRIBUTE_ATTRIBUTE : `string`
vi. CMS_COMBINE_ATTRIBUTE : `string`
vii. CMS_CSS_ATTRIBUTE : `string`
viii. CMS_FILTER_ATTRIBUTE : `string`
ix. CMS_LOAD_ATTRIBUTE : `string`
x. CMS_NEST_ATTRIBUTE : `string`
xi. CMS_PREV_NEXT_ATTRIBUTE : `string`
xii. CMS_STATIC_ATTRIBUTE : `string`
xiii. CMS_SELECT_ATTRIBUTE : `string`
xiv. CMS_SLIDER_ATTRIBUTE : `string`
xv. CMS_SORT_ATTRIBUTE : `string`
xvi. CMS_TABS_ATTRIBUTE : `string`
xvii. CODE_HIGHLIGHT_ATTRIBUTE : `string`
xviii. COMBO_BOX_ATTRIBUTE : `string`
xix. COMPONENT_ATTRIBUTE : `string`
xx. CONSENT_ATTRIBUTE : `string`
xxi. COPY_CLIP_ATTRIBUTE : `string`
xxii. COUNT_ITEMS_ATTRIBUTE : `string`
xxiii. DISPLAY_VALUES_ATTRIBUTE : `string`
xxiv. DOCS_ATTRIBUTE : `string`
xxv. FAV_CUSTOM_ATTRIBUTE : `string`
xxvi. FORM_SUBMIT_ATTRIBUTE : `string`
xxvii. INPUT_ACTIVE_ATTRIBUTE : `string`
xxviii. INPUT_COUNTER_ATTRIBUTE : `string`
xxix. GREENHOUSE_ATTRIBUTE : `string`
xxx. LINK_BLOCK_EDIT_ATTRIBUTE : `string`
xxxi. MIRROR_CLICK_ATTRIBUTE : `string`
xxxii. MIRROR_INPUT_ATTRIBUTE : `string`
xxxiii. MODAL_ATTRIBUTE : `string`
xxxiv. NUMBER_COUNT_ATTRIBUTE : `string`
xxxv. LAUNCHDARKLY_ATTRIBUTE : `string`
xxxvi. QUERY_PARAM_ATTRIBUTE : `string`
xxxvii. RANGE_SLIDER_ATTRIBUTE : `string`
xxxviii. RICH_TEXT_ATTRIBUTE : `string`
xxxix. SCROLL_DISABLE_ATTRIBUTE : `string`
xl. SELECT_CUSTOM_ATTRIBUTE : `string`
xli. SLIDER_ATTRIBUTE : `string`
xlii. SLIDER_DOTS_ATTRIBUTE : `string`
xliii. SMART_LIGHTBOX_ATTRIBUTE : `string`
xliv. SOCIAL_SHARE_ATTRIBUTE : `string`
xlv. STAR_RATING_ATTRIBUTE : `string`
xlvi. SUPPORT_ATTRIBUTE : `string`
xlvii. TOC_ATTRIBUTE : `string`
xlviii. READ_TIME_ATTRIBUTE : `string`
xlix. VIDEO_HLS_ATTRIBUTE : `string`

#### 3. Keyboard

i. SPACE_KEY : `string`
ii. ENTER_KEY : `string`
iii. ESCAPE_KEY : `string`
iv. TAB_KEY : `string`
v. CLICK : `string`
vi. BACKSPACE_KEY : `string`
vii. ARROW_UP_KEY : `string`
viii. ARROW_DOWN_KEY : `string`
ix. ARROW_RIGHT_KEY : `string`
x. ARROW_LEFT_KEY : `string`

#### 4. Webflow

i. CURRENT_CSS_CLASS : `string`
ii. RICH_TEXT_BLOCK_CSS_CLASS : `string`
iii. HTML_EMBED_CSS_CLASS : `string`
iv. SLIDER_CSS_CLASSES : `{slider: string; slide: string; sliderMask: string; sliderNav: string; sliderDot: string; activeSliderDot: string;}`
v. TABS_CSS_CLASSES : `{tabs: string; tabsContent: string; tabPane: string; tabsMenu: string; tabLink: string; activeTab: string;}`
vi. NAVBAR_CSS_CLASSES : `{navMenu: string;}`
vii. CMS_CSS_CLASSES : `{wrapper: string; list: string; item: string; paginationWrapper: string; paginationNext: string; paginationPrevious: string; pageCount: string; emptyState: string;}`
viii. FORM_CSS_CLASSES : `{formBlock: string; checkboxField: string; checkboxInput: string; radioField: string; radioInput: string; checkboxOrRadioLabel: string; checkboxOrRadioFocus: string; checkboxOrRadioChecked: string; successMessage: string; errorMessage: string;}`
ix. DROPDOWN_CSS_CLASSES : `{dropdown: string; dropdownToggle: string; dropdownList: string;}`
x. COMMERCE_CSS_CLASSES : `{addToCartForm: string;}`
xi. LIGHTBOX_CSS_CLASSES : `{trigger: string;}`
xii. WEBFLOW_BREAKPOINTS : `Map<WebflowBreakpoint, string>`

### D). Helpers

This collection of utils is a set of functions that help with common tasks. They are not specific to any particular part of the codebase.

#### 1. Arrays

- **sameValues(array1: unknown[], array2: unknown[])** <br>- Returns `true` if both arrays have the same values, `false` otherwise.

#### 2. CMS

- **getCMSElementSelector(key: keyof typeof [CMS_CSS_CLASSES](#cms_css_classes))** <br>- Returns the CMS object from the window object. If the CMS is not found, it returns `null`.
  
  **Parameters:**

  > - **key** - The key / class of the CMS object to return.

  **Returns:**
  
  > `string` - A CSS selector for a CMS element

- **getCollectionListWrappers(selectors: Array<string | null | undefined>, page = document)** <br>- Queries `Collection List Wrapper` elements and makes sure they are unique.
  
  **Parameters:**

  > - **selectors** - The selectors used for the query. If an empty array is provided, all `Collection List Wrapper` elements will be returned.
  > - **page** - The document where to perform the query.

  **Returns:**

  > `CollectionListWrapperElement[]` - A unique list of `Collection List Wrapper` elements.

- **getCollectionElements(reference: string | Element, target: 'wrapper' | 'list' | 'items' | 'empty' | 'pagination' | 'next' | 'previous' | 'pageCount', page: Document = document)** <br>- This helper is intended to allow users setting the selectors to either the `Collection List Wrapper` or the `Collection List` elements.

  **Parameters:**

  > - **reference** - The element or selector of the element.
  > - **target** - The requested element/elements. It can be either the `Collection List Wrapper`, the `Collection List` or all the `Collection Item` elements.
  > - **page** - The page document.

  **Returns:**

  > `CollectionListWrapperElement | CollectionListElement | CollectionItemElement[] | PaginationButtonElement | PageCountElement | CollectionEmptyElement | null | undefined` -The specified collection element/elements.

#### 3. Dates

- **normalizeDate(value: string)** <br>- Converts a string to a `Date` and returns a formatted version.

  **Parameters:**

  > - **value** - The date string to convert.

  **Returns:**

  > `DateConstructor` - The date object with the converted date.

#### 4. DOM

- **ensureUniqueId(element: Element)** <br>- Ensures that an element has a unique ID. If the element already has a unique ID, that one is preserved.

  **Parameters:**

  > - **element** - The element to ensure a unique ID for.

  **Returns:**

  > `unknown` - The unique ID assigned to the element.

- **isVisible(element: HTMLElement)** <br>- Checks if an element is visible.

  **Parameters:**

  > - **element** - The element to check.

  **Returns:**

  > `boolean` - `true` if the element is visible, `false` otherwise.

- **cloneNode(node: T, deep = true)** <br>- Clones a node and returns the clone.

  **Parameters:**

  > - **node** - The node to clone.
  > - **deep** - If `true`, the children of the node will also be cloned.

  **Returns:**

  > `T` - The cloned node of type `Node`.

- **findTextNode(element: HTMLElement)** <br>- Finds the first child text node of an element.

  **Parameters:**

  > - **element: `HTMLElement`** - The element to search into.

  **Returns:**

  > `ChildNode | undefined` - The first text node of the element or `undefined` if none is found.

- **getHiddenParent(element: HTMLElement)** <br>- Finds the first hidden parent of an element.

  **Parameters:**

  > - **element: `HTMLElement`** - The element to search into.

  **Returns:**

  > `HTMLElement | undefined` - The first hidden parent element, or the element itself (if hidden). If the element is already visible, the function returns `undefined`.

- **isScrollable(element: Element)** <br>- Checks if an element is scrollable.

  **Parameters:**

  > - **element** - The element to check.

  **Returns:**

  > `boolean` - `true` if the element is scrollable, `false` otherwise.

#### 5. Events

- **addListener(target: TargetInterface | null | undefined, type: Type, listener: Listener, options?: boolean | AddEventListenerOptions)** <br>- Adds an event listener to a target.

  **Parameters:**

  > - **target** - The target to add the event listener to.
  > - **type** - The type of event to listen for.
  > - **listener** - The function to call when the event is triggered.
  > - **options** - An object that specifies characteristics about the event listener.

  **Returns:**
  > `void` - A callback to remove the event listener from the element.

- **simulateEvent(target: EventTarget, events: AllowedEvent | Array<AllowedEvent>)** <br>- Dispatches a custom event that bubbles from the target.

  **Parameters:**

  > - **target** - The element where the event will originate.
  > - **events** - The event name or an array of event names.

  **Returns:**
  > `boolean` - True if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.

#### 6. Fetch

- **fetchPageDocument(source: string | URL,{cache = true,cacheExternal,cacheKey,    cacheVersion,}: { cache?: boolean; cacheExternal?: boolean; cacheKey?: string;cacheVersion?: number } = {})** <br>- Fetches and parses an external page. Stores the page response in an `{@link IDBDatabase}` if the page belongs to the same site.

  **Parameters:**

  > - **source** - The URL of the page to fetch.
  > - **cache** - Whether to cache fetched documents. Defaults to `true`.
  > - **cacheExternal** - Whether to cache external documents. If set to true, it will follow a [stale-while-revalidate](https://web.dev/stale-while-revalidate/) strategy.
  > - **cacheKey** - Defines a manual database name for the IndexedDB instance.
  > - **cacheVersion** - Defines a manual version for the IndexedDB instance.

  **Returns:**
  > `Promise<Document | null>` - A promise that resolves to the page's {@link Document} if successful, `null` otherwise.

#### 7. Forms

- **clearFormField(field: FormField, omitEvents: Parameters<typeof simulateEvent>['1'] = [])** <br>- Clears the form field's value and emits an input and changed event.

  **Parameters:**

  > - **field** - The `FormField` to clear.
  > - **omitEvents** - By default, events are dispatched from the `FormField`. In some cases, these events might collide with other logic of the system. You can omit certain events from being dispatched by passing them in an array.

  **Returns:**
  > `void` - Nothing.

- **getFormFieldValue(input: FormField)** <br>- Gets the value of a given input element.

  **Parameters:**

  > - **input** - The `FormField` to get the value from.

  **Returns:**
  > `string | null` - The value of the form field.

- **setFormFieldValue = (element: FormField, value: string | boolean)** <br>- Sets a value to a FormField element and emits `click`, `input` and `change` Events.

  **Parameters:**

  > - **element** - The `FormField` to update.
  > - **value** - `boolean` for Checkboxes and Radios, `string` for the rest.

  **Returns:**
  > `void` - Nothing.

#### 8. Guards

- **isString(value: unknown)** <br>- Checks if a value is a string.

  **Parameters:**

  > - **value** - The value to check.

  **Returns:**
  > `boolean` - `true` if the value is a string, `false` otherwise.

- **isNumber(value: unknown)** <br>- Checks if a value is a number.
  
    **Parameters:**
  
    > - **value** - The value to check.
  
    **Returns:**
    > `boolean` - `true` if the value is a number, `false` otherwise.

- **isBoolean(value: unknown)** <br>- Checks if a value is a boolean.

    **Parameters:**

    > - **value** - The value to check.
  
    **Returns:**
    > `boolean` - `true` if the value is a boolean, `false` otherwise.

- **isUndefined(value: unknown)** <br>- Checks if a value is undefined.
  
    **Parameters:**
  
    > - **value** - The value to check.
  
    **Returns:**
    > `boolean` - `true` if the value is undefined, `false` otherwise.

- **noop()** <br>- It literally does nothing.

    **Parameters:**
  
    > - None
  
    **Returns:**
    > `void` - Nothing.

- **isNotEmpty(value: T | null | undefined)** <br>- Makes sure a value is not `null` or `undefined`. Useful for type safety when filtering empty elements from an array. Check out the example for more in-depth explanation.

    **Parameters:**
  
    > - **value** - The value to check.
  
    **Returns:**
    > `boolean` - `true` if the value is not empty, `false` otherwise.

- **isKeyOf(key: string | null | undefined,source: readonly T[])** <br>- Checks if a key is included in a readonly array.

    **Parameters:**
  
    > - **key** - The key to check.
    > - **source** - Readonly array of strings.
  
    **Returns:**
    > `boolean` - `true` if the key is part of the list, `false` otherwise.

- **getObjectKeys(object: T)** <br>- Gets the keys of an object with inferred typing.

    **Parameters:**
  
    > - **object** - The object to get the keys from.
  
    **Returns:**
    > `(keyof T)[]` - The names of the enumerable string properties and methods of an object.

- **getObjectEntries(object: T)** <br>- Gets the entries of an object with inferred typing.

    **Parameters:**
  
    > - **object** - The object to get the entries from.
  
    **Returns:**
    > `Entry<T>[]` - An array of key/value pairs for every enumerable string property and method of an object.

- **isElement(target: unknown)** <br>- Checks if a value is an element.

    **Parameters:**
  
    > - **target** - The target to check if it is an element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of Element type, `false` otherwise.

- **isHTMLElement(target: unknown)** <br>- Checks if a value is an HTML element.
  
    **Parameters:**
  
    > - **target** - The target to check if it is an HTML element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLElement type, `false` otherwise.

- **isHTMLVideoElement(target: unknown)** <br>- Checks if a value is an HTML video element.
  
    **Parameters:**
  
    > - **target** - The target to check if it is an HTML video element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLVideoElement type, `false` otherwise.

- **isHTMLInputElement(target: unknown)** <br>- Checks if a value is an HTML input element.
  
    **Parameters:**
  
    > - **target** - The target to check if it is an HTML input element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLInputElement type, `false` otherwise.

- **isHTMLSelectElement(target: unknown)** <br>- Checks if a value is an HTML select element.
  
    **Parameters:**
  
    > - **target** - The target to check if it is an HTML select element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLSelectElement type, `false` otherwise.

- **isHTMLTextAreaElement(target: unknown)** <br>- Checks if a value is an HTML textarea element.

    **Parameters:**
  
    > - **target** - The target to check if it is an HTML textarea element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLTextAreaElement type, `false` otherwise.

- **isFormField(element: Element | EventTarget | null)** <br>- Checks if a value is a FormField element.

    **Parameters:**
  
    > - **element** - The element to check if it is a FormField element.
  
    **Returns:**
    > `boolean` - `true` if the element is a FormField element, `false` otherwise.

- **isHTMLAnchorElement(target: unknown)** <br>- Checks if a value is an HTML anchor element.

    **Parameters:**
  
    > - **target** - The target to check if it is an HTML anchor element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLAnchorElement type, `false` otherwise.

- **isHTMLOptionElement(target: unknown)** <br>- Checks if a value is an HTML option element.

    **Parameters:**
  
    > - **target** - The target to check if it is an HTML option element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLOptionElement type, `false` otherwise.

- **isHTMLImageElement(target: unknown)** <br>- Checks if a value is an HTML image element.

    **Parameters:**
  
    > - **target** - The target to check if it is an HTML image element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLImageElement type, `false` otherwise.

- **isHTMLButtonElement(target: unknown)** <br>- Checks if a value is an HTML button element.

    **Parameters:**
  
    > - **target** - The target to check if it is an HTML button element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLButtonElement type, `false` otherwise.

- **isFile(target: unknown)** <br>- Checks if a value is a File object.

    **Parameters:**
  
    > - **target** - The target to check if it is a File object.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of File type, `false` otherwise.

#### 9. HTML

- **unescapeHTML(rawHTML: string)** <br>- Replaces escaped HTML symbols with their original value.

    **Parameters:**
  
    > - **rawHTML** - The raw HTML to unescape.
  
    **Returns:**
    > `string` - The unescaped string.

#### 10. Numbers

- **normalizeNumber(value: string)** <br>- Converts a string to a number, removing any invalid symbols like `$` or `,`.

    **Parameters:**
  
    > - **value** - The number string to convert.
  
    **Returns:**
    > `number` - The valid number value.

- **parseNumericAttribute(rawValue: string | number | null | undefined,fallback?: number | null)** <br>- Parses a numeric attribute string.

    **Parameters:**
  
    > - **rawValue** - The raw string. Example: "20", "-25.3"...
    > - **fallback** - A value to fall back to when the parsed value is not valid.

    **Returns:**
    > `number | null` - The parsed number or the fallback value.

- **getDecimalPrecision(value: number)** <br>- Gets the decimal precision of a number.

    **Parameters:**
  
    > - **value** - The number to get the decimal precision from.
  
    **Returns:**
    > `number` - The decimal precision.

- **setDecimalPrecision(value: number, precision: number)** <br>- Sets the decimal precision of a number.

    **Parameters:**
  
    > - **value** - The number to set the decimal precision to.
    > - **precision** - The decimal precision to set.

    **Returns:**
    > `number` - The number with the new decimal precision.

- **adjustValueToStep(value: number, step: number, precision?: number, minRange = 0)** <br>- Adjusts a value to a given step factor.

    **Parameters:**
  
    > - **value** - The numeric value to adjust.
    > - **step** - The increment step.
    > - **precision** - The step's decimal precision. If not provided, it will be calculated.
    > - **minRange** - A minimum range value, used for offsetting.

    **Returns:**
    > `number` - The adjusted value.

#### 11. Props

- **normalizePropKey(propKey?: string | null)** <br>- Normalizes a property key by trimming and converting it to lowercase.

    **Parameters:**
  
    > - **propKey** - The property key to normalize.
  
    **Returns:**
    > `string | null` - The normalized property key.

#### 12. Selectors

- **generateSelectors(attributeKey: FsAttributeKey, elements: ElementsDefinition, settings: SettingsDefinition)** <br>- Selector helpers for the defined Attribute Elements and Settings.

    **Parameters:**
  
    > - **attributeKey** - The attribute key to generate the selectors for.
    > - **elements** - The elements definition.
    > - **settings** - The settings definition.

    **Returns:**
    > `object<unknown>` - The generated selectors. i.e `getElementSelector`, `getSettingSelector`, `getSettingAttributeName`, `queryElement`, `queryAllElements`, `getInstanceIndex`, `getAttribute`, `hasAttributeValue`,

    **Example:**

    ```js
    // selectors.ts
    ...
    export const { queryElement, queryAllElements, getInstanceIndex } = generateSelectors(
      EXAMPLE_ATTRIBUTE,
      ELEMENTS,
      SETTINGS
    );
    ```

#### 13. Urls

- **removeTrailingSlash(value: string)** <br>- Removes the trailing slash from a URL.

    **Parameters:**
  
    > - **value** - The URL to remove the trailing slash from.
  
    **Returns:**
    > `string` - The URL without the trailing slash.

#### 14. Wait

- **wait(time: number)** <br>- A promise that resolves after a given amount of time.

    **Parameters:**
  
    > - **time** - The amount of time to wait in milliseconds.
  
    **Returns:**
    > `Promise<unknown>` - A promise that resolves after the given amount of time.

- **waitAttributeLoaded(key: FsAttributeKey)** <br>- A promise that resolves when the attribute is loaded.

    **Parameters:**
  
    > - **key** - The attribute key to wait for.
  
    **Returns:**
    > `Promise<unknown>` - A promise that resolves when the attribute is loaded.

- **waitWebflowReady()** <br>- A promise that resolves when Webflow has fully loaded.

    **Parameters:**
  
    > - None
  
    **Returns:**
    > `Promise<unknown>` - A promise that resolves when Webflow is ready.

- **waitDOMReady()** <br>- A promise that resolves once the DOM is ready.

    **Parameters:**
  
    > - None
  
    **Returns:**
    > `Promise<unknown>` - A promise that resolves when the DOM is ready.

#### 15. Webflow

- **getSiteId(page = document)** <br>- Gets the webflow site ID of the website.

    **Parameters:**
  
    > - **page** - The page document.
  
    **Returns:**
    > `string | null` - The site ID or `null` if not found.

- **getPublishDate = (page = document)** <br>- Extracts the publish date of a Webflow site.

    **Parameters:**
  
    > - **page** - The page to get the publish date from. Defaults to the current page.
  
    **Returns:**
    > `Date | undefined` - The publish date or `undefined` if not found.

- **restartWebflow(modules?: WebflowModule[])** <br>- Restarts the Webflow JS library.

    **Parameters:**
  
    > - **modules** - An array of {@link WebflowModule} to restart. If passed, only those modules will be restarted instead of the whole `Webflow` instance. i.e `['ix2','commerce','lightbox','slider','tabs']`
  
    **Returns:**
    > `Promise<void>` - An awaitable promise that is fulfilled when the library has been correctly reinitialized.

- **getCurrentBreakpoint()** <br>- Checks the current breakpoint based on the window media.

    **Parameters:**
  
    > - None
  
    **Returns:**
    > `string` - A `{@link WebflowBreakpoint}` string.

- **closeDropdown(dropdownToggle: DropdownToggle, focusToggle = true)** <br>- Closes a webflow dropdown menu.

    **Parameters:**
  
    > - **dropdownToggle** - The `DropdownToggle` element.
    > - **focusToggle** - Whether to focus the toggle element. Defaults to `true`.

    **Returns:**
    > `void` - Nothing.

### E). Types

#### 1. Base

- **FsAttributeKey** <br>- A string that represents the key of an attribute.
- **AttributeElements** <br>- An object that represents the elements of an attribute.
- **AttributeSettings** <br>- An object that represents the settings of an attribute.
- **FsAttributes** <br>- An object that represents the attributes instance.
- **FsAttributesCallback**
- **FsAttributeControls**
-**FsAttributeInit**

#### 2. Changesets

- **AttributeChangesets**

#### 3. DOM

- **FormField**

#### 4. Examples

- **AttributeExamples**

#### 5. Schemas

- **SchemaGroups**
- **SchemaSettings<Settings extends AttributeSettings>**
- **Schema<Elements extends AttributeElements, Settings extends AttributeSettings>**

#### 6. Utils

- **Entry<T>**
- **MapEntries<MapToConvert>**

#### 7. Webflow

// Includes methods of the Webflow.js object

- **WebflowModule**
- **Webflow extends Pick<Callback[], 'push'>**

// CMS

- **CollectionListWrapperElement**
- **CollectionListElement**
- **CollectionItemElement**
- **CollectionEmptyElement**
- **PaginationWrapperElement**
- **PaginationButtonElement**
- **PageCountElement**

// Forms

- **FormBlockElement**
- **FormSuccessElement**
- **FormErrorElement**

// Sliders

- **SliderElement**
- **SliderMaskElement**
- **SlideElement**
- **SliderArrowElement**
- **SliderNavElement**
- **SliderDotElement**

// Tabs

- **TabsElement**
- **TabsMenuElement**
- **TabLinkElement**
- **TabsContentElement**
- **TabPaneElement**

// Rich Text Block

- **RichTextBlockElement**

// Dropdowns

- **Dropdown**
- **DropdownToggle**
- **DropdownList**

// The default Webflow Breakpoint names.

- **WebflowBreakpoint** <br>- `'main' | 'medium' | 'small' | 'tiny'`

## ✍️ Authors

- [@author](https://github.com) - Collection & documentation

See also the list of [contributors](https://github.com) who participated in this project.

## 🎉 Acknowledgements

- Hat tip to anyone whose code was used
- Inspiration
- References
