# @finsweet/attributes-cmsnest

## 1.7.1

### Patch Changes

- Updated dependencies [4792998a]
- Updated dependencies [4792998a]
  - @global/constants@1.2.0
  - @finsweet/attributes-cmscore@1.8.0
  - @global/factory@1.1.5

## 1.7.0

### Minor Changes

- 07f32375: Created `fs-cmsattribute` Attribute

### Patch Changes

- Updated dependencies [07f32375]
  - @global/constants@1.1.0
  - @global/factory@1.1.4
  - @finsweet/attributes-cmscore@1.7.2

## 1.6.10

### Patch Changes

- Updated dependencies [d8a4bf6f]
  - @finsweet/attributes-cmscore@1.7.1

## 1.6.9

### Patch Changes

- Updated dependencies [ef56d454]
  - @finsweet/attributes-cmscore@1.7.0

## 1.6.8

### Patch Changes

- Updated dependencies [299fd136]
  - @finsweet/attributes-cmscore@1.6.10

## 1.6.7

### Patch Changes

- Updated dependencies [7542dcdb]
  - @global/constants@1.0.2
  - @global/factory@1.1.3
  - @finsweet/attributes-cmscore@1.6.9

## 1.6.6

### Patch Changes

- Updated dependencies [bdd1a78]
  - @global/constants@1.0.1
  - @global/factory@1.1.2
  - @finsweet/attributes-cmscore@1.6.8

## 1.6.5

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-cmscore@1.6.7

## 1.6.4

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmscore@1.6.7

## 1.6.3

### Patch Changes

- 87507d5: `Fix`: prevented `cmsnest` from crashing when the user has incorreclty set up a duplicated Collection List source inside the item's Template Page.
  Previously, the library tried to nest the same Collection under a single target for each source that was located in the Template Page.
  Now the library will detect this invalid setup and just populate a single instance of each Collection for each nest target.

## 1.6.2

### Patch Changes

- Selector for Collection List updated in schema.

## 1.6.1

### Patch Changes

- Fixed issue that caused an infinite loop when the user incorrectly added the `fs-cmsnest-collection` attribute to the `<a>` element that points to the Template Page.
  Now the library takes this into consideration and prevents setting `<a>` elements as nesting targets to avoid creating an infinite loop.

## 1.6.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.5.0

### Minor Changes

Added support to implement `cmsnest` recursively.
Now the users can nest any amount of `Collection Lists` inside an already nested `Collection Item`, without any limitations of nesting levels.

Although a caching system has also been implemented to improve performance, users should be careful when implementing huge deeply nested setups, as many network requests may be needed.

## 1.4.1

### Patch Changes

- Removed duplicated init that caused Template Pages to be fetched two times instead of one.
  Sites with long nested lists should notice a performance improvement with this update.

## 1.4.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsnest',
    (cmsLists) => {
      console.log('Attribute has successfully loaded!');
      console.log(cmsLists);
    },
  ]);
</script>
```

## 1.3.0

### Minor Changes

- Released `v1.3.0-beta`.

## 1.2.2

### Patch Changes

- Added compatibility with the new `cmsload`'s support for Webflow's native pagination query params.

## 1.2.1

### Patch Changes

- Added support for creating `list` instances that have no items.

## 1.2.0

### Minor Changes

- Created `changesets.json` API.

## 1.1.1

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.1.0

### Minor Changes

- Added support for `cmscore` versioning.
- Added `collectionId` normalization.

## 1.0.5

### Patch Changes

- Updated `cmscore` import.

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
