import type { Job, JobWithContent } from '@finsweet/ts-utils/dist/types/apis/Greenhouse';

import { ATTRIBUTES, queryElement } from '../utils/constants';

export function populateJob(job: Job | JobWithContent, scope: HTMLDivElement | undefined, queryParam: string | null) {
  // link

  if (queryParam) {
    const linkElements = queryElement<HTMLLinkElement>(ATTRIBUTES.element.values.link, { scope, all: true });

    for (const linkElement of linkElements) {
      linkElement.href = `${linkElement.href}?${queryParam}=${job.id}`;
    }
  }

  // title
  const titleElements = queryElement(ATTRIBUTES.element.values.title, { scope, all: true });

  for (const titleElement of titleElements) {
    titleElement.textContent = job.title;
  }

  // office and department
  if (job.hasOwnProperty('office') || job.hasOwnProperty('departments') || job.hasOwnProperty('content')) {
    const { offices, departments, content } = job as JobWithContent;

    if (offices[0] && offices[0].name) {
      const officeElements = queryElement(ATTRIBUTES.element.values.office, { scope, all: true });

      officeElements.forEach((office) => {
        office.textContent = offices[0].name || '';
      });
    }

    if (departments[0] && departments[0].name) {
      const departmentElements = queryElement(ATTRIBUTES.element.values.department, { scope, all: true });

      departmentElements.forEach((department) => {
        department.textContent = departments[0].name || '';
      });
    }

    const descriptionElements = queryElement<HTMLElement>(ATTRIBUTES.element.values.description, { scope, all: true });

    descriptionElements.forEach((description) => {
      const unescapedHtml = unescapeHTML(content);
      const descriptionText = unescapedHtml.replace(/class="[-a-zA-Z ]*?"/g, '').replace('<div >', '<div>');
      description.innerHTML = descriptionText;
    });
  }

  const applyElements = queryElement<HTMLLinkElement>(ATTRIBUTES.element.values.apply, { scope, all: true });

  for (const applyElement of applyElements) {
    applyElement.href = job.absolute_url;
  }

  return scope;
}

export const unescapeHTML = (rawHTML: string): string => {
  return rawHTML
    .replace(/(&nbsp;)/g, ' ')
    .replace(/(&lt;)/g, '<')
    .replace(/(&gt;)/g, '>')
    .replace(/(&amp;)/g, '&')
    .replace(/(&quot;)/g, '"')
    .replace(/(&#96;)/g, '`')
    .replace(/(&#x27;)/g, "'")
    .replace(/(<br>)/g, '\n');
};
