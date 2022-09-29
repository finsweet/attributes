import { CMS_CSS_CLASSES, isNotEmpty } from '@finsweet/ts-utils';
import type { JobWithContent } from '@finsweet/ts-utils/dist/types/apis/Greenhouse';

import { CMSItem, CMSList } from '$packages/cmscore';

import { ATTRIBUTES } from '../utils/constants';
import { filterJobsByKey, getDepartmentsOrOfficesFromJobs } from '../utils/jobs';
import { populateJob } from '../utils/populate';

export function addJobsToCMSItems(listInstance: CMSList, jobs: JobWithContent[], queryParam: string) {
  const element = getListTemplate(listInstance);

  if (!element) return;

  const cmsItems = populateJobs(jobs, queryParam, element);

  listInstance.clearItems(true);
  listInstance.addItems(cmsItems);
}

export function addNestedJobsToCMSItems(
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

    const jobsWrapper = mainItem.querySelector<HTMLDivElement>(`.${CMS_CSS_CLASSES.wrapper}`);

    if (!jobsWrapper) {
      return mainItem;
    }

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

    const jobsWrapper = mainItem.querySelector<HTMLDivElement>(`.${CMS_CSS_CLASSES.wrapper}`);

    if (!jobsWrapper) {
      return;
    }

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
  const groupByLabel = mainItem.querySelector<HTMLElement>(`[${ATTRIBUTES.element.key}="${attributeGroup}"]`);

  if (groupByLabel) {
    groupByLabel.textContent = valueGroup;
  }
}

function getListTemplate(listInstance: CMSList) {
  const templateItems = [...listInstance.items];

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
