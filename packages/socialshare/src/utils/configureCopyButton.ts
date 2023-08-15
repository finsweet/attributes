import ClipboardJS from 'clipboard';

/**
 * Configures clipboard JS api for the passed copy button element and url
 * @param copyButton
 * @param copyUrl
 */
export const configureCopyButton = (copyButton: HTMLElement, copyUrl: string) => {
  new ClipboardJS(copyButton, {
    text: function () {
      return copyUrl;
    },
  });
};
