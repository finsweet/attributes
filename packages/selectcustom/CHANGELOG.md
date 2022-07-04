# @finsweet/attributes-selectcustom

## 1.5.5

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmsselect@1.4.3

## 1.5.4

### Patch Changes

- @finsweet/attributes-cmsselect@1.4.2

## 1.5.3

### Patch Changes

- @finsweet/attributes-cmsselect@1.4.1

## 1.5.2

### Patch Changes

- [Internal - `@finsweet-ts/utils`]: Fixed `setFormFieldValue` helper to fix an infinite loop being generated when the field value was the same one.

## 1.5.1

### Patch Changes

- Added support to use `cmsselect` + `selectcustom` in combination.
  Now users can seamlessly use `cmsselect` to populate a `<select>` element that is used as the source for a Custom Select Dropdown (`selectcustom`).

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
    "selectcustom",
    referenceElements => {
      console.log("Attribute has successfully loaded!");
      console.log(referenceElements);
    }
  ]);
</script>
```

## 1.3.2

### Patch Changes

- Persisted the `aria-selected` attribute to be fully compliant with the [WAI-ARIA specification](https://www.w3.org/TR/WCAG20-TECHS/ARIA5).
  Now the unselected options will be set to `aria-selected="false"` instead of removing the attribute.

## 1.3.1

### Patch Changes

- Fixed `fs-selectcustom-hideinitial="true"` incorrectly toggling the `reset-option` element's visibility when opening/closing the dropdown repeatedly.

## 1.3.0

### Minor Changes

- Improved `Tab` focus behavior by allowing users to move to the next/previous focusable elements on the screen. This action will automatically close the dropdown.
- Improved opening the list when there are no currently selected options. Now the first selectable option will be automatically focused.

## 1.2.1

### Patch Changes

- Made sure the `aria-current` attribute is removed from the option `<a>` elements, as it's a navigational exclusive attribute that Webflow applies when the `Current` state is on.

## 1.2.0

### Minor Changes

- Added two way data binding. Now the Custom Select Dropdown will react to any `change` events emitted from the hidden `<select>` element and update accordingly.
- Fixed the dropdown not closing when the user clicked on the currently selected option.

## 1.1.2

### Patch Changes

- Fixed `fs-cmsselect-hideinitial="true"` not hiding the `option-reset` option on page load.

## 1.1.1

### Patch Changes

- Fixed dropdowns not closing automatically after selecting an option on mobile.
- Fixed `fs-selectcustom-hideinitial` sometimes causing unwanted flashes when toggling the `option-reset` element's visibility.
- Added better support for using `Dropdown` interactions that affect how the `Dropdown List` is displayed/hidden.

## 1.1.0

### Minor Changes

- Removed `fs-selectcustom-element="text"` and `fs-selectcustom-element="label-content"` attributes as they were unnecessary. Users should only have one Text element inside the option template.
- Made `fs-selectcustom-element="label"` optional. If not defined, the library will look for the first Text element occurrency inside the Dropdown Toggle.
- Added `fs-selectcustom-element="option-reset"` attribute. If added to an `<a>` element inside the Dropdown List, this element will be used as the template for the options with no value.
- Added `fs-selectcustom-hideinitial="true"` attribute. If added to the Dropdown (the element with `fs-selectcustom-element="dropdown"` attribute), the options with no value will be hidden when there are no currently selected options, and displayed otherwise.

## 1.0.0

### Major Changes

- Added missing `a11ty` attributes to the Dropdown Toggle and Dropdown List elements.
- Released the package.
