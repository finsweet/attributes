import {
  selectAttribute,
  clickRunCheck,
  selectItem,
  clickToggleSelector,
  selectSettingOption,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element Setting Condition Exists`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-setting-condition-exists.html`;

test('Element setting - not found required exists condition', async (t) => {
  await selectAttribute('Mirror click events');

  await selectItem('element-trigger-delay');

  await clickRunCheck();

  await assertErrorsCountOnReport(2);

  await assertErrorIsOnReport('element-trigger-delay', 'conditions-exists');
  await assertErrorIsOnAttribute('element-trigger-delay', 'conditions-exists');

  await writeFileValidationMessage('Option attribute setup requirements not met', 'element-trigger-delay');
});
