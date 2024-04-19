import debounce from 'just-debounce';

const voidElements = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
  'select',
];

let showTooltip = false;

/**
 * Searches for the closest element up the DOM tree that has any attribute starting with 'fs-'.
 * @param element - The starting HTMLElement to check.
 * @returns HTMLElement | null - The found element with 'fs-' attributes or null if none found.
 */
const findElementWithFsAttributes = (element: HTMLElement): HTMLElement | null => {
  // 1. Check the current element
  if (Array.from(element.attributes).some((attr) => attr.name.startsWith('fs-'))) {
    return element;
  }

  // 2. Check children of the parent element if they have 'fs-' attributes
  const { parentElement } = element;
  if (parentElement) {
    for (const child of Array.from(parentElement.children) as HTMLElement[]) {
      if (Array.from(child.attributes).some((attr) => attr.name.startsWith('fs-'))) {
        return child;
      }
    }

    // 3. Traverse parents and return the closest one with an 'fs-' attribute
    let ancestor: HTMLElement | null = parentElement;
    while (ancestor) {
      if (Array.from(ancestor.attributes).some((attr) => attr.name.startsWith('fs-'))) {
        return ancestor;
      }
      ancestor = ancestor.parentElement;
    }
  }

  return null;
};

/**
 * Checks if the given element is a void element and returns the parent to apply styles.
 * @param element - The HTMLElement to check.
 * @returns HTMLElement - The element to apply the ::before styles to.
 */
const getValidElementForPseudo = (element: HTMLElement): HTMLElement | null | undefined => {
  if (voidElements.includes(element.tagName.toLowerCase())) {
    // going 2 levels up seems the perfect guess :)
    // like checkboxes and radios have some 2-3 elements wrapping them
    return element.parentElement?.parentElement || element;
  }
  return element;
};

/**
 * Updates or creates a style element in the document's head with the given CSS content.
 * @param cssContent - The CSS content to be injected into the style element.
 */
const updateOrCreateStyleElement = (cssContent: string): void => {
  let styleElement = document.getElementById('helper');

  if (styleElement) {
    styleElement.innerHTML = cssContent;

    return;
  }

  styleElement = document.createElement('style'); // Create new style element
  styleElement.id = 'helper';
  styleElement.innerHTML = cssContent;
  document.head.appendChild(styleElement);
};

const debouncedMouseMove = debounce((event: MouseEvent) => {
  if (!showTooltip) return;

  const target = event.target as HTMLElement;

  const dataHoverElement = document.querySelector('[data-hover]');

  if (dataHoverElement) {
    dataHoverElement.removeAttribute('data-hover');
    dataHoverElement.removeAttribute('style');

    const styleElement = document.getElementById('helper');
    if (styleElement) {
      styleElement.remove();
    }
  }

  const fsElement = findElementWithFsAttributes(target);
  console.log('fsElement:', fsElement);
  console.log('target hovered:', target);

  if (!fsElement) return;

  const fsAttributes = Array.from(fsElement.attributes).filter((attr) => attr.name.startsWith('fs-'));

  const elementToStyle = getValidElementForPseudo(target);

  if (fsAttributes.length > 0 && elementToStyle) {
    const list = fsAttributes.map((attr) => `${attr.name} = ${attr.value}`).join('\\A ');

    elementToStyle.setAttribute('data-hover', '');
    elementToStyle.style.position = 'relative';

    elementToStyle.style.setProperty('--tooltip-top', '0.5rem');
    elementToStyle.style.setProperty('--tooltip-left', '0');

    // todo: tooltip sometimes dissapears
    const rect = target.getBoundingClientRect();
    const topPosition = rect.top - 30;
    const leftPosition = rect.left;

    elementToStyle.style.setProperty('--tooltip-top', `${topPosition}px`);
    elementToStyle.style.setProperty('--tooltip-left', `${leftPosition}px`);

    const styleContent = `
        [data-hover]::before {
          content: "${list}";
          white-space: pre;
          color: #003238;
          display: block;
          padding: .2rem .5rem 0 .5rem;
          background-color: #00e4ff;
          font-size: .85rem;
          font-family: monospace;
          position: fixed;
          top: var(--tooltip-top);
          left: var(--tooltip-left);
          border-radius: .25rem;
          width: max-content;
          z-index: 9999;
          text-transform: lowercase;
          font-weight: bold;
        }
      `;

    updateOrCreateStyleElement(styleContent);
  }
}, 150);

/**
 * Query all elements that have attributes starting with 'fs-'.
 * @returns {HTMLElement[]} An array of HTMLElements that have attributes starting with 'fs-'.
 */
const queryElementsWithFsAttributes = () => {
  // Get all elements in the document
  const allElements = document.querySelectorAll('*');

  allElements.forEach((element) => {
    const hasHelper = element.classList.contains('helper');

    if (hasHelper) {
      element.classList.remove('helper');
    }
  });

  // Filter elements that have at least one attribute starting with 'fs-'
  const elementsWithFsAttributes = Array.from(allElements).filter((element) =>
    Array.from(element.attributes).some((attr) => attr.name.startsWith('fs-'))
  );

  const altTags = ['INPUT'];

  // if element is void element, return the parent element
  const elements = elementsWithFsAttributes.map((element) => {
    if (
      altTags.includes(element.tagName) &&
      (element.getAttribute('type') === 'checkbox' || element.getAttribute('type') === 'radio')
    ) {
      return (
        element.parentElement?.querySelector('.fs-checkbox_button') ||
        element.parentElement?.querySelector('.fs-radio_button') ||
        element
      );
    }

    return element;
  });

  return elements;
};

const initializeFsElementMouseover = (): void => {
  document.addEventListener('mouseover', debouncedMouseMove);

  const helperElements = queryElementsWithFsAttributes();

  // init the .helper class on key press
  document.addEventListener('keydown', (e) => {
    if (e.key === '?') {
      showTooltip = !showTooltip;

      if (!showTooltip) {
        const dataHoverElement = document.querySelector('[data-hover]');

        if (dataHoverElement) {
          dataHoverElement.removeAttribute('data-hover');
          dataHoverElement.removeAttribute('style');
        }
      }

      helperElements.forEach((element) => {
        if (element) {
          element.classList.toggle('helper');
        }
      });
    }
  });
};

initializeFsElementMouseover();
