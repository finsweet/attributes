# @finsweet/attributes-cmscore

## 1.8.0

### Minor Changes

- 4792998a: Added new `CMSList.addStaticItems()` and `CMSList.staticItems` to support `fs-cmsstatic` Attribute
  Added new `CMSItem.staticIndex` to support `fs-cmsstatic` Attribute.

### Patch Changes

- @global/import@1.0.4

## 1.7.2

### Patch Changes

- @global/import@1.0.3

## 1.7.1

### Patch Changes

- d8a4bf6f: Fixed invalid visibleCountFrom when there are no valid items

## 1.7.0

### Minor Changes

- ef56d454: Added support for new `CMSList.visibleCountFrom` and `CMSList.visibleCountTo`.

## 1.6.10

### Patch Changes

- 299fd136: Trigger a list re-render after `CMSList.clearItems()`.
  This will ensure that the `emptyElement` is displayed correctly when there are no items on the list.

## 1.6.9

### Patch Changes

- @global/import@1.0.2

## 1.6.8

### Patch Changes

- @global/import@1.0.1

## 1.6.7

### Patch Changes

- Fixed broken anchor links in the API docs.

## 1.6.6

### Patch Changes

- Added information about the `CMSList` events in the API docs.

## 1.6.5

### Patch Changes

- Included `createCMSListInstance` in the exported `CMSCore` methods.

## 1.6.4

### Patch Changes

- Updated API docs with `v1.6.3` changes.

## 1.6.3

### Patch Changes

- Made `removeElements` argument in `CMSList.clearItems()` default to `true`.

## 1.6.2

### Patch Changes

