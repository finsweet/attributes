const hiddenInput = document.querySelector<HTMLInputElement>('[fs-support-url="hidden-input"]');

function setInputError(field: HTMLElement) {
  if (hiddenInput) {
    hiddenInput.value = '';
  }
  field.style.border = '1px solid red';
}

function setInputOk(field: HTMLElement, copyText: string) {
  if (hiddenInput) {
    hiddenInput.value = copyText;
  }

  field.style.border = '1px solid green';
}

function generateSupportUrlEvent(event: Event) {
  if (!event || !event.target) {
    return;
  }

  const target = event.target as HTMLInputElement;
  const { value } = target;

  const inputValue = value;

  if (!inputValue) {
    setInputError(target);
  }

  const https = inputValue.substring(0, 8) === 'https://';
  const http = inputValue.substring(0, 7) === 'http://';

  const urlEntry = !https && !http ? `https://${inputValue}` : inputValue;

  try {
    const url = new URL(urlEntry);

    if (!url.origin.includes('webflow.io')) {
      setInputError(target);
      return;
    }

    url.searchParams.append('fs-attributes-support', 'true');

    setInputOk(target, url.toString());
  } catch {
    setInputError(target);
  }
}

function initGenerateUrlForm() {
  const urlInput = document.querySelector('[fs-support-url="user-input"]');

  if (urlInput) {
    urlInput.addEventListener('keyup', generateSupportUrlEvent);
    urlInput.addEventListener('blur', generateSupportUrlEvent);
  }
}

initGenerateUrlForm();
