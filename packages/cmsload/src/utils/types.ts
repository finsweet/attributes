/**
 * `Pagination` mode:
 */
export interface PageButtonsData {
  pageButtonTemplate: HTMLElement;
  pageDotsTemplate: HTMLElement;
  parentElement: HTMLElement;
  pageBoundary: number;
  pageSiblings: number;
  renderedElements: Map<HTMLElement, number | null>;
}
