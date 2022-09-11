import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  selectItemAndInputSetting,
  selectMultipleInstances,
  selectInstance,
  clickToggleSelector,
  clickSettingType,
  typeSettingOption,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Form Submit`.page`http://localhost:3000/packages/support/public/scenarios/form-submit/scenario-1.html`;

test('Form Submit - Boolean settings', async (t) => {
  await selectAttribute('Form Submit Actions');

  await selectItem('element-form');
  await selectItem('element-form-reset');
  await clickToggleSelector('element-form-reset');
  await clickSettingType('element-form-reset', 'boolean');

  await selectItem('element-form-reload');
  await clickToggleSelector('element-form-reload');
  await clickSettingType('element-form-reload', 'boolean');

  await selectItem('element-form-redirect');
  await clickToggleSelector('element-form-redirect');
  await clickSettingType('element-form-redirect', 'boolean');

  await selectItemAndInputSetting('element-form-redirecturl', 'https://finsweet.com');
  await selectItem('element-form-redirectnewtab');
  await selectItem('element-form-disable');
  await selectItem('element-form-enhance');

  await selectItem('element-reset');
  await selectItem('element-ix-trigger');

  await selectItem('setting-preventreset');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('Form Submit - Int settings', async (t) => {
  await selectAttribute('Form Submit Actions');

  await selectMultipleInstances(3);
  await selectInstance(2);

  await selectItem('element-form');
  await selectItem('element-form-reset');
  await clickToggleSelector('element-form-reset');
  await clickSettingType('element-form-reset', 'int');
  await typeSettingOption('element-form-reset', '2000');

  await selectItem('element-form-reload');
  await clickToggleSelector('element-form-reload');
  await clickSettingType('element-form-reload', 'int');
  await typeSettingOption('element-form-reload', '3000');

  await selectItem('element-form-redirect');
  await clickToggleSelector('element-form-redirect');
  await clickSettingType('element-form-redirect', 'int');
  await typeSettingOption('element-form-redirect', '4000');

  await selectItemAndInputSetting('element-form-redirecturl', 'https://finsweet.com/attributes');

  await selectItem('element-reset');
  await selectItem('element-ix-trigger');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
