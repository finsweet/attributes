# @finsweet/attributes-cmssort

## 1.9.1

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmscore@1.6.7

## 1.9.0

### Minor Changes

- 369c058: Added support for decimal and negative numbers using `fs-cmssort-type="number"`

## 1.8.1

### Patch Changes

- Selector for Collection List updated in schema.

## 1.8.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.7.1

### Patch Changes

- Added [API docs](https://www.npmjs.com/package/@finsweet/attributes-cmssort).

## 1.7.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmssort",
    cmsLists => {
      console.log("Attribute has successfully loaded!");
      console.log(cmsLists);
    }
  ]);
</script>
```

## 1.6.3

### Patch Changes

- Added compatibility with the new `cmsload`'s support for Webflow's native pagination query params.

## 1.6.2

### Patch Changes

- Removed `cmscore >= 1.4.1` checks for `originalItemsOrder` management. Now it will always use the newer `CMSList.restoreItemsOrder()` method.

## 1.6.1

### Patch Changes

- Added support for default values on `Select Field` elements sorting.
  Now if the library detects that a sorting `Select Field` has a value when the page loads, it will automatically apply the sorting to existing items and any loaded one.

## 1.6.0

### Minor Changes

- Created `changesets.json` API.

## 1.5.0

### Minor Changes

- Switched `originalItemsOrder` to be managed by `cmscore`.

## 1.4.4

### Patch Changes

- Fixed `fs-cmssort-duration` being incorrectly applied.

## 1.4.3

### Patch Changes

- Removed `cmscore v1.2.0` checks.

## 1.4.2

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.4.1

### Patch Changes

- Added support to override default list animation duration when it was already set by other `cms` packages.

## 1.4.0

### Minor Changes

- Added support for `cmscore` versioning.

## 1.3.3

### Patch Changes

- Fixed items not being sorted correctly when some of them have an empty value.

## 1.3.2

### Patch Changes

- Updated `cmscore` import.

## 1.3.1

### Patch Changes

- Updated `cmscore` import.

## 1.3.0

### Minor Changes

- [Buttons]: Added support to override `fs-cmsort-asc="ASC_CSS_CLASS"` and `fs-cmsort-desc="DESC_CSS_CLASS"` at the buttons level.
  If the CSS Class Attributes are set to the list, all buttons inherit them by default, but each individual button can override these global values by setting the Attributes to it.
- [Buttons]: Added new `fs-cmssort-reverse="true"` optional attribute. If set to a button element, the first click will trigger `desc` sorting instead of the default `asc`.

## 1.2.0

### Minor Changes

- Added support to use `fs-cmssort-element="scroll-anchor"`.
  If set to any element on the page, the viewport will scroll into it when a sorting action is triggered.

## 1.1.1

### Patch Changes

- Added support for Alphanumeric sorting. Before, the following strings:

  - Project 0
  - Project 1
  - Project 2
  - Project 10
  - Project 11
  - Project 12
  - Project 20
  - Project 21
  - Project 22

  Were sorted like:

  - Project 0
  - Project 1
  - Project 10
  - Project 11
  - Project 12
  - Project 2
  - Project 20
  - Project 21
  - Project 22

  Now strings that contain both characters and numbers are analyzed and sorted correctly.

## 1.1.0

### Minor Changes

- Added support to build sorting systems with native `Dropdown` components.
- Internal refactoring / performance improvements.

## 1.0.1

### Patch Changes

- Updated `cmscore` import.

## 1.0.0

### Major Changes

- Created the attribute package.
