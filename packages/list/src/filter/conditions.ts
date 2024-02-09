import { cloneNode } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { queryAllElements, queryElement } from '../utils/selectors';
import type { FilterData } from './types';
import { type FilterOperator } from './types';

function cloneConditionTemplate() {
  const condition = queryElement('condition');
  if (!condition) return;
  const conditionTemplate = cloneNode(condition);

  const conditionClearLink = queryElement('condition-clear', { scope: conditionTemplate });
  conditionClearLink?.addEventListener('click', () => {
    conditionTemplate.remove();
  });
  return conditionTemplate;
}

function cloneConditionGroupTemplate() {
  const conditionGroup = queryElement('condition-group');
  if (!conditionGroup) return;
  const conditionTemplate = cloneNode(conditionGroup);

  const conditionClearLink = queryElement('condition-clear', { scope: conditionTemplate });
  conditionClearLink?.addEventListener('click', () => {
    conditionTemplate.remove();
  });
  return conditionTemplate;
}

function addCondition() {
  const newCondition = cloneConditionTemplate();
  if (!newCondition) return;
  const conditionGroup = queryElement('condition-group');
  const conditions = queryAllElements('condition');
  if (conditions.length > 0) {
    conditionGroup?.insertBefore(newCondition, conditions[conditions.length - 1].nextSibling);
  } else {
    conditionGroup?.appendChild(newCondition);
  }
}

function addConditionGroup() {
  const newCondition = cloneConditionGroupTemplate();
  if (!newCondition) return;
  const conditionGroup = queryElement('condition-group');
  const parent = conditionGroup?.parentElement;
  parent?.insertBefore(newCondition, conditionGroup);
}

export const initCondition = () => {
  const conditionAdd = queryElement('condition-add');
  const conditionGroupAdd = queryElement('condition-group-add');

  conditionAdd?.addEventListener('click', function (event) {
    event.preventDefault();
    addCondition();
  });

  conditionGroupAdd?.addEventListener('click', function (event) {
    event.preventDefault();
    addConditionGroup();
  });
};

export const filterConditions = (element: HTMLElement, list: List) => {
  const conditionGroup = queryElement('condition-group');
  if (!conditionGroup) return;
  const closestCondition = element.closest('[fs-list-element="condition"]');
  if (!closestCondition) return;

  const value = queryElement<HTMLInputElement>('condition-value', { scope: closestCondition })?.value;
  const op = queryElement<HTMLInputElement>('condition-operator', { scope: closestCondition })
    ?.value as FilterOperator | null;
  const key = queryElement<HTMLInputElement>('condition-field', { scope: closestCondition })?.value;

  if (value && op && key) {
    const filterData: FilterData = {
      type: 'text',
      value,
      op,
    };
    list.filters.setKey(key, filterData);
  }
};
