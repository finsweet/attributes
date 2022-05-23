# Attributes by Finsweet

Work in progress.

This is a monorepo containing all of the **Attributes** solutions.

This monorepo uses [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) to manage all the packages, you will need to have `npm 7.x` or higher in your machine to be able to use them.

Please, make sure you know how to use `npm Workspaces` before performing any actions.

## How to start

Install all the dependencies on the root package unsin `npm install`.

`cd` into one of the packages, and install the dependencies of that package.

Use `npm run dev` to build for development.

Use `npm run build` to build for production.

Use `npm run serve` to start a local server under `http://localhost:3000`, this will allow to work directly from the Webflow project by importing a script like this:

```html
<script async src="http://localhost:3000/packages/copyclip/copyclip.js"></script>
```

## Specification

### Elements

Elements are represented by identifier, use to set specific behavior into DOM element.

It could be many elements with the same unique identifier in the same instance with direct or indirect correlation.

Examples of elements with same identifier with direct correlaction:

`fs-cmscombine-element="list"`

Examples of elements with the same identifier without direct correlation:

`fs-cmsnest-element="list"`

Examples of other elements with unique identifer:

- Main Examples:

  - `fs-cmsload-element="list"` - Define the CMS Collection to enable load more.
  - `fs-cmssort-element="list"` - Define the CMS Collection to enable sort.

- There are used for identify certain behavior into each attributes too:
  - `fs-cmsload-element="page-button"` - Define the button for load more. Only for pagination.
  - `fs-untransform-element="trigger-on"` - Define the trigger to enable untransform in modal.

Those functionalities are consolidated for element behavior.

### Settings

Settings are represented by modification / customization for elements or identifier behavior. There are used in (applied to) specific elements to control how attribute will act in page. All setting must belong to at least one element/identifier.

Main examples:

- `fs-cmsload-mode` - Defines the loading mode for CMS Collections.
- `fs-scrolldisable-media` - Defines the media query to restrict when element act as a trigger.
- `fs-cmsfilter-match` - Define if identifier must match any or all CMS Collection Field in Item.

### Identifiers

The identifiers have the characteristics:

Represent a field:

- CMS Collection with one to many ocurrencies
- Component. Zero to many ocurrencies.

Can exists multiples identifiers in the same instance and even for multiples instances in the same page.

Identifier should be linked together in multiples places in page. It’s usual to have the identifier to link a button to a CMS Field value, or to have and identifier linked a component to a placehoder.

Identifiers never can be use alone like elements. There are the following cases:

- There are always need to be in more than one place to be considered an identifier.
- There are always belong to an Element, like a Setting.

#### All cases

`cmssort` - Field Identifier for Select Trigger

- IDENTIFIER-asc
- IDENTIFIER-desc

`cmssort` - Field Identifier for Button Trigger

- Same as above

`cmssort` - Field identifier for Dropdown Trigger

- Same as above

`cmsfilter` - Field identifier

- Add to the Filter UI
- Add to CMS Collection list

`cmsnest` - Nest Collection Identifier

- Add to the Nest Collection List related to the Main CMS Collection.
- Add to the CMS Collection where must show the CMS Nested Items.

We can deduce the following rules:

An identifier must have specializations. Can use the same `appliedTo`.

It can be of type suffix, to add `-asc` and `-desc` for `cmssort` case.

It can be `childOf`, to have elements `childOf` Filter UI and `childOf` Collection list together.

### Cases not covered by specification

#### Not classified cases

- `cmsfilter` → Filter → It will not validate if there are more than one form with input elements. It will only check for single element filter existence.

- `cmsfilter` → Will not validate start checked for checkbox.

- `cmsfilter` → Will not validate start checked for radio

- `cmsfilter` → Will not validate submit button.

- `cmsfilter` → Will not validate multiples reset buttons.

- `cmsfilter` → Will not validate settings for second reset button.

- `cmsload` → Will not validate native webflow validation enabled.

- `cmsnest` → List → It will not validate link to CMS Page. I will only check for list element.

- `cmsnest` → Page Template → It will not validate if CMS Collection Page has setup the IDENTIFIER.

- `cmsnest` → List link → It will not validate if setup link for CMS Collection Page.

- `cmsprevnext` - Link in collection

- `range-slider` - Track, Fill e Handle style.

#### Issues

Comment on
/\*\*

- Defines the text that will be success to the clipboard.
  \*/
  Text
