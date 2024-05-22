# Finsweet Attributes

Core package for all Finsweet Attributes.

## Getting started

### 1. CDN Import

Import the core package in your project:

```html
<!-- [Attributes by Finsweet] Core -->
<script async type="module" src="https://cdn.jsdelivr.net/npm/@finsweet/attributes"></script>
```

_Important:_ It's only required to import it once, no matter how many Attribute solutions are added.

### 2. Define the solutions

Define the Attribute solutions that should be loaded on each page by adding the following inside the `<head>` tag:

```html
<script
  async
  type="module"
  src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
  fs-SOLUTION_KEY
></script>
```

Replace `SOLUTION_KEY` with the key of the solution you want to load. You can load as many solutions as you want.

Example:

```html
<script
  async
  type="module"
  src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
  fs-rangeslider
  fs-date
  fs-socialshare
  fs-consent
></script>
```

### 3. Optional: Define the global settings

Attributes reads the settings from the HTML Attributes that are added to the elements on the page. But some solutions also allow passing a set of global settings.

To do so, add the settings to the module elements **with solution prefixes included**.

Example:

```html
<script
  async
  type="module"
  src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
  fs-rangeslider
  fs-date
  fs-socialshare
  fs-consent
  fs-consent-mode="opt-in"
  fs-consent-source="/"
></script>
```
