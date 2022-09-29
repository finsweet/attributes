# @finsweet/attributes-toc

## 1.1.1

### Patch Changes

- Updated dependencies [4792998a]
  - @global/constants@1.2.0
  - @global/factory@1.1.5

## 1.1.0

### Minor Changes

- 07f32375: Created `fs-cmsattribute` Attribute

### Patch Changes

- Updated dependencies [07f32375]
  - @global/constants@1.1.0
  - @global/factory@1.1.4

## 1.0.11

### Patch Changes

- Updated dependencies [7542dcdb]
  - @global/constants@1.0.2
  - @global/factory@1.1.3

## 1.0.10

### Patch Changes

- Updated dependencies [bdd1a78]
  - @global/constants@1.0.1
  - @global/factory@1.1.2

## 1.0.9

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-richtext@1.7.2

## 1.0.8

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-richtext@1.7.1

## 1.0.7

### Patch Changes

- Updated dependencies [2040479]
  - @finsweet/attributes-richtext@1.7.0

## 1.0.6

### Patch Changes

- Added schema.json for support tool.

## 1.0.5

### Patch Changes

- Added Example 1: Sidebar TOC.

## 1.0.4

### Patch Changes

- Fixed heading `ID`'s being duplicated when rendering external HTML that already contained them.

## 1.0.3

### Patch Changes

- Added new **optional** `fs-toc-element="table"`: Defines the wrapper element that will hold all the TOC links.
  If not defined, the library will use the immediate parent of the link template elements.

- Fixed multiple instances not working correctly (`-1` | `-2`...)

## 1.0.2

### Patch Changes

- Ensured all headings and links have unique IDs, even if some headings have the same exact text.

## 1.0.1

### Patch Changes

- Added support to use `fs-richtext` + `fs-toc`.

## 1.0.0

### Major Changes

- Created the attribute package.
