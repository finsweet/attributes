import { getAttribute } from './utils/selectors';

export const initDateElement = (dateElement: HTMLElement) => {
  // Get the date on the element
  const date = new Date(dateElement.innerText);

  const locale = getAttribute(dateElement, 'locale');
  const year = getAttribute(dateElement, 'year', true);
  const weekday = getAttribute(dateElement, 'weekday', true);
  const month = getAttribute(dateElement, 'month', true);
  const day = getAttribute(dateElement, 'day', true);

  const formatted = new Intl.DateTimeFormat(locale, { year, weekday, month, day }).format(date);

  dateElement.innerText = formatted;
};
