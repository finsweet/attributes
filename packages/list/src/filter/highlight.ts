import type { ListItem } from '../components/ListItem';
import { getAttribute } from '../utils/selectors';

export const highlightItems = (highlightFields: Set<unknown>, item: ListItem) => {
  const fields = item.element.querySelectorAll('[fs-list-field]');
  const className = getAttribute(item.element, 'highlightclass') || 'is-list-highlight';
  fields.forEach((field) => {
    const value = getAttribute(field, 'field');
    if (highlightFields.has(value)) {
      field.classList.add(className);
    }
  });
};

export const removeHighlight = (item: ListItem) => {
  const fields = item.element.querySelectorAll('[fs-list-field]');
  const className = getAttribute(item.element, 'highlightclass') || 'is-list-highlight';
  fields.forEach((field) => {
    field.classList.remove(className);
  });
};
