import {
  selectAttribute,
  clickRunCheck,
  selectItem,
  clickToggleSelector,
  selectSettingOption,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element Setting Condition Setting`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-setting-condition-setting.html`;

test('Element setting - not found required setting condition', async (t) => {
  await selectAttribute('CMS Load');

  await selectItem('element-list-mode');
  await clickToggleSelector('element-list-mode');

  await selectSettingOption('element-list-mode', 'infinite');

  await selectItem('element-list-threshold');

  await clickRunCheck();

  await assertErrorsCountOnReport(2);

  await assertErrorIsOnReport('element-list-threshold', 'conditions-settings');
  await assertErrorIsOnAttribute('element-list-threshold', 'conditions-settings');

  await writeFileValidationMessage('Option attribute missing a required option attribute', 'element-list-threshold');
});
