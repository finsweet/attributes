/**
 * Debounces a function call by a given timeout. Especially helpful for instant search fields where you don't want to trigger a search on every key stroke.
 * @param func The function to debounce (i.e. the function to call after the timeout)
 * @param timeout The timeout in milliseconds
 * @returns A debounced function
 */
export function debounce<T extends (...args: IArguments[]) => void>(func: T, timeout = 300) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
