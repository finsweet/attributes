import { toRaw } from '@vue/reactivity';

import type { ListItem } from '../components/ListItem';
// @ts-expect-error - FilterWorker is not recognized by TypeScript
import FilterWorker from './filter.worker.js';
import type { Filters, FilterTask, FilterTaskData, FilterTaskResult } from './types';

const WORKER_POOL_SIZE = navigator.hardwareConcurrency || 4;

const workers: Worker[] = new Array(WORKER_POOL_SIZE).fill(null).map(() => new FilterWorker());
const freeWorkers = workers.slice();
const taskQueue: FilterTask[] = [];

/**
 * Processes a filter task using a worker.
 * Once finished, it will process the next task in the queue.
 * @param worker
 * @param task
 */
const processFilterTask = (worker: FilterWorker, task: FilterTask) => {
  const controller = new AbortController();
  const { signal } = controller;

  const conclude = () => {
    controller.abort();

    const nextTask = taskQueue.shift();
    if (nextTask) {
      processFilterTask(worker, nextTask);
    } else {
      freeWorkers.push(worker);
    }
  };

  worker.addEventListener(
    'message',
    (event: MessageEvent<FilterTaskResult>) => {
      task.resolve(event.data);
      conclude();
    },
    { signal, once: true }
  );

  worker.addEventListener(
    'error',
    (error: string | Event) => {
      task.reject(error);
      conclude();
    },
    { signal, once: true }
  );

  worker.postMessage(task.data);
};

/**
 * Queues a filter task to be processed.
 * @param task
 */
const queueFilterTask = (task: FilterTask) => {
  const worker = freeWorkers.pop();
  if (worker) {
    processFilterTask(worker, task);
  } else {
    taskQueue.push(task);
  }
};

/**
 * Runs a filter task.
 * @param data
 * @returns A promise that resolves with the filtered items.
 */
const runFilterTask = (data: FilterTaskData) => {
  return new Promise<FilterTaskResult>((resolve, reject) => {
    queueFilterTask({ data, resolve, reject });
  });
};

/**
 * Filters the provided items based on the provided filters.
 * @param filters
 * @param items
 * @returns The filtered items.
 */
export const filterItems = async (filters: Filters, items: ListItem[]) => {
  const itemsMap = new Map<string, ListItem>();
  const itemsData = items.map((item) => {
    itemsMap.set(item.id, item);

    const { id, fields } = item;
    return { id, fields };
  });

  const filteredItems = await runFilterTask({ items: itemsData, filters: toRaw(filters) });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const result = filteredItems.map(({ id }) => itemsMap.get(id)!);
  return result;
};
