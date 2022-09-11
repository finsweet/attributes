import {
  selectAttribute,
  clickRunCheck,
  selectItem,
  selectSettingOption,
  clickToggleSelector,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element Conditions ChildOf Errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-condition-child-of.html`;

test('Element not child of selector', async (t) => {
  await selectAttribute('CMS Load');

  await selectItem('element-list-mode');
  await clickToggleSelector('element-list-mode');

  await selectSettingOption('element-list-mode', 'pagination');

  await selectItem('element-page-button');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);
  await assertErrorIsOnReport('element-page-button', 'conditions-isChildOf');
  await assertErrorIsOnAttribute('element-page-button', 'conditions-isChildOf');

  await writeFileValidationMessage('Element attribute incorrect location - Not a child', 'element-page-button');
});
