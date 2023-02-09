import type { AttributeExamples } from '$global/types/examples';

import attributesData from '../../api/attributes';
import { ATTRIBUTES } from '../utils/constants';
import { initCollapseOptions } from './collapse-options';
import { initCopyExampleButtons } from './copy-examples';
import { initCopyButtons } from './copy-script';
import { initCodeHighlight } from './highlight';
import { initTitles } from './titles';

/**
 * Init
 */
window.Webflow ||= [];
window.Webflow.push(async () => {
  const currentAttributeKey = document.body.getAttribute(ATTRIBUTES.attribute.key);
  if (!currentAttributeKey) return;

  const attributeData = attributesData.find(({ key }) => key === currentAttributeKey);
  if (!attributeData) return;

  initTitles();
  initCollapseOptions();

  const { baseSrc, examplesSrc, title, loadMode, scriptSrc } = attributeData;

  const copyCode = `<!-- [Attributes by Finsweet] ${title} -->\n<script ${loadMode} src=\"${baseSrc}/${scriptSrc}\"></script>`;

  initCodeHighlight(copyCode);
  initCopyButtons(copyCode);

  try {
    const response = await fetch(`${baseSrc}/${examplesSrc}`);

    const examples: AttributeExamples = await response.json();

    initCopyExampleButtons(examples);
  } catch (error) {
    return;
  }
});
