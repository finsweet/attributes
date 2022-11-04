import type { Job, JobWithContent } from '@finsweet/ts-utils/dist/types/apis/Greenhouse';

import { unescapeHTML } from '$global/helpers';

import { ATTRIBUTES, queryElement } from '../utils/constants';

export function populateJob(job: Job | JobWithContent, scope: HTMLDivElement | undefined, queryParam: string | null) {
  // link
  if (queryParam) {
    const linkElements = queryElement<HTMLLinkElement>(ATTRIBUTES.element.values.link, { scope, all: true });

    for (const linkElement of linkElements) {
      const url = new URL(linkElement.href);
      url.searchParams.set(queryParam, job.id.toString());
      linkElement.href = url.toString();
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

    // offices
    if (offices[0] && offices[0].name) {
      const officeElements = queryElement(ATTRIBUTES.element.values.office, { scope, all: true });

      officeElements.forEach((office) => {
        office.textContent = offices[0].name || '';
      });
    }

    // departments
    if (departments[0] && departments[0].name) {
      const departmentElements = queryElement(ATTRIBUTES.element.values.department, { scope, all: true });

      departmentElements.forEach((department) => {
        department.textContent = departments[0].name || '';
      });
    }

    // description
    const descriptionElements = queryElement<HTMLElement>(ATTRIBUTES.element.values.description, { scope, all: true });

    descriptionElements.forEach((description) => {
      const unescapedHtml = unescapeHTML(content);
      const descriptionText = unescapedHtml.replace(/class="[-a-zA-Z ]*?"/g, '').replace('<div >', '<div>');
      description.innerHTML = descriptionText;
    });
  }

  // apply elements
  const applyElements = queryElement<HTMLLinkElement>(ATTRIBUTES.element.values.apply, { scope, all: true });

  for (const applyElement of applyElements) {
    applyElement.href = job.absolute_url;
  }

  return scope;
}
