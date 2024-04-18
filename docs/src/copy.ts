export const elements = [
  // script tag
  {
    target: '.copy_button',
    text: '.docs-2_script_richtext p',
    textContent: true,
    format: true,
    stopPropagation: false,
    button: true,
    changeText: true,
  },
  {
    target: '.docs-2_flashcard-header-component .copy_button-dark',
    text: '.docs-2_script_richtext p',
    textContent: true,
    format: true,
    stopPropagation: false,
    detached: true,
    button: true,
    changeText: true,
  },
  // text attributes
  {
    target: '.panel_attributes_copy',
    text: '.panel_attributes_value',
    textContent: true,
    format: false,
    stopPropagation: false,
    changeText: true,
  },

  {
    target: '.docs-2_tag_item .docs-2_tag_block',
    text: '',
    textContent: true,
    format: false,
    stopPropagation: true,
  },
  {
    target: '.docs-2_tag_item .docs-2_tag_block',
    text: '',
    textContent: true,
    format: false,
    stopPropagation: true,
  },
];

/**
 * Reformats a script tag so that each attribute is on a new line.
 * @param {string} script - The script tag as a string.
 * @returns {string} The reformatted script tag.
 */
const reformatScriptTag = (script: string): string => {
  return script.replace(/(<script|\s)(.*?)\s(.*?=".*?")/gs, '$1$2\n$3').replace(/\s>/, '\n>');
};

/**
 * Injects the specified CSS into the head of the document.
 * @param cssString - The CSS string to be injected.
 */
const injectCSS = (cssString: string): void => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssString;
  document.head.appendChild(style);
};

// Define the CSS string
const cssString = `
.copied-text::before {
  content: "";
  color: black;
  position: absolute;
  top: -1.8rem;
  visibility: hidden;
  opacity: 0;
  background-color: white;
  padding: 0rem 0.2rem;
  border-radius: 0.15rem;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 0.8rem;
  font-weight: 500;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

.copied-text.copied-visible::before {
  visibility: visible;
  opacity: 1;
  content: "Copied!";
  transition-delay: 0s;
}

.copied-text{
  position: relative;
}
`;

const enableElement = (element: HTMLElement, textAlt = '') => {
  const originalText = element.textContent;

  // query button_text element

  if (textAlt) {
    const button_text = element.querySelector('.button_text');
    if (button_text) button_text.textContent = textAlt;
    else element.textContent = textAlt;

    setTimeout(() => {
      if (button_text) button_text.textContent = originalText;
      else element.textContent = originalText;
      element.style.pointerEvents = 'auto';
    }, 1000);
  } else {
    element.style.pointerEvents = 'auto';
    element.classList.add('copied-visible');

    setTimeout(() => {
      element.classList.remove('copied-visible');
      element.style.pointerEvents = 'auto';
    }, 1000);
  }
};
const disableElement = (element: HTMLElement) => {
  element.style.pointerEvents = 'none';
};

const copyToClipboard = (textToCopy: string, element: HTMLElement, textAlt = '', textOnly?: boolean) => {
  if (navigator.clipboard && textToCopy) {
    disableElement(element);

    const text = `<!-- Finsweet Attributes -->\n<script async type="module"${textToCopy}\n></script>`;
    const copyText = textOnly ? textToCopy : text;
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        enableElement(element, textAlt);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        enableElement(element, textAlt);
      });
  } else {
    console.error('Clipboard API not available.');
  }
};

/**
 * Reformat a script tag string with each attribute on a new line using DOMParser.
 * @param {string} scriptString - The script tag as a string.
 * @returns {string} The reformatted script tag.
 */
const reformatScriptUsingDOMParser = (scriptString: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(scriptString, 'text/html');
  const scriptElement = doc.querySelector('script');

  if (!scriptElement) return '';

  // Start constructing the reformatted string with the script tag and mandatory attributes
  let reformattedScript = ``;

  // Then handle 'src' or any other attributes on new lines
  const otherAttributes = Array.from(scriptElement.attributes).filter((attr) => !['async', 'type'].includes(attr.name));

  for (const attr of otherAttributes) {
    reformattedScript += `\n${attr.name}`;
    if (attr.value) {
      reformattedScript += `="${attr.value}"`;
    }
  }

  return reformattedScript;
};

export const initCopy = () => {
  elements.forEach((element) => {
    const copyButtons = document.querySelectorAll<HTMLElement>(element.target);

    if (copyButtons) {
      copyButtons.forEach((copyButton) => {
        // add default style copied-text
        // Add class to show "Copied!"
        copyButton.classList.add('copied-text');

        let textElement: HTMLElement;

        if (element?.text && element?.button) {
          // handle copy script for button
          const parent = copyButton.parentElement;
          if (element?.detached) {
            textElement = document.querySelector(element.text) as HTMLElement;
          } else {
            textElement = parent?.querySelector(element.text) as HTMLElement;
          }
        } else if (element.text && !element?.button) {
          // handle copy script for non-button, these are attributes name sand attribute values
          const closest = copyButton.closest(element.text) as HTMLElement;

          if (closest) {
            textElement = closest;
          } else {
            const parent = copyButton.parentElement;
            textElement = parent?.querySelector(element.text) as HTMLElement;
          }
        } else {
          // handle copy script for non-button, these are attributes name sand attribute values
          textElement = copyButton;
        }

        textElement.classList.add('copied-text');

        copyButton.addEventListener(
          'click',
          (e) => {
            if (element.stopPropagation) {
              e.stopPropagation();
              e.stopImmediatePropagation();
            }

            if (element?.textContent) {
              if (element?.format) {
                const text = textElement?.textContent || 'Failed to copy';
                // convert to DOM, then reconstruct the output property with Finsweet Attribute Heading
                const formattedText = reformatScriptUsingDOMParser(text);
                const changeText = element?.changeText;
                copyToClipboard(reformatScriptTag(formattedText), copyButton, changeText ? 'Copied!' : '');
              } else {
                if (element.changeText) {
                  const text = textElement?.textContent || 'Failed to copy';
                  copyToClipboard(text, copyButton, 'Copied!', true);
                } else {
                  const text = textElement?.textContent || 'Failed to copy';
                  copyToClipboard(text, textElement, '', true);
                }
              }
            }
          },
          {
            capture: element?.stopPropagation ? true : false,
          }
        );
      });
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // Inject the CSS into the <head>
  injectCSS(cssString);

  initCopy();
});
