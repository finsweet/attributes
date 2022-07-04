# @finsweet/attributes-cmsfilter

## 1.12.1

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmscore@1.6.7

## 1.12.0

### Minor Changes

- 2b343ff: Added new `fs-cmsfilter-allowsubmit="true"` option to allow the users to submit the filters form.

  By default, form submissions are disabled in Attributes CMS Filter. Set `fs-cmsfilter-allowsubmit="true"` option to the CMS List to enable form submissions in your Filter UI.

## 1.11.2

### Patch Changes

- Fixed Reset button rules to require being child Of form select and filter element on support.

## 1.11.1

### Patch Changes

- Selector for Collection List updated in schema.

## 1.11.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.10.1

### Patch Changes

- Added created new `CMSFilters.storeFiltersData()` method.
- Added [API docs](https://www.npmjs.com/package/@finsweet/attributes-cmsfilter).

## 1.10.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsfilter",
    cmsFilters => {
      console.log("Attribute has successfully loaded!");
      console.log(cmsFilters);
    }
  ]);
</script>
```

## 1.9.6

### Patch Changes

- Updated `examples.json` API to include to the Focused (keyboard) changes in the [Filters UI Kit Examples](https://webflow.com/website/Accessible-Form-Filter-Components).

## 1.9.5

### Patch Changes

- Fixed small issue in the new tags rendering logic (introduced in `v1.9.4`).

## 1.9.4

### Patch Changes

- Now checkboxes with `true`/`false` as the value will just output their category name in the Tags.
  For instance, a `true`/`false` checkbox setting a `featured` value would previously render the tags like:

  - Without `tagcategory`: The tag rendered `true`.
  - With `tagcategory`: The tag rendered `TAG_CATEGORY: true`. Example: `Featured: true`.

  Instead, now the output will be:

  - Without `tagcategory`: The tag will render `featured`.
  - With `tagcategory`: The tag will render `TAG_CATEGORY`. Example: `Featured`.

## 1.9.3

### Patch Changes

- Published [CMS Filter Components](https://cms-filter-components.webflow.io/) as examples in the `examples.json` API.
  These examples will be available to copy right from the Designer using the Finsweet Extension.

## 1.9.2

### Patch Changes

- Fixed `<select>` elements filtering items when they contained just a portion of the value instead of matching the entire word.
  For instance, a value like `Men` would filter items that contained the word `WoMEN`.
  Now all `<select>` inputs are treated like `checkboxes` and `radios`, their value must be an exact (case insensitive) match like `Men` = `Men` || `men`.

## 1.9.1

### Patch Changes

- Fixed `fs-cmsfilter-element="empty"` not being correctly displayed.
  This issue was introduced a few days ago with the new `fs-cmsfilter-element="initial"` attribute.
  Now the render cycles take into consideration all possible setups to correctly display the `list`, `empty` and `initial` elements.

## 1.9.0

### Minor Changes

- Added new `fs-cmsfilter-element="initial"` attribute.

  If added to any element on the page, that specific element will be displayed instead of the `list` whenever there are no active filters.
  Once the user activated any filter, the `initial` element will hide and the `list` will display.

  **Tip**: To prevent content flashes, the `Collection List Wrapper` can be set to `opacity: 0`.

## 1.8.2

### Patch Changes

- Added compatibility with the new `cmsload`'s support for Webflow's native pagination query params.
  Now users can safely use this feature in conjunction of filters query parameters.

## 1.8.1

### Patch Changes

- Fixed `fs-cmsfilter-active` CSS Class not being correctly applied to `Radio` elements that had a default `checked` status.

## 1.8.0

### Minor Changes

- Added support to override the `fs-cmsfilter-highlightclass="HIGHLIGHT_CSS_CLASS"` attribute at the filter elements level.
  Now, the attribute can be used like:
  - If added to the `list` element, all highlighted elements will receive this Highlight CSS Class. If not defined, it defaults to `.fs-cmsfilter_highlight`
  - If added to a specific filter element (that has a `fs-cmsfilter-field` attribute), the Highlight CSS Class will be overriden and applied to the matching text in the filtered Collection Items.
- Added an extra check to make sure the `Tags` are visible when rendering them without the `animations` module being loaded yet.

## 1.7.3

### Patch Changes

- Fixed `fs-cmsfilter-tagformat="category"` not preserving the original format of the `IDENTIFIER` when rendering the tags.
  Now, the tags will show the category text using the exact same format of the identifier (unless the user overrides it with `fs-cmsfilter-tagcategory="OVERRIDE_TEXT"`).
  For example:
  - Using `fs-cmsfilter-tagformat="category"` + `fs-cmsfilter-field="color"` will render the tags as `color: SELECTED_VALUE`.
  - Using `fs-cmsfilter-tagformat="category"` + `fs-cmsfilter-field="Color"` will render the tags as `Color: SELECTED_VALUE`.

## 1.7.2

### Patch Changes

- Made sure that filters instances are not duplicated.
  In some use cases like using `cmscombine` + `cmsfilters`, users added the same exact attributes to all `cmscombine` lists, thus multiple instances were being created causing funky behaviors.

  **Note:** There are still potential situations where `cmscombine` can break builds if users apply duplicated attributes, so we should first educate them to only add attributes to the first `cmscombine` target `list`, not all of them.

## 1.7.1

### Patch Changes

- Assured that the `animations` module is fully loaded before the library starts filtering.
  This caused issues like `Collection Items` and `Tags` that were added on page load using query params to not be animated.

## 1.7.0

### Minor Changes

- Released `v1.7.0-beta` to NPM.
- Created `changesets.json` API.

## 1.6.1

### Patch Changes

- Breaking change: renamed `fs-cmsfilter-debouncing` to `fs-cmsfilter-debounce`.

## 1.6.0

### Minor Changes

- Added `fs-cmsfilter-debouncing="TIME_IN_MS"`.
  When used, allows users to modify the default `input` [debouncing](https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086).
  Defaults to `50`.

- Added `fs-cmsfilter-active="ACTIVE_CSS_CLASS"`.
  If specified, all Checkbox Field and Radio Button Field (the parent elements) will receive this class whenever the Checkbox/Radio is checked.
  Defaults to `.fs-cmsfilter_active`.

- Fixed `fs-cmsfilter-duration` being incorrectly applied.

## 1.5.4

### Patch Changes

- Improved accessibility by ensuring unique IDs on dynamically generated form elements in `Collection Lists`.

## 1.5.3

### Patch Changes

- Added support for initial state values on `Checkboxes`, `Radio` and `Select` elements.
  If any of these elements has a default value, on page load the filters will automatically:
  - Store the value.
  - Trigger a filter + render workflow.
  - Sync the tags, if required.
  - Sync the URL query params, if required.

## 1.5.2

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.5.1

### Patch Changes

- Added support to override default list animation duration when it was already set by other `cms` packages.
- Memoized `TagData.textNode` prop so the text node doesn't have to be queried every time a text update is required on a tag.

## 1.5.0

### Minor Changes

- Added support for `cmscore` versioning.

## 1.4.0

### Minor Changes

- Added a visibility tracker to Submit Buttons. If it's not visible (`display: none`), the list will auto-filter as if there was no Submit Button.
- Added a window `resize` observer to update the visibility status of the Submit Button.
- Switched tags from being rendered on `input` events to being rendered on during the filter rendering. This assures that, if a Submit Button exists and it's visible, the tags will only be updated when submitting the form.

## 1.3.1

### Patch Changes

- Updated `cmscore` import.

## 1.3.0

### Minor Changes

- Added `fs-cmsfilter-tagformat` override at the filters level + a new `fs-cmsfilter-tagcategory` attribute.
- Updated `cmscore` import.

## 1.2.0

### Patch Changes

- Fixed `undefined` errors when checking range validity in single range props.
- Fixed value checking when multiple non checkbox/radio elements exist in a filter key.
- Fixed `fs-cmsfilter-range` filtering issue when the `from` value was not specified.
- Fixed `fs-cmsfilter-range` values not being correctly set from the URL query params on page load.
- Added support for `fs-rangeslider` sync when setting values from query params on page load.
- Improved tags rendering when the filter is a `range`. Now it outputs a single tag with a `[FROM_VALUE, TO_VALUE]` format, replacing the `undefined` values with a double dash `--`.
- Exposed the `CMSFilters` instances at `window.fsAttributes.cms.filtersInstances`.

## 1.1.2

### Patch Changes

- Added support to parse numbers that contain symbols like `$` or `,`.

## 1.1.0

### Minor Changes

- Added new `fs-cmsfilter-element="filter-results-count"` attribute.
  It can be placed in any Text element inside a `Checkbox Field` or `Radio Field`, and this element will display the amount of items that match that particular filter.
  The results count is dynamically updated every time a filter is applied, only showing the available items in the current filter query.
- Added new `fs-cmsfilter-hideempty="true"` attribute.
  It can be added to any `Checkbox` or `Radio`, specifically to the same element where the `fs-cmsfilter-field="IDENTIFIER"` attribute is added.
  When the current filter has no results in the list, the `Checkbox`/`Radio` element is hidden.
  Very useful to narrow down options to the users when other filters are applied.
- Internal refactorings / performance improvements.

## 1.0.2

### Patch Changes

- Fixed list animation issue on `nestinitialitems` event when the list was initially filtered by query params.
- Updated `cmscore` import.

## 1.0.1

### Patch Changes

- Updated `cmscore` import.

## 1.0.0

### Major Changes

- Created the attribute package.
