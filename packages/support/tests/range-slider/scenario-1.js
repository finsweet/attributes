import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  selectItemAndInputSetting,
  selectItemAndSelectSetting,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Range Slider`.page`http://localhost:3000/packages/support/public/scenarios/range-slider/scenario-1.html`;

test('Range Slider - Default', async (t) => {
  await selectAttribute('Range Slider');

  await selectItemAndInputSetting('element-wrapper-min', '0');
  await selectItemAndInputSetting('element-wrapper-max', '1000');
  await selectItemAndInputSetting('element-wrapper-step', '20');
  await selectItem('element-wrapper-formatdisplay');
  await selectItemAndSelectSetting('element-wrapper-update', 'release');

  await selectItemAndInputSetting('element-handle-start', '500');

  await selectItem('element-display-value');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
