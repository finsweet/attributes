import debounce from 'just-debounce';

const voidElements = new Set([
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
]);

let tooltipEnabled = true;
let tooltip: HTMLElement | null;
let initialLoad = true;

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
  if (voidElements.has(element.tagName.toLowerCase())) {
    // going 2 levels up seems the perfect approach :)
    // like checkboxes and radios have some 2-3 elements wrapping them
    return element.parentElement?.parentElement || element;
  }
  return element;
};

function showTooltipElement(element: HTMLElement, content: string) {
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'tooltip-helper';
    tooltip.style.position = 'fixed';
    tooltip.style.zIndex = '9999';
    tooltip.style.backgroundColor = '#00e4ff';
    tooltip.style.color = '#003238';
    tooltip.style.borderRadius = '.25rem';
    tooltip.style.padding = '.2rem .5rem';
    tooltip.style.margin = '0';
    tooltip.style.fontSize = '.85rem';
    tooltip.style.fontFamily = 'monospace';
    tooltip.style.width = 'max-content';

    document.body.appendChild(tooltip);
  }

  tooltip.innerHTML = content;
  tooltip.style.display = 'block';
  //visibility none
  tooltip.style.visibility = 'hidden';

  // Measure the tooltip and target element
  const targetRect = element.getBoundingClientRect();
  const tooltipHeight = tooltip.offsetHeight;
  const viewportWidth = window.innerWidth;

  // Calculate the top position of the tooltip
  const tooltipTop = targetRect.top - tooltipHeight - 10;
  let tooltipLeft = targetRect.left;

  // Adjust left position if the target is in the right half of the viewport
  if (targetRect.left + targetRect.width / 2 > viewportWidth / 2 && element.clientWidth < 150) {
    tooltipLeft = targetRect.left + targetRect.width / 2 - tooltip.offsetWidth / 2 - 50;
  }

  tooltip.style.left = `${tooltipLeft}px`;
  tooltip.style.top = `${tooltipTop}px`;

  // show
  tooltip.style.visibility = 'visible';
}

function removeTooltip() {
  const tooltip = document.getElementById('tooltip-helper');

  if (tooltip) {
    tooltip.remove();
  }
}

const debouncedMouseMove = debounce((event: MouseEvent) => {
  if (!tooltipEnabled) return;

  tooltip = document.querySelector<HTMLElement>('#tooltip-helper');

  if (tooltip) {
    tooltip.style.display = 'none';
  }

  const target = event.target as HTMLElement;

  const fsElement = findElementWithFsAttributes(target);
  console.log('fsElement:', fsElement);
  console.log('target hovered:', target);

  if (!fsElement) {
    removeTooltip();

    return;
  }

  const fsAttributes = Array.from(fsElement.attributes).filter((attr) => attr.name.startsWith('fs-'));

  const elementToStyle = getValidElementForPseudo(target);

  if (fsAttributes.length > 0 && elementToStyle) {
    const list = fsAttributes
      .map(
        (attr) =>
          `<span style="font-weight:bold;">${attr.name}</span><span style="opacity:0.5">=</span><span style="opacity:0.5">"</span><span style="font-weight:bold;">${attr.value}</span><span style="opacity:0.5">"</span>`
      )
      .join('<br/>');

    showTooltipElement(fsElement, list);
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

/**
 * Initialize the mouseover event listener for elements with 'fs-' attributes.
 */
const initializeFsElementMouseover = (): void => {
  document.addEventListener('mouseover', debouncedMouseMove);

  const defaultHelpers = document.querySelectorAll('.helper');
  const helperElements = queryElementsWithFsAttributes();

  // clear any existing helper classes that were added in webflow so that script can manage it.
  if (defaultHelpers.length > 0) {
    defaultHelpers.forEach((helper) => {
      helper.classList.remove('helper');
    });
  }

  if (initialLoad) {
    helperElements.forEach((element) => {
      if (element) {
        element.classList.add('helper');
      }
    });

    initialLoad = false;
  }

  // init the .helper class on key press
  document.addEventListener('keydown', (e) => {
    console.log('keycode', { key: e.key, which: e.which, code: e.code });
    if (e.key === '?' || e.which === 191 || e.keyCode === 191) {
      tooltipEnabled = !tooltipEnabled;

      if (!tooltipEnabled) {
        removeTooltip();
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
