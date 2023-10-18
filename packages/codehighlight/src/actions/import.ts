import { HIGHLIGHTJS_THEME_URL } from '../utils/constants';
import { WEBFLOW_THEME } from '../utils/themes';

type StyleTag = HTMLStyleElement | HTMLLinkElement;

let hljsThemeImport: Promise<StyleTag> | undefined;

/**
 * Dynamically imports a highlightJS theme.
 * @param theme The theme name.
 * @returns A callback to remove the currently imported theme.
 */
export const importHighlightJSTheme = async (theme?: string): Promise<(() => void) | undefined> => {
  if (!theme) return;

  if (hljsThemeImport) {
    const tag = await hljsThemeImport;

    return () => {
      tag.remove();
      hljsThemeImport = undefined;
    };
  }

  let tag!: StyleTag;

  if (theme === 'webflow') {
    tag = document.createElement('style');
    tag.setAttribute('type', 'text/css');
    tag.innerHTML = WEBFLOW_THEME;
  } else {
    const themeURL = HIGHLIGHTJS_THEME_URL(theme);
    tag = document.createElement('link');
    tag.setAttribute('rel', 'stylesheet');
    tag.setAttribute('href', themeURL);
  }

  hljsThemeImport = new Promise<StyleTag>((resolve) => {
    tag.onload = () => resolve(tag);
  });

  document.head.append(tag);

  await hljsThemeImport;

  return () => {
    tag.remove();
    hljsThemeImport = undefined;
  };
};
