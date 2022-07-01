# @finsweet/attributes-cmsselect

## 1.4.2

### Patch Changes

- Updated dependencies [8f9d08d]
  - @finsweet/attributes-cmsload@1.7.3

## 1.4.1

### Patch Changes

- Updated dependencies [7f509db]
  - @finsweet/attributes-cmsload@1.7.2

## 1.4.0

### Minor Changes

Added support to use `cmsselect` + `cmsload` (all modes are supported) together.

Now when a user adds `cmsload` to the parent `Collection List` of a `fs-cmsselect-element="text-value"` element, `cmsselect` will populate the new options as soon they are loaded.

All `cmsload` modes are supported and will trigger adding all items as options.
For instance, if the `Collection List` uses `pagination` mode, all items will be added as `<select>` options even if the user doesn't click on the `Next` button.

Also, `cmsselect` will now make sure that the added options are unique and not repeated.
This means that now users can set the `fs-cmsselect-element="text-value"` to any `Collection List Item` inside a `cmsfilter` setup to populate a `<select>` dropdown in the filters form.

## 1.3.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.2.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsselect",
    elements => {
      console.log("Attribute has successfully loaded!");
      console.log(elements);
    }
  ]);
</script>
```

## 1.1.0

### Minor Changes

- Created `changesets.json` API.

## 1.0.4

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.0.3

### Patch Changes

- Updated package description.

## 1.0.2

### Patch Changes

- Breaking change: renamed `fs-cmsselect-element="source"` as `fs-cmsselect-element="text-value"`.
- Breaking change: renamed `fs-cmsselect-element="target"` as `fs-cmsselect-element="select"`.

## 1.0.1

### Patch Changes

- Added `initAttributes` call to make sure `window.fsAttributes` exists.

## 1.0.0

### Major Changes

- Created the attribute package.
