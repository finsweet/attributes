
<div align="center">
  <img src='https://placehold.co/600x200/000000/FFFFFF.png?text=Finsweet+Attributes\n::+Internal+utils&font=Source Sans Pro' alt="Project logo">
</div>

<h3 align="center">@finsweet/attributes</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/finsweet/The-Documentation-Compendium.svg)](https://github.com/finsweet/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/finsweet/The-Documentation-Compendium.svg)](https://github.com/finsweet/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A collection of internal utils used by the Finsweet Attributes package.
    <br>
</p>

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About](#about)
- [🚀 Utils](#utils)
  - [Animations](#animations)
  - [Components](#components)
  - [Constants](#constants)
  - [Helpers](#helpers)
    - [Arrays](#arrays)
  - [Types](#types)
- [✍️ Authors](#️-authors)
- [🎉 Acknowledgements](#-acknowledgements)

## 🧐 About

This package is a collection of internal utils used by the Finsweet Attributes package to help existing and future developers to maintain and improve the codebase. It is not intended to be used by anyone outside of the Finsweet team.

## 🚀 Utils

Below is a list of all the util collections included in this package. Each util is a function that can be imported and used in your code.

### a). Animations

### b). Components

### c). Constants

#### 1. a11y

#### 2. Attributes

#### 3. Keyboard

#### 4. Webflow

##### **`CMS_CSS_CLASSES`**
An object containing the CSS classes used by the CMS. This is used to identify CMS elements in the DOM.

```js
{
  wrapper: 'w-dyn-list',
  list: 'w-dyn-items',
  item: 'w-dyn-item',
  paginationWrapper: 'w-pagination-wrapper',
  paginationNext: 'w-pagination-next',
  paginationPrevious: 'w-pagination-previous',
  pageCount: 'w-page-count',
  emptyState: 'w-dyn-empty',
}
```

### d). Helpers

This collection of utils is a set of functions that help with common tasks. They are not specific to any particular part of the codebase.

#### 1. Arrays

- **sameValues(array1: unknown[], array2: unknown[])** <br>- Returns `true` if both arrays have the same values, `false` otherwise.

#### 2. CMS

- **getCMSElementSelector(key: keyof typeof [CMS_CSS_CLASSES](#cms_css_classes))** <br>- Returns the CMS object from the window object. If the CMS is not found, it returns `null`.
  
  **Parameters:**

  > - **key** - The key / class of the CMS object to return.

  **Returns:**
  
  > `string` - A CSS selector for a CMS element

- **getCollectionListWrappers(selectors: Array<string | null | undefined>, page = document)** <br>- Queries `Collection List Wrapper` elements and makes sure they are unique.
  
  **Parameters:**

  > - **selectors** - The selectors used for the query. If an empty array is provided, all `Collection List Wrapper` elements will be returned.
  > - **page** - The document where to perform the query.

  **Returns:**

  > `CollectionListWrapperElement[]` - A unique list of `Collection List Wrapper` elements.

- **getCollectionElements(reference: string | Element, target: 'wrapper' | 'list' | 'items' | 'empty' | 'pagination' | 'next' | 'previous' | 'pageCount', page: Document = document)** <br>- This helper is intended to allow users setting the selectors to either the `Collection List Wrapper` or the `Collection List` elements.

  **Parameters:**

  > - **reference** - The element or selector of the element.
  > - **target** - The requested element/elements. It can be either the `Collection List Wrapper`, the `Collection List` or all the `Collection Item` elements.
  > - **page** - The page document.

  **Returns:**

  > `CollectionListWrapperElement | CollectionListElement | CollectionItemElement[] | PaginationButtonElement | PageCountElement | CollectionEmptyElement | null | undefined` -The specified collection element/elements.

#### 3. Dates

### e). Types

## ✍️ Authors

- [@author](https://github.com) - Collection & documentation

See also the list of [contributors](https://github.com) who participated in this project.

## 🎉 Acknowledgements

- Hat tip to anyone whose code was used
- Inspiration
- References
