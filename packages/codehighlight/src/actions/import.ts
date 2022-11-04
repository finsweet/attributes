import { HIGHLIGHTJS_CUSTOM_THEMES, HIGHLIGHTJS_SCRIPT_URL, HIGHLIGHTJS_THEME_URL } from '../utils/constants';

let hljsImport: Promise<HTMLScriptElement> | undefined;
let hljsThemeImport: Promise<HTMLLinkElement> | undefined;

/**
 * Dynamically imports highlightJS.
 * @returns An awaitable {@link Promise}.
 */
export const importHighlightJS = async () => {
  if (hljsImport) return hljsImport;

  const script = document.createElement('script');
  script.setAttribute('src', HIGHLIGHTJS_SCRIPT_URL);

  hljsImport = new Promise<HTMLScriptElement>((resolve) => {
    script.onload = () => resolve(script);
  });

  document.head.append(script);

  return hljsImport;
};

/**
 * Dynamically imports a highlightJS theme.
 * @param theme The theme name.
 * @returns A callback to remove the currently imported theme.
 */
export const importHighlightJSTheme = async (theme: string | null): Promise<(() => void) | undefined> => {
  if (!theme) return;

  if (hljsThemeImport) {
    const link = await hljsThemeImport;

    return () => {
      link.remove();
      hljsThemeImport = undefined;
    };
  }

  const themeURL = HIGHLIGHTJS_CUSTOM_THEMES[theme] || HIGHLIGHTJS_THEME_URL(theme);

  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', themeURL);

  hljsThemeImport = new Promise<HTMLLinkElement>((resolve) => {
    link.onload = () => resolve(link);
  });

  document.head.append(link);

  await hljsThemeImport;

  return () => {
    link.remove();
    hljsThemeImport = undefined;
  };
};
