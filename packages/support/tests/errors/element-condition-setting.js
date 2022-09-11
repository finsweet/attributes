import {
  selectAttribute,
  clickRunCheck,
  selectItem,
  selectSettingOption,
  clickToggleSelector,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element Conditions Settings Errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-condition-setting.html`;

test('Element setting not match required element setting', async (t) => {
  await selectAttribute('CMS Load');

  await selectItem('element-list-mode');
  await clickToggleSelector('element-list-mode');

  await selectSettingOption('element-list-mode', 'pagination');

  await selectItem('element-page-button');

  await clickRunCheck();

  await assertErrorsCountOnReport(2);
  await assertErrorIsOnReport('element-page-button', 'conditions-settings');
  await assertErrorIsOnAttribute('element-page-button', 'conditions-settings');

  await writeFileValidationMessage('Element attribute missing a required option attribute', 'element-page-button');
});
