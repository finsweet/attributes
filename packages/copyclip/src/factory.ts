import { isFormField } from '@finsweet/ts-utils';
import ClipboardJS from 'clipboard';

/**
 * Creates a new `ClipboardJS` instance.
 * @param params
 * @returns The `destroy` method.
 */
export const createClipboardJsInstance = ({
  trigger,
  textToCopy,
  target,
  textNode,
  originalText,
  successMessage,
  successDuration,
  successClass,
}: {
  trigger: HTMLElement;
  textToCopy?: string | null;
  target?: Element | null;
  textNode?: ChildNode;
  originalText?: string | null;
  successMessage?: string | null;
  successDuration: number;
  successClass: string;
}) => {
  const clipboard = new ClipboardJS(trigger, {
    text: () => {
      if (textToCopy) return textToCopy;

      if (target) {
        const text = isFormField(target) ? target.value : target.textContent || '';
        return text;
      }

      return trigger.textContent || '';
    },
  });

  let successState = false;

  // Clear selection after copy
  clipboard.on('success', (event: ClipboardJS.Event) => {
    event.clearSelection();

    if (successState) return;

    successState = true;

    // Add the success CSS class
    trigger.classList.add(successClass);

    // Add the success message
    if (textNode && successMessage) textNode.textContent = successMessage;

    // Reset after duration
    setTimeout(() => {
      trigger.classList.remove(successClass);
      if (textNode) textNode.textContent = originalText || '';

      successState = false;
    }, successDuration);
  });

  return clipboard.destroy;
};
