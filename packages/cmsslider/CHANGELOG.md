# @finsweet/attributes-cmsslider

## 1.5.2

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmscore@1.6.7

## 1.5.1

### Patch Changes

- Removed the `role="listitem"` attribute from the Collection Items before creating the Slides, as this role is not correct and causes Lighthouse to flag it as an a11ty issue.

## 1.5.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.4.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsslider",
    cmsLists => {
      console.log("Attribute has successfully loaded!");
      console.log(cmsLists);
    }
  ]);
</script>
```

## 1.3.5

### Patch Changes

- Fixed `ix2` conflict with Page Load interactions and interactions that used an Initial State.

## 1.3.4

### Patch Changes

- Solved an internal issue that was creating a conflict between Webflow's `slider` and `ix2` modules when restarting them.

## 1.3.3

### Patch Changes

- Fixed `ix2` not being restarted correctly after populating the Slides.
  This issue was introduced in `v1.3.2`.

## 1.3.2

### Patch Changes

- Removed old `cmscore` checks that are no longer necessary.

## 1.3.1

### Patch Changes

- Added missing `slider` module restart on first instantiation.

## 1.3.0

### Minor Changes

- Improvement: implemented Webflow's native `Webflow.require('slider').redraw()` method in the rendering cycle instead of restarting the whole `Webflow` instance.

## 1.2.1

### Patch Changes

- Fixed `changesets.json` not being available on NPM.

## 1.2.0

### Minor Changes

- Created `changesets.json` API.

## 1.1.2

### Patch Changes

- Fixed Webflow not being correctly restarted after rendering new items with `cmsload`.
  Now new Slides will be properly generated every time new items are dynamically loaded with `cmsload`.

## 1.1.1

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.1.0

### Minor Changes

- Added support for `cmscore` versioning.

## 1.0.4

### Patch Changes

- Updated `cmscore` import.

## 1.0.3

### Patch Changes

- Updated `cmscore` import.

## 1.0.2

### Patch Changes

- Updated `cmscore` import.

## 1.0.1

### Patch Changes

- Updated `cmscore` import.

## 1.0.0

### Major Changes

- Created the attribute package.
