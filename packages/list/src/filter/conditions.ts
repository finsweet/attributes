import { cloneNode } from '@finsweet/attributes-utils';

import { queryAllElements, queryElement } from '../utils/selectors';

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

export const initCondition = () => {
  const conditionAdd = queryElement('condition-add');

  conditionAdd?.addEventListener('click', function (event) {
    event.preventDefault();
    addCondition();
  });
};
