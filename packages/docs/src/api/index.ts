import { queryElement as queryTOCElement } from '@finsweet/attributes-toc/src/utils/constants';
import { CODE_HIGHLIGHT_ATTRIBUTE, TOC_ATTRIBUTE } from '@global/constants/attributes';
import { marked } from 'marked';

import { attributesData } from '../../api/attributes';
import { getAttributeReadme } from './fetch';

declare global {
  interface Window {
    attributeKey?: string;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const { attributeKey } = window;
  if (!attributeKey) return;

  const attributeData = attributesData.find(({ key }) => key === attributeKey);
  if (!attributeData) return;

  const contentsElement = queryTOCElement('contents');
  if (!contentsElement) return;

  const markdown = await getAttributeReadme(attributeData);
  if (!markdown) return;

  contentsElement.innerHTML = marked.parse(markdown);

  window.fsAttributes[CODE_HIGHLIGHT_ATTRIBUTE].init?.();
  window.fsAttributes[TOC_ATTRIBUTE]?.init?.();
});
