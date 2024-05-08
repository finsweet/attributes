interface Configurator {
  target: string;
  text: string;
  textContent: boolean;
  script?: boolean;
  stopPropagation: boolean;
  button?: boolean;
  changeText?: boolean;
  detached?: boolean;
}
/**
 * Copy Elements Configuration
 * TODO: migrate this to attribute when ready.
 */
export const configurator: Configurator[] = [
  // script tag
  {
    target: '.copy_button',
    text: '.docs-2_script_richtext p',
    textContent: true,
    script: true,
    stopPropagation: false,
    button: true,
    changeText: true,
  },
  {
    target: '.docs-2_flashcard-header-component .copy_button-dark',
    text: '.docs-2_script_richtext p',
    textContent: true,
    script: true,
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
    stopPropagation: false,
    changeText: true,
  },

  {
    target: '.docs-2_tag_item .docs-2_tag_block',
    text: '',
    textContent: true,
    stopPropagation: true,
  },
  {
    target: '.docs-2_tag_item .docs-2_tag_block',
    text: '',
    textContent: true,
    stopPropagation: true,
  },
];

/**
 * CSS string to be injected into the head of the document.
 */
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

/**
 * Injects the specified CSS into the head of the document.
 * @param cssString - The CSS string to be injected.
 */
const injectCSS = (cssString: string): void => {
  const style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = cssString;

  document.head.appendChild(style);
};

/**
 * Enable an element by setting its pointer events to auto and toggle the copied text.
 * @param element - The element to enable.
 * @param textToShow - The text to show after copying.
 * @returns
 */
const enableElement = (element: HTMLElement, textToShow = '') => {
  const { textContent } = element;

  if (textToShow) {
    const buttonText = element.querySelector('.button_text');

    if (buttonText) buttonText.textContent = textToShow;
    else element.textContent = textToShow;

    setTimeout(() => {
      if (buttonText) buttonText.textContent = textContent;
      else element.textContent = textContent;

      element.style.pointerEvents = 'auto';
    }, 1000);

    return;
  }

  element.style.pointerEvents = 'auto';
  element.classList.add('copied-visible');

  setTimeout(() => {
    element.classList.remove('copied-visible');
    element.style.pointerEvents = 'auto';
  }, 1000);
};

/**
 * Disable an element by setting its pointer events to none.
 * @param element - The element to disable.
 */
const disableElement = (element: HTMLElement) => {
  element.style.pointerEvents = 'none';
};

/**
 * Copy the text to the clipboard.
 * @param text - The text to copy.
 * @param element - The element to enable after copying.
 * @param textToShow - The text to show after copying.
 */
const copy = (text: string, element: HTMLElement, textToShow = '') => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      enableElement(element, textToShow);
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
      enableElement(element, textToShow);
    });
};

/**
 * Copy the Finsweet Attributes Script to the clipboard.
 * @param element - trigger element
 * @param scriptString - script string
 * @param textToShow - text to show after copying
 * @returns
 */
const copyScript = (scriptString: string | null, element: HTMLElement, textToShow = '') => {
  if (!navigator.clipboard || !scriptString) {
    console.error('Clipboard API not available.');

    return;
  }

  const attributes = extractAttributes(scriptString);
  disableElement(element);

  const text = `<!-- Finsweet Attributes -->\n<script async type="module"${attributes}\n></script>`;

  // copy
  copy(text, element, textToShow);
};

/**
 * Copy the Finsweet Attributes Text to the clipboard.
 * @param content - attribute name or value
 * @param element - trigger element
 * @param textToShow - text to show after copying
 * @returns
 */
const copyText = (content: string, element: HTMLElement, textToShow = '') => {
  if (!navigator.clipboard || !content) {
    console.error('Clipboard API not available.');

    return;
  }

  disableElement(element);

  // copy
  copy(content.trim(), element, textToShow);
};

/**
 * Reformat a script tag string with each attribute on a new line using DOMParser.
 * @param scriptString - The script tag as a string.
 * @returns The reformatted attributes.
 */
const extractAttributes = (scriptString: string): string => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(scriptString, 'text/html');
  const scriptElement = doc.querySelector('script');

  if (!scriptElement) return '';

  let attributes = ``;

  // handle 'src' or any other attributes on new lines
  const otherAttributes = Array.from(scriptElement.attributes).filter((attr) => !['async', 'type'].includes(attr.name));

  for (const attr of otherAttributes) {
    attributes += `\n${attr.name}`;
    if (attr.value) {
      attributes += `="${attr.value.trim()}"`;
    }
  }

  return attributes;
};

/**
 * Handle the copy event.
 * @param e - The event object.
 * @param textElement - The element to copy the text from.
 * @param config - Element Configurations
 * @param target - The target element.
 * @returns
 */
const handleCopy = (e: Event, textElement: HTMLElement, config: Configurator, target: HTMLElement) => {
  if (config.stopPropagation) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  if (config?.script) {
    copyScript(textElement?.textContent, target, config?.changeText ? 'Copied!' : '');

    return;
  }

  if (config.changeText) {
    const text = textElement?.textContent || 'Failed to copy';

    copyText(text, target, 'Copied!');

    return;
  }

  const text = textElement?.textContent || 'Failed to copy';

  copyText(text, textElement, '');
};

/**
 * Initialize the copy functionality.
 * @param config - The configuration object.
 */
export const initCopy = (config: Configurator) => {
  const targetElements = document.querySelectorAll<HTMLElement>(config.target);

  if (targetElements.length === 0) return;

  targetElements.forEach((target) => {
    // add default style copied-text
    // Add class to show "Copied!"
    target.classList.add('copied-text');

    if (config.text && config.button) {
      // handle copy script for button
      const parent = target.parentElement;

      let textElement = parent?.querySelector(config.text) as HTMLElement;

      if (config?.detached) textElement = document.querySelector(config.text) as HTMLElement;

      addClickEventListener(target, textElement, config);

      return;
    }

    if (config.text && !config?.button) {
      // handle copy script for non-button, these are attributes name sand attribute values
      const closest = target.closest(config.text) as HTMLElement;
      const parent = target.parentElement;

      let textElement = parent?.querySelector(config.text) as HTMLElement;

      if (closest) textElement = closest;

      addClickEventListener(target, textElement, config);

      return;
    }

    // handle copy script for non-button, these are attributes names and attribute values
    addClickEventListener(target, target, config);
  });
};

/**
 * Add click event to the copy button.
 * @param target - The target element to add the event listener to.
 * @param textElement - The element to copy the text from.
 * @param element - The copy element object.
 */
const addClickEventListener = (target: HTMLElement, textElement: HTMLElement, config: Configurator) => {
  textElement.classList.add('copied-text');

  target.addEventListener('click', (e) => handleCopy(e, textElement, config, target), {
    capture: config?.stopPropagation ? true : false,
  });
};

// DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  // Inject the CSS into the <head>
  injectCSS(cssString);

  configurator.forEach(initCopy);
});
