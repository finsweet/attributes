import { isString } from '@finsweet/ts-utils';

/**
 * Submits the form data to a custom URL using the defined action and method in the form.
 * @param form
 * @param action
 * @param method
 * @returns A boolean promise.
 */
export const enhancedSubmit = async (form: HTMLFormElement, action: string, method: string) => {
  const formData = new FormData(form);
  const url = new URL(action);

  if (method === 'get') {
    for (const [key, value] of formData) {
      if (!isString(value)) continue;

      url.searchParams.append(key, value);
    }
  }

  const body = method === 'post' ? formData : undefined;

  try {
    const response = await fetch(url.toString(), {
      method,
      body,
    });

    return response.ok;
  } catch (err) {
    return false;
  }
};
