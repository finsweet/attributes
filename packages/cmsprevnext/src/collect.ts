import { queryElement } from './constants';

/**
 * @returns The stakeholder elements, if existing.
 */
export const collectElements = ():
  | {
      previousPlaceholder: HTMLElement | null;
      nextPlaceholder: HTMLElement | null;
      previousEmptyElement: HTMLElement | null;
      nextEmptyElement: HTMLElement | null;
    }
  | undefined => {
  const previousPlaceholder = queryElement<HTMLElement>('previous', { operator: 'prefixed' });

  const nextPlaceholder = queryElement<HTMLElement>('next', { operator: 'prefixed' });

  if (!previousPlaceholder && !nextPlaceholder) return;

  const previousEmptyElement = queryElement<HTMLElement>('previousEmpty', { operator: 'prefixed' });
  previousEmptyElement?.remove();

  const nextEmptyElement = queryElement<HTMLElement>('nextEmpty', { operator: 'prefixed' });

  nextEmptyElement?.remove();

  return { previousPlaceholder, nextPlaceholder, previousEmptyElement, nextEmptyElement };
};