- Added [API docs](https://www.npmjs.com/package/@finsweet/attributes-cmscore).

## 1.6.1

### Patch Changes

- Renamed `CMSList.pageCount` and `CMSList.addPageCount()` to `CMSList.visibleCount` and `CMSList.addVisibleCount()`.

## 1.6.0

### Minor Changes

- Added `CMSList.pageCount` and `CMSList.addPageCount()` helpers.
  This sets the bases for the new `fs-cmsload-element="page-count"` attribute.

## 1.5.7

### Patch Changes

- Added some extra rendering logic to ensure all images are loaded correctly on `iOS` devices.

## 1.5.6

### Patch Changes

- Internal: updated `@finsweet/ts-utils` to fix an issue with the `restartWebflow` helper.
  Now the 'ix2' state dispatch is awaited, as it was conflicting with other modules restart.

## 1.5.5

### Patch Changes

- Fixed Webflow modules not restarting correctly.

## 1.5.4

### Patch Changes

- Added `CMSList.restartSliders` and `CMSList.restartTabs` props to use the built-in `Webflow.require('slider' | 'tabs').redraw()` methods from Webflow instead of restarting the whole instance.

## 1.5.3

### Patch Changes

- Removed deprecated `CMSList.addPaginationPrevious()` method in favor of `CMSList.addPaginationButton()`.
- Added new `animateList` param to `CMSList.renderItems()` to allow further control over the list animation.
- Set `CMSList.emptyState` prop to `false` on component instantiation.

## 1.5.2

### Patch Changes

- Added new `CMSList.initialElement` prop.
- Made sure items are set to `opacity: 1` when using `CMSList.displayElement` without animations.

## 1.5.1

### Patch Changes

- Fixed `Empty State` element potentially being retrieved from a native empty Nested Collection, causing the `empty` element from `cmsfilter` not working correctly.

## 1.5.0

### Minor Changes

- Added support to use pagination query params.
  Now `cmscore` will extract each `CMSList` pages query (example: `5f7457b3_page`) to be able to consume it with other packages like `cmsload`.
  This has involved several internal changes:
  - Added new `storePaginationData` util. The method is `async` and while running it stores a Promise in `CMSList.extractingPaginationData`.
  - Added new `CMSList.originalItemsPerPage`, `CMSList.pagesQuery` and `CMSList.showPaginationQuery` props.
  - Now `CMSList.currentPage` will no longer be used as the reference to slice rendered items. Instead, a new `CMSList.paginationActive` is used as the reference.
  - Modified `CMSList.switchPage()` to define if it should trigger a rendering cycle.
  - Added new `CMSList.initPagination()` method.
  - Deprecated `CMSList.addPaginationPrevious()` in favor of a new `CMSList.addPaginationButton()` method.
- Refactored: Moved `CMSList.updateItemsCount()` to be an external util.

## 1.4.2

### Patch Changes

- Renamed `window.fsAttributes.cms.lists` to `window.fsAttributes.cms.listInstances` to keep consistency.

## 1.4.1

### Patch Changes

- Added support for creating `list` instances that have no items.
  Some users were trying to instantiate lists that were at `Empty State`, causing `cmscore` to crash in some ocasions.

## 1.4.0

### Minor Changes

- Added `CMSList.originalItemsOrder` prop.
- Added `CMSList.clearItems()` method.

## 1.3.1

### Patch Changes

- Updated `restartWebflow` from `@finsweet/ts-utils` to include `lightbox` module support.

## 1.3.0

### Minor Changes

- Replaced `CMSItem.needsXXXRestart` props to a single `CMSItem.needsWebflowRestart`, as they were redundant.
- Added `CMSList.restartWebflow` prop.
- Improved `restartWebflowModules` and added support for `CMSList.restartWebflow`.

## 1.2.0

### Minor Changes

- Included the `package.version` in the exports.
- Forced `trim` and `toLowerCase` to all prop field keys.
- Added support for `cmscore` versioning.

## 1.1.2

### Patch Changes

- Updated `restartWebflow` from `@finsweet/ts-utils` to support persisting state after reinitializing the `ix2` module.

## 1.1.1

### Patch Changes

- Added a `100ms` timeout to the `CMSList.scrollToAnchor` method to avoid it being cancelled by the browser's smoo scrolling.

## 1.1.0

### Minor Changes

- Switched `CMSList.validItems` prop from `boolean` to an array of the valid `CMSItem` instanced.
- Internal refactors.

## 1.0.9

### Patch Changes

- Added `CMSList.scrollAnchor` prop + `CMSList.scrollToAnchor()` method.

## 1.0.8

### Patch Changes

- Added new methods to `CMSList`.

## 1.0.7

### Patch Changes

- Published missing updates.

## 1.0.6

### Patch Changes

- Improved rendering logic.

## 1.0.5

### Patch Changes

- `cmscore`: Removed `CMSList.initialItems` prop.

## 1.0.4

### Patch Changes

- `cmscore`: Added `CMSList.initialItems` prop.

## 1.0.3

### Patch Changes

- Changed `CMSItemProps.mode` to `CMSItemProps.range`.

## 1.0.24

### Patch Changes

- Fixed rendering issues caused by the `Empty State` not being correctly displayed in some situations.

## 1.0.23

### Patch Changes

- Improved Webflow Modules restarting in the `render` workflow.

## 1.0.22

### Patch Changes

- Updated `ts-utils` to add support for `commerce` sites.

## 1.0.21

### Patch Changes

- Added `highlightValues` optional prop in each `CMSItemProp` object. Used for `fs-cmsfilter-highlight`.

## 1.0.20

### Patch Changes

- Now the `originalHTML` is stored in each `CMSItemProp.elements` record. Used to reset the elements after having mutated them in actions like `fs-cmsfilter-highlight`.

## 1.0.2

### Patch Changes

- Modified `CMSItem.props` value type to a `Set` instead of `Array`.

## 1.0.19

### Patch Changes

- Refactored `CMSList.itemsCount` usage.

## 1.0.18

### Patch Changes

- Added `CMSItemProp.elements` property that stores the value holders.

## 1.0.17

### Patch Changes

- Added optional `scrollToAnchor` param to the `CMSList.switchPage()` method.

## 1.0.16

### Patch Changes

- Added `CMSList.itemsCount` and `CMSList.addItemsCount()` to display the amount of items of the list.

## 1.0.15

### Patch Changes

- `CMSList.switchPage()` now triggers a `scrollToAnchor` action, if the anchor element exists.

## 1.0.14

### Patch Changes

- Fixed `renderitems` and `additems` events fire order.
- Added `CMSList.resetIx` prop that is used in the `render` function.

## 1.0.13

### Patch Changes

- Added `CMSList.totalPages` prop.

## 1.0.12

### Patch Changes

- Added optional `animate` param to `CMSList.renderItems`.

## 1.0.11

### Patch Changes

- Awaited `renderitems` event emit on `CMSList.renderItems`.

## 1.0.10

### Patch Changes

- Added `CMSList.paginationCount` prop.

## 1.0.1

### Patch Changes

- `CMSItem`: Added `mode` in `props` property.

## 1.0.0

### Major Changes

- Created Attribute package.
