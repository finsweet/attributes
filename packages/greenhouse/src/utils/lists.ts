import { getCMSElementSelector, isNotEmpty } from '@finsweet/attributes-utils';

import type { JobWithContent } from '../types';
import { filterJobsByKey, getDepartmentsOrOfficesFromJobs } from '../utils/jobs';
import { populateJob } from '../utils/populate';
import { getSettingSelector } from './selectors';

// @ts-expect-error TODO: Support fs-list
export function addJobsToCMSItems(listInstance: CMSList, jobs: JobWithContent[], queryParam: string) {
  const element = getListTemplate(listInstance);

  if (!element) return;

  const cmsItems = populateJobs(jobs, queryParam, element);

  listInstance.clearItems(true);
  listInstance.addItems(cmsItems);
}

export function addNestedJobsToCMSItems(
  // @ts-expect-error TODO: Support fs-list
  listInstance: CMSList,
  jobs: JobWithContent[],
  queryParam: string,
  groupBy: string
) {
  const templateElement = getListTemplate(listInstance);

  if (!templateElement) return;

  const jobsGroups: string[] = getDepartmentsOrOfficesFromJobs(jobs, groupBy);

  const groupBySections: (HTMLDivElement | undefined)[] = jobsGroups.map((jobGroup) => {
    const mainItem: HTMLDivElement = templateElement.cloneNode(true) as HTMLDivElement;

    setMainGroup(mainItem, groupBy, jobGroup);

    const jobsWrapper = mainItem.querySelector<HTMLDivElement>(getCMSElementSelector('wrapper'));

    if (!jobsWrapper) {
      return mainItem;
    }

    // @ts-expect-error TODO: Support fs-list
    const jobsList = new CMSList(jobsWrapper, 0);
    const innerTemplate = getListTemplate(jobsList);
    if (!innerTemplate) return;

    const jobsFromGroup = filterJobsByKey(jobs, groupBy, jobGroup);

    const cmsItems = populateJobs(jobsFromGroup, queryParam, innerTemplate);

    jobsList.clearItems(true);
    jobsList.addItems(cmsItems);

    return mainItem;
  });

  listInstance.clearItems(true);

  listInstance?.addItems(groupBySections.filter(isNotEmpty));
}

export function appendNestedJobsToCMSItems(
  // @ts-expect-error TODO: Support fs-list
  listInstance: CMSList,
  jobs: JobWithContent[],
  queryParam: string,
  groupBy: string
) {
  const templateElement = getListTemplate(listInstance);

  if (!templateElement) return;

  const jobsGroups: string[] = getDepartmentsOrOfficesFromJobs(jobs, groupBy);

  jobsGroups.forEach((jobGroup) => {
    const mainItem: HTMLDivElement = templateElement.cloneNode(true) as HTMLDivElement;

    setMainGroup(mainItem, groupBy, jobGroup);

    const jobsWrapper = mainItem.querySelector<HTMLDivElement>(getCMSElementSelector('wrapper'));

    if (!jobsWrapper) {
      return;
    }

    // @ts-expect-error TODO: Support fs-list
    const jobsList = new CMSList(jobsWrapper, 0);

    const innerTemplate = getListTemplate(jobsList);
    if (!innerTemplate) return;

    jobsWrapper.innerHTML = '';

    const jobsFromGroup = filterJobsByKey(jobs, groupBy, jobGroup);

    const cmsItems = populateJobs(jobsFromGroup, queryParam, innerTemplate);

    cmsItems.forEach((cmsItem) => {
      jobsList.wrapper.append(cmsItem);
    });

    listInstance.wrapper.append(mainItem);
  });
}

function setMainGroup(mainItem: HTMLDivElement, attributeGroup: string, valueGroup: string) {
  const groupByLabel = mainItem.querySelector<HTMLElement>(getSettingSelector('element', undefined, attributeGroup));

  if (groupByLabel) {
    groupByLabel.textContent = valueGroup;
  }
}

// @ts-expect-error TODO: Support fs-list
function getListTemplate(listInstance: CMSList) {
  const templateItems = [...listInstance.items];

  // @ts-expect-error TODO: Support fs-list
  const template: CMSItem = templateItems[0];

  if (!template) {
    return;
  }

  const { element } = template;
  return element;
}

function populateJobs(jobs: JobWithContent[], queryParam: string, template: HTMLDivElement) {
  const jobElements = jobs.map((job: JobWithContent) => {
    const jobItemElement: HTMLDivElement = template.cloneNode(true) as HTMLDivElement;

    return populateJob(job, jobItemElement, queryParam) as HTMLDivElement;
  });
  return jobElements;
}
