import { animations, type Easings } from '@finsweet/attributes-utils';
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

/**
 * X-ray mode active state.
 */
let xrayActive = true;
/**
 * Tooltip element.
 */
let tooltip: HTMLElement | null;
/**
 * Initial load state.
 */
let initialLoad = true;
/**
 * Store for elements with 'x-ray' attribute.
 */
let xrayElements: HTMLElement[] = [];
/**
 * Store xray active element
 */
let xrayActiveElement: HTMLElement | null;
/**
 * Default values for x-ray mode.
 */
let textColor = '#003238';
let backgroundColor = '#00e4ff';
let animation: keyof typeof animations = 'fade';
let easing: Easings[number] = 'ease-in-out';
let duration = 150;
let keyCode = '?';
let targetClass = 'x-ray';

const altTags = ['INPUT'];
const script = document.currentScript as HTMLScriptElement;

/**
 * Searches for the closest element up the DOM tree that has any attribute starting with 'fs-'.
 * @param element - The starting HTMLElement to check.
 * @returns The found element with 'fs-' attributes or null if none found.
 */
const findElementWithFsAttributes = (element: HTMLElement): HTMLElement | null => {
  // 1. Check the current element
  if (Array.from(element.attributes).some((attr) => attr.name.startsWith('fs-'))) {
    return element;
  }

  // 2. Check children of the parent element if they have 'fs-' attributes
  const { parentElement } = element;
  if (parentElement) {
    // check its children
    for (const child of Array.from(parentElement.children) as HTMLElement[]) {
      if (Array.from(child.attributes).some((attr) => attr.name.startsWith('fs-'))) {
        return child;
      }
    }

    // 3. Traverse parents and return the closest one with an 'fs-' attribute
    let ancestor: HTMLElement | null = element;
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
 * @returns The element to apply the xray outline styles to.
 */
const getValidElementForPseudo = (element: HTMLElement): HTMLElement | null | undefined => {
  if (voidElements.has(element.tagName.toLowerCase())) {
    // going 2 levels up seems the perfect approach :)
    // like checkboxes and radios have some 2-3 elements wrapping them
    return element.parentElement?.parentElement || element;
  }
  return element;
};

/**
 * Updates the position of the tooltip element relative to the target element.
 * @param element - The target element.
 * @param tooltip - The tooltip element.
 */
const updateTooltipPosition = () => {
  if (!tooltip || !xrayActiveElement) return;

  // Measure the tooltip and target element
  const targetRect = xrayActiveElement.getBoundingClientRect();
  const tooltipHeight = tooltip.offsetHeight;
  const viewportWidth = window.innerWidth;

  // Calculate the top position of the tooltip
  const tooltipTop = targetRect.top - tooltipHeight - 10;
  let tooltipLeft = targetRect.left;

  // Adjust left position if the target is in the right half of the viewport
  if (targetRect.left + targetRect.width / 2 > viewportWidth / 2 && xrayActiveElement.clientWidth < 150) {
    tooltipLeft = targetRect.left + targetRect.width / 2 - tooltip.offsetWidth / 2 - 50;
  }

  tooltip.style.left = `${tooltipLeft}px`;
  tooltip.style.top = `${tooltipTop}px`;
};
/**
 * Creates a tooltip element and appends it to the DOM.
 * @param element
 * @param content
 */
const showTooltipElement = async (element: HTMLElement, content: string) => {
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'tooltip-xray';
    tooltip.style.position = 'fixed';
    tooltip.style.zIndex = '9999';
    tooltip.style.backgroundColor = backgroundColor;
    tooltip.style.color = textColor;
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
  tooltip.style.opacity = '0';

  // update tooltip position
  xrayActiveElement = element;
  updateTooltipPosition();

  // animate
  await animations[animation].animateIn(tooltip, { duration, easing });
};

/**
 * Removes the tooltip element from the DOM.
 */
const removeTooltip = () => {
  const tooltip = document.getElementById('tooltip-xray');

  if (tooltip) {
    tooltip.remove();
  }
};

/**
 * Checks if the element has an 'x-ray' attribute set to 'ignore' and disables x-ray mode for that element.
 * @param element - The element to check.
 * @returns true if the element was ignored, otherwise false.
 */
const checkAndIgnoreElement = (element: Element | null): boolean => {
  if (element?.getAttribute('x-ray') === 'ignore') {
    const closestIgnore = element.closest('[x-ray="ignore"]');
    // handle closest parent with x-ray ignore
    if (closestIgnore) {
      closestIgnore.classList.remove(targetClass);
    }

    // handle element itself
    element.classList.remove(targetClass);

    return true;
  }

  return false;
};

/**
 * Debounced mousemove event listener to show tooltips on elements with 'fs-' attributes.
 */
const debouncedMouseMove = debounce(async (event: MouseEvent) => {
  if (!xrayActive) return;

  tooltip = document.querySelector<HTMLElement>('#tooltip-xray');

  if (tooltip) {
    await animations[animation].animateOut(tooltip, { display: 'none', duration, easing });
  }

  const target = event.target as HTMLElement;

  const fsElement = findElementWithFsAttributes(target);

  if (!fsElement) {
    removeTooltip();

    return;
  }

  const fsAttributes = Array.from(fsElement.attributes).filter((attr) => attr.name.startsWith('fs-'));

  const elementToStyle = getValidElementForPseudo(target);

  if (!xrayActive || !elementToStyle) {
    return;
  }

  if (fsAttributes.length > 0) {
    if (checkAndIgnoreElement(elementToStyle) || checkAndIgnoreElement(fsElement)) return;

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
 * @returns An array of HTMLElements that have attributes starting with 'fs-'.
 */
const queryElementsWithFsAttributes = () => {
  // Get all elements in the document
  const allElements = document.querySelectorAll<HTMLElement>('*');
  // get all elements with x-ray class
  const xrayElements = document.querySelectorAll<HTMLElement>(targetClass);

  if (xrayElements.length > 0 && !xrayActive) {
    xrayElements.forEach((element) => {
      element.classList.remove(targetClass);
    });
  }

  // Filter elements that have at least one attribute starting with 'fs-'
  const elementsWithFsAttributes = Array.from(allElements).filter((element) =>
    Array.from(element.attributes).some((attr) => attr.name.startsWith('fs-'))
  );

  // if element is void element, return the parent element
  const elements = elementsWithFsAttributes.map((element) => {
    if (
      altTags.includes(element.tagName) &&
      (element.getAttribute('type') === 'checkbox' || element.getAttribute('type') === 'radio')
    ) {
      return (
        element.parentElement?.querySelector<HTMLElement>('.fs-checkbox_button') ||
        element.parentElement?.querySelector<HTMLElement>('.fs-radio_button') ||
        element
      );
    }

    return element;
  });

  return elements;
};

/**
 * Set or update the tooltip style in the head of the document.
 */
const updateTooltipStyle = () => {
  let style = document.getElementById('tooltip-xray-style');

  if (!style) {
    style = document.createElement('style');
    style.setAttribute('id', 'tooltip-xray-style');

    document.head.appendChild(style);
  }

  style.innerHTML = `
    .${targetClass}, .${targetClass}:hover {
      outline-color: ${backgroundColor};
      outline-offset: 3px;
      outline-width: 1px;
      outline-style: solid;
    }
  `;
};

/**
 * Initialize the mouseover event listener for elements with 'fs-' attributes.
 */
const xrayInit = (): void => {
  textColor = script?.getAttribute('text-color') || '#003238';
  backgroundColor = script?.getAttribute('background-color') || '#00e4ff';
  animation = (script?.getAttribute('animation') as keyof typeof animations) || 'fade';
  easing = (script?.getAttribute('easing') as Easings[number]) || 'ease-in-out';
  duration = Number(script?.getAttribute('duration')) || 150;
  keyCode = script?.getAttribute('key') || '?';
  targetClass = script?.getAttribute('target-class') || 'x-ray';

  updateTooltipStyle();

  const xrayDefaultElements = document.querySelectorAll('.helper');

  // clear any existing helper classes that were added in webflow so that script can manage it.
  if (xrayDefaultElements.length > 0) {
    xrayDefaultElements.forEach((xray) => {
      xray.classList.remove('helper');
    });
  }

  xrayElements = queryElementsWithFsAttributes();

  if (initialLoad) {
    xrayElements.forEach((element) => {
      if (checkAndIgnoreElement(element)) return;

      if (element) {
        element.classList.add(targetClass);
      }
    });

    initialLoad = false;
  }
};

/**
 * Handle the keydown event to toggle the x-ray mode.
 * @param e
 */
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === keyCode) {
    xrayActive = !xrayActive;

    if (!xrayActive) {
      removeTooltip();
    }

    xrayElements.forEach((element) => {
      if (checkAndIgnoreElement(element)) return;

      element.classList.toggle(targetClass);
    });
  }
};

/**
 * Handle the scroll event to update the tooltip position.
 */
const handleScroll = () => {
  if (xrayActiveElement) {
    updateTooltipPosition();
  }
};

// dom ready
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('mouseover', debouncedMouseMove);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('scroll', handleScroll, { passive: true });

  const config: MutationObserverInit = {
    childList: true,
    subtree: true,
  };

  const debouncedCallback = debounce(xrayInit, 150);
  const observer = new MutationObserver(debouncedCallback);
  observer.observe(document.body, config);
});
