import { getAttribute } from './utils/selectors';

/**
 * Inits the date element.
 * @param dateElement
 */
export const initDateElement = async (dateElement: HTMLElement) => {
  const value = getAttribute(dateElement, 'value');
  const parse = getAttribute(dateElement, 'parse');

  let date: Date | undefined | null;

  if (value) {
    const chrono = await import('chrono-node');

    date = chrono.parseDate(value);
  } else if (parse) {
    const chrono = await import('chrono-node');

    const referenceDate = new Date(dateElement.innerText);

    const ref = isNaN(referenceDate.getTime()) ? new Date() : referenceDate;

    date = chrono.parseDate(parse, ref);
  }

  if (!date) {
    date = new Date(dateElement.innerText);
  }

  // Get the date on the element
  const locale = getAttribute(dateElement, 'locale');
  const year = getAttribute(dateElement, 'year', true);
  const weekday = getAttribute(dateElement, 'weekday', true);
  const month = getAttribute(dateElement, 'month', true);
  const day = getAttribute(dateElement, 'day', true);

  const formatted = new Intl.DateTimeFormat(locale, { year, weekday, month, day }).format(date);

  dateElement.innerText = formatted;
};
