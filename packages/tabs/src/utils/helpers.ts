import { getAttribute } from './selectors';

export function getActiveClassAttributeValue(element: Element): string | null {
  const activeClassValue = getAttribute(element, 'activeclass');
  if (activeClassValue) {
    return activeClassValue;
  }

  for (const child of element.children) {
    const childValue = getActiveClassAttributeValue(child);
    if (childValue) {
      return childValue;
    }
  }
  return null;
}

export function getTabNameFromQuery() {
  const queryParam = window.location.search;
  if (queryParam) {
    return queryParam.replace('?', '');
  }
  return null;
}
