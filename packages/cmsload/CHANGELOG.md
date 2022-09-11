# @finsweet/attributes-cmsload

## 1.7.8

### Patch Changes

- Updated dependencies [299fd136]
  - @finsweet/attributes-cmscore@1.6.10

## 1.7.7

### Patch Changes

- Updated dependencies [7542dcdb]
  - @global/constants@1.0.2
  - @global/factory@1.1.3
  - @global/import@1.0.2
  - @finsweet/attributes-cmscore@1.6.9

## 1.7.6

### Patch Changes

- Updated dependencies [bdd1a78]
  - @global/constants@1.0.1
  - @global/factory@1.1.2
  - @global/import@1.0.1
  - @finsweet/attributes-cmscore@1.6.8

## 1.7.5

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-cmscore@1.6.7

## 1.7.4

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmscore@1.6.7

## 1.7.3

### Patch Changes

- 8f9d08d: Added `fs-cmsload-element="empty"` attribute.
  Defines the Empty State element for when there are no elements to show.

## 1.7.2

### Patch Changes

- 7f509db: Fixed typo in the API docs

## 1.7.1

### Patch Changes

- Selector for Collection List updated in schema.

## 1.7.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.6.3

### Patch Changes

- Added missing `await` to `infinite` and `load-under` modes to make sure that the `window.fsAttributes.push()` callbacks don't run until all items have been loaded.

## 1.6.2

### Patch Changes

- Added [API docs](https://www.npmjs.com/package/@finsweet/attributes-cmsload).

## 1.6.1

### Patch Changes

- Renamed `fs-cmsload-element="page-count"` to `fs-cmsload-element="visible-count"` to be more descriptive.

## 1.6.0

### Minor Changes

- Added new `fs-cmsload-element="page-count"`.
  When defined, this element will display the amount of items currently displayed on the screen.
  This is very useful in setups with `fs-cmsload-mode="load-under"`, as now users are able to display how many items have been loaded so far.
- Cleaned some old deprecated checks.

## 1.5.2

### Patch Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsload",
    cmsLists => {
      console.log("Attribute has successfully loaded!");
      console.log(cmsLists);
    }
  ]);
</script>
```

## 1.5.1

### Patch Changes

- Fixed `commerce` and `lightbox` modules sometimes not being correctly restarted as `cmsload` was running before Webflow wasn't ready.
  This should fix any existing issue when using Lightbox and Add to Cart elements inside paginated Collection List Items.
- Released `v1.5.1-beta.0`.

## 1.5.0

### Minor Changes

- Added support to use Webflow's native pagination query params with `fs-cmsload-mode="pagination"`:
  - If a user loads a URL that contains a paginated query (example: `https://example.com/path?34ac1605_page=2`), the list will automatically switch to that page.
  - Supports multiple paginated lists on the same page. A query like `https://example.com/path?5f7457b3_page=2&a4c81382_page=2` is completely valid as long as all queried lists are using the `pagination` mode.
- Added new `fs-cmsload-showquery="true"` attribute.
  If applied to the `list` element, the URL in the navigation bar will be updated with the corresponding page parameters when switching pages.
  This attribute only works in conjunction with `fs-cmsload-mode="pagination"`.
- Improved UX and Accessibility by dynamically setting the correspondent page query to the `Previous`/`Next` buttons as well as all `page-button` elements.
  This way, users can right click on any pagination button and open that page in a new Tab, or copy the link to that specific page to share it with other people.
- Updated the `schema.json` API to include this new functionalities.

## 1.4.0

### Minor Changes

- Released `v1.4.0-beta.0`.

## 1.3.3

### Patch Changes

- Added support for creating `list` instances that have no items.

## 1.3.2

### Patch Changes

- Published `v1.3.2-beta.0` to NPM.

## 1.3.1

### Patch Changes

- Fixed `fs-cmsload-duration` being incorrectly applied.

## 1.3.0

### Minor Changes

- Added support for using `Lightbox` elements inside `Collection List Items` when using `cmsload`.
  The script will now detect if any newly rendered item contains a `.w-lightbox` trigger and restart the Webflow `lightbox` module.
- Improved support for loading items when `E-Commerce` is enabled.
  Now the Webflow `commerce` module will only be restarted if if any newly rendered has an `Add To Cart` form.

## 1.2.2

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.2.1

### Patch Changes

- Added support to override default list animation duration when it was already set by other `cms` packages.

## 1.2.0

### Minor Changes

- Added support for `cmscore` versioning.

## 1.1.5

### Patch Changes

- Updated `cmscore` import.

## 1.1.4

### Patch Changes

- Updated `cmscore` import.

## 1.1.3

### Patch Changes

- Fixed `pagination` issues when narrowing down the total amount of pages after using `cmsfilter`.

## 1.1.2

### Patch Changes

- Updated `cmscore` import.

## 1.1.1

### Patch Changes

- Updated `cmscore` import.

## 1.1.0

### Minor Changes

- Improved accessibility for `fs-cmsload-element="page-button"` elements by adding [aria-current="page"](https://www.aditus.io/aria/aria-current/#aria-current-page) to the current active button.

## 1.0.2

### Patch Changes

- Improved `inifinite` threshold calculations to load more items.
  Now it covers situations where the list is not long enough to reach the threshold target.

## 1.0.1

### Patch Changes

- Updated `cmscore` import.

## 1.0.0

### Major Changes

- Created the attribute package.
