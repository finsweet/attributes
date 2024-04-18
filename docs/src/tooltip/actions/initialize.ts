import { type TooltipInstance, type TooltipOptions } from '../utils';
import { setupTooltip } from '.';

const createHelper = (
  color: string,
  background: string,
  textContent: string,
  target?: HTMLElement,
  badge?: boolean,
  arrow?: boolean
) => {
  if (arrow) {
    const exists = target?.querySelector<HTMLElement>('#helper-arrow');
    if (exists) return exists;

    const arrow = document.createElement('div');

    arrow.style.position = 'absolute';
    arrow.style.background = background;
    arrow.style.width = '8px';
    arrow.style.height = '8px';
    arrow.style.transform = 'rotate(45deg)';

    return arrow;
  }

  if (badge) {
    const exists = target?.querySelector<HTMLElement>('#helper-badge');
    if (exists) return exists;

    const badge = document.createElement('div');

    badge.style.position = 'absolute';
    badge.style.left = '-12px';
    badge.style.top = '-12px';
    badge.style.background = background;
    badge.style.color = color;
    badge.style.width = '24px';
    badge.style.height = '24px';
    badge.style.borderRadius = '50%';
    badge.style.display = 'flex';
    badge.style.justifyContent = 'center';
    badge.style.alignItems = 'center';
    badge.style.fontFamily = 'monospace';
    badge.style.fontWeight = 'bold';

    // set id
    badge.id = 'helper-badge';

    return badge;
  }

  const exists = target?.querySelector<HTMLElement>('[helper-tooltip]');
  if (exists) return exists;

  const tooltip = document.createElement('div');

  tooltip.style.display = 'none';
  tooltip.style.width = 'max-content';
  tooltip.style.minHeight = 'max-content';
  tooltip.style.position = 'absolute';
  tooltip.style.top = '0';
  tooltip.style.left = '0';
  tooltip.style.backgroundColor = background;
  tooltip.style.color = color;
  tooltip.style.fontWeight = 'bold';
  tooltip.style.borderRadius = '0.25rem';
  tooltip.style.fontSize = '0.85rem';
  tooltip.style.textTransform = 'lowercase';
  tooltip.style.padding = '0.5rem';
  tooltip.style.fontFamily = 'monospace';
  tooltip.style.zIndex = '999999';
  tooltip.style.opacity = '1';

  // set text content
  tooltip.innerHTML = textContent;

  return tooltip;
};

/**
 * Traverse parent elements to find children with attributes starting with 'fs-'.
 * @param target The starting element to traverse from.
 * @returns An array of attributes from the first found child with 'fs-' attribute or null if not found.
 */
const findParentWithFsChild = (target: Element): Attr[] => {
  let currentElement: Element | null = target;

  while (currentElement) {
    const fsChildren = Array.from(currentElement.children).filter((child) =>
      Array.from(child.attributes).some((attr) => attr.name.startsWith('fs-'))
    );

    if (fsChildren.length > 0) {
      // Return the attributes of the first fs-child found
      return Array.from(fsChildren[0].attributes).filter((attr) => attr.name.startsWith('fs-'));
    }

    // Move up to the next parent
    currentElement = currentElement.parentElement;
  }

  return [];
};

/**
 * Inits the tooltip attribute.
 * @param targets
 * @returns - An array of tooltip instances with cleanup functions.
 */
export const initTooltip = (target: HTMLElement, options: TooltipOptions) => {
  const instances: TooltipInstance[] = [];

  const { attributes } = target;

  if (!attributes || attributes.length === 0) return;

  // target attributes with fs- prefix
  let match = Array.from(attributes).filter((attr) => attr.name.startsWith('fs-'));

  if (match.length === 0) {
    // traverse parent element whilst checking if they have children with attribute starting with fs-, stop there if found and return the attributes of that element
    match = findParentWithFsChild(target);
  }

  const textContent = match.map((attr) => `${attr.name} = ${attr.value}`).join('<br>');

  // set relative
  target.style.position = 'relative';
  // set outline-color
  target.style.outlineColor = options.themeColor;

  // create and append tooltip and arrow elements
  const tooltip = createHelper(options.textColor, options.themeColor, textContent, target);
  target.appendChild(tooltip);

  // if we need an arrow
  const arrowElement = options.arrow
    ? createHelper(options.textColor, options.themeColor, textContent, target, false, true)
    : null;

  // badge element
  const badgeElement = options.badge
    ? createHelper(options.textColor, options.themeColor, textContent, target, true)
    : null;

  if (!tooltip || !target) return;

  if (arrowElement) {
    tooltip.appendChild(arrowElement);
  }

  if (badgeElement) {
    if (match.length > 0) badgeElement.textContent = match.length.toString();
    target.appendChild(badgeElement);
  }

  const targetId = `helper-${Math.floor(Math.random() * 10000)}`;

  tooltip.id = targetId;

  tooltip.setAttribute('role', 'tooltip');
  tooltip.setAttribute('helper-tooltip', '');
  tooltip.setAttribute('aria-hidden', 'true');

  target.setAttribute('aria-describedby', targetId);

  instances.push(setupTooltip(target, tooltip, options, arrowElement));
};

/**
 * Cleans up all tooltip instances.
 * @param instances
 */
export const cleanupTooltips = (instance: HTMLElement) => {
  const tooltip = instance.querySelector('[helper-tooltip]');
  if (tooltip) tooltip.remove();

  const badge = instance.querySelector('#helper-badge');
  if (badge) badge.remove();
};
