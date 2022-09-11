export function insertAfter(newNode: HTMLElement, referenceNode: HTMLElement) {
  referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
}
