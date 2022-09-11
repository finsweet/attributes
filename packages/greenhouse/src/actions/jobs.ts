import { CMSItem, CMSList } from '@finsweet/attributes-cmscore';
import { importCMSCore } from '@finsweet/attributes-cmscore';
import { isNotEmpty } from '@finsweet/ts-utils';
import { CMS_CSS_CLASSES } from '@finsweet/ts-utils';
import type { Job, JobWithContent } from '@finsweet/ts-utils/dist/types/apis/Greenhouse';

import { SUPPORTED_NESTED_KEYS } from '../utils/constants';
import { populateJob } from '../utils/populate';

export async function createJobList(
  listWrapper: HTMLElement,

  queryParam: string,
  jobs: (Job | JobWithContent)[]
) {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  // Create the list instances
  const listInstance = cmsCore.createCMSListInstance(listWrapper);

  if (!listInstance) {
    return;
  }

  await addJobsToList(listInstance, queryParam, jobs);
}

export function getNestedKey(listInstance: CMSList) {
  const templateItem = [...listInstance.items][0];

  const { element } = templateItem;

  const nestedList = element.querySelector<HTMLDivElement>(`.${CMS_CSS_CLASSES.wrapper}`);

  if (!nestedList) {
    return null;
  }

  const groupByKeys: string[] = [...element.querySelectorAll<HTMLElement>(`[fs-greenhouse-element]`)]
    .map((groupElement) => {
      const elementAttribute = groupElement.getAttribute('fs-greenhouse-element');

      if (!elementAttribute) {
        return null;
      }

      return (
        (groupElement.contains(element) === false &&
          SUPPORTED_NESTED_KEYS.includes(elementAttribute) &&
          elementAttribute) ||
        null
      );
    })
    //.filter((value) => value !== null)
    .filter(isNotEmpty);

  return groupByKeys[0] || null;
}

export async function addJobsToList(listInstance: CMSList, queryParam: string, jobs: (Job | JobWithContent)[]) {
  const groupByKey = getNestedKey(listInstance);

  if (groupByKey) {
    createJobsNestedList(listInstance, jobs, queryParam, groupByKey);
    return;
  }

  createJobsList(listInstance, jobs, queryParam);
}

function createJobsList(listInstance: CMSList, jobs: (Job | JobWithContent)[], queryParam: string) {
  const templateItems = [...listInstance.items];

  const template: CMSItem = templateItems[0];

  if (!template) {
    return;
  }

  const { element } = template;

  const jobElements = jobs.map((job: Job | JobWithContent) => {
    const jobItemElement: HTMLDivElement = element.cloneNode(true) as HTMLDivElement;

    return populateJob(job, jobItemElement, queryParam) as HTMLDivElement;
  });

  listInstance.clearItems(true);
  listInstance.addItems(jobElements);
}

export function createJobsNestedList(
  listInstance: CMSList,
  jobs: (Job | JobWithContent)[],
  queryParam: string,
  groupBy: string
) {
  const mainItems = [...listInstance.items];

  const mainTemplate: CMSItem = mainItems[0];

  const jobsGroups: string[] = getGroupByKeys(jobs, groupBy);

  const groupBySections: HTMLDivElement[] = jobsGroups.map((jobGroup) => {
    const mainItem: HTMLDivElement = mainTemplate.element.cloneNode(true) as HTMLDivElement;

    const groupByLabel = mainItem.querySelector<HTMLElement>(`[fs-greenhouse-element="${groupBy}"]`);

    if (groupByLabel) {
      groupByLabel.textContent = jobGroup;
    }

    const jobsWrapper = mainItem.querySelector<HTMLDivElement>('.w-dyn-list');

    if (!jobsWrapper) {
      return mainItem;
    }

    const jobsList = new CMSList(jobsWrapper, 0);

    const jobsTemplateItems = [...jobsList.items];

    const jobTemplate = jobsTemplateItems[0];
    const jobsFromGroup = filterJobs(jobs, groupBy, jobGroup);

    const jobElements = jobsFromGroup.map((job: Job | JobWithContent) => {
      const jobItemElement: HTMLDivElement = jobTemplate.element.cloneNode(true) as HTMLDivElement;

      return populateJob(job, jobItemElement, queryParam) as HTMLDivElement;
    });

    for (const templateItem of jobsTemplateItems) {
      templateItem.element.remove();
    }
    jobsList.addItems(jobElements);

    return mainItem;
  });

  listInstance.clearItems(true);

  listInstance?.addItems(groupBySections);
}

export function appendJobsNestedList(
  listInstance: CMSList,
  jobs: (Job | JobWithContent)[],
  queryParam: string,
  groupBy: string
) {
  const mainItems = [...listInstance.items];

  const mainTemplate: CMSItem = mainItems[0];

  const jobsGroups: string[] = getGroupByKeys(jobs, groupBy);

  jobsGroups.forEach((jobGroup) => {
    const mainItem: HTMLDivElement = mainTemplate.element.cloneNode(true) as HTMLDivElement;

    const groupByLabel = mainItem.querySelector<HTMLElement>(`[fs-greenhouse-element="${groupBy}"]`);

    if (groupByLabel) {
      groupByLabel.textContent = jobGroup;
    }

    const jobsWrapper = mainItem.querySelector<HTMLDivElement>('.w-dyn-list');

    if (!jobsWrapper) {
      return;
    }

    const jobsList = new CMSList(jobsWrapper, 0);

    const jobsTemplateItems = [...jobsList.items];

    jobsWrapper.innerHTML = '';

    const jobTemplate = jobsTemplateItems[0];
    const jobsFromGroup = filterJobs(jobs, groupBy, jobGroup);

    jobsFromGroup.forEach((job: Job | JobWithContent) => {
      const jobItemElement: HTMLDivElement = jobTemplate.element.cloneNode(true) as HTMLDivElement;

      const jobElement = populateJob(job, jobItemElement, queryParam) as HTMLDivElement;
      jobsList.wrapper.append(jobElement);
    });

    listInstance.wrapper.append(mainItem);
  });
}

function filterJobs(jobs: (Job | JobWithContent)[], groupBy: string, value: string) {
  if (groupBy === 'department') {
    return jobs.filter((job) => {
      if (!job.hasOwnProperty('departments')) {
        return false;
      }
      const jobWithContents = job as JobWithContent;

      const { departments } = jobWithContents;

      return departments.map((deparment) => deparment.name).includes(value);
    });
  }

  if (groupBy === 'office') {
    return jobs.filter((job) => {
      if (!job.hasOwnProperty('offices')) {
        return false;
      }
      const jobWithContents = job as JobWithContent;

      const { offices } = jobWithContents;

      return offices.map((office) => office.name).includes(value);
    });
  }

  return [];
}

function getGroupByKeys(jobs: (Job | JobWithContent)[], groupBy: string) {
  if (groupBy === 'department') {
    return [
      ...new Set(
        jobs
          .map((job) => (job.hasOwnProperty('departments') && (job as JobWithContent).departments) || '')
          .filter((departments) => departments !== '')
          .map((departments) => (departments && departments[0] && departments[0].name) || null)
          .filter(isNotEmpty)
      ),
    ];
  }

  if (groupBy === 'office') {
    return [
      ...new Set(
        jobs
          .map((job) => (job.hasOwnProperty('offices') && (job as JobWithContent).offices) || '')
          .filter((offices) => offices !== '')
          .map((offices) => (offices && offices[0] && offices[0].name) || null)
          .filter(isNotEmpty)
      ),
    ];
  }

  return [];
}
