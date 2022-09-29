# @finsweet/attributes-cmstabs

## 1.6.1

### Patch Changes

- Updated dependencies [4792998a]
- Updated dependencies [4792998a]
  - @global/constants@1.2.0
  - @finsweet/attributes-cmscore@1.8.0
  - @global/factory@1.1.5

## 1.6.0

### Minor Changes

- 07f32375: Created `fs-cmsattribute` Attribute

### Patch Changes

- Updated dependencies [07f32375]
  - @global/constants@1.1.0
  - @global/factory@1.1.4
  - @finsweet/attributes-cmscore@1.7.2

## 1.5.9

### Patch Changes

- Updated dependencies [d8a4bf6f]
  - @finsweet/attributes-cmscore@1.7.1

## 1.5.8

### Patch Changes

- Updated dependencies [ef56d454]
  - @finsweet/attributes-cmscore@1.7.0

## 1.5.7

### Patch Changes

- Updated dependencies [299fd136]
  - @finsweet/attributes-cmscore@1.6.10

## 1.5.6

### Patch Changes

- Updated dependencies [7542dcdb]
  - @global/constants@1.0.2
  - @global/factory@1.1.3
  - @finsweet/attributes-cmscore@1.6.9

## 1.5.5

### Patch Changes

- Updated dependencies [bdd1a78]
  - @global/constants@1.0.1
  - @global/factory@1.1.2
  - @finsweet/attributes-cmscore@1.6.8

## 1.5.4

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-cmscore@1.6.7

## 1.5.3

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmscore@1.6.7

## 1.5.2

### Patch Changes

- Removed the `role="listitem"` attribute from the Collection Items before creating the Tabs, as this role is not correct and causes Lighthouse to flag it as an a11ty issue.

## 1.5.1

### Patch Changes

- Selector for Collection List updated in schema.

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
    'cmstabs',
    (cmsLists) => {
      console.log('Attribute has successfully loaded!');
      console.log(cmsLists);
    },
  ]);
</script>
```

## 1.3.3

### Patch Changes

- Fixed `ix2` conflict with Page Load interactions and interactions that used an Initial State.

## 1.3.2

### Patch Changes

- Solved an internal issue that was creating a conflict between Webflow's `tabs` and `ix2` modules when restarting them.

## 1.3.1

### Patch Changes

- Fixed `ix2` not being restarted correctly after populating the Tabs.

## 1.3.0

### Minor Changes

- Improvement: implemented Webflow's native `Webflow.require('tabs').redraw()` method in the rendering cycle instead of restarting the whole `Webflow` instance.

## 1.2.0

### Minor Changes

- Created `changesets.json` API.

## 1.1.2

### Patch Changes

- Fixed Webflow not being correctly restarted after rendering new items with `cmsload`.
  Now new Tabs will be properly generated every time new items are dynamically loaded with `cmsload`.

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
