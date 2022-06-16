export function propagateClickToField(selector: string) {
  const shadowRoot = getSupportWrapper();

  const selectorSection = shadowRoot.querySelector(selector);

  if (!selectorSection) {
    throw new Error(`Unexpected error: Element with selector "${selector}" not found`);
  }

  const parentAttribute = selectorSection.closest('.attribute');

  if (!parentAttribute) {
    throw new Error(`Unexpected error: Selector ${selector} missing attribute component`);
  }

  const fieldWrapper = parentAttribute.querySelector('.field_wrapper');

  if (!fieldWrapper) {
    return;
  }

  if (!fieldWrapper.classList.contains('is-close')) {
    return;
  }

  const headerAttribute = parentAttribute.querySelector<HTMLElement>('.field_header');

  if (!headerAttribute) {
    return;
  }

  headerAttribute.click();
}

export function getSupportWrapper() {
  const shadowRootEntry = document.querySelector('[data-id="fs-attributes-support"]');

  if (!shadowRootEntry) {
    throw new Error('Unexpected error: Shadow DOM entry not found');
  }

  const shadowRoot = shadowRootEntry.shadowRoot;

  if (!shadowRoot) {
    throw new Error('Unexpected error: Shadow Root not found');
  }

  return shadowRoot;
}

export function scrollInto(selector: string, delay = 0) {
  const shadowRoot = getSupportWrapper();

  setTimeout(() => {
    const scrollElement = shadowRoot.querySelector(selector);

    if (!scrollElement) {
      throw new Error(`Unexpected error: Element with selector "${selector}" not found`);
    }

    scrollElement.scrollIntoView({
      behavior: 'smooth',
    });
  }, delay);
}

export function scrollTo(selector: string, delay = 0) {
  const shadowRoot = getSupportWrapper();

  setTimeout(() => {
    const scrollElement = shadowRoot.querySelector(selector);

    if (!scrollElement) {
      throw new Error('Unexpected error: Selector not found');
    }

    scrollElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, delay);
}
