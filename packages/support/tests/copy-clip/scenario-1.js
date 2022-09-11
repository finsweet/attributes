import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  selectItemAndInputSetting,
  selectMultipleInstances,
  selectInstance,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Copy to clipboard`.page`http://localhost:3000/packages/support/public/scenarios/copy-clip/scenario-1.html`;

test('Copy to clipboard - Default', async (t) => {
  await selectAttribute('Copy to clipboard');

  await selectItemAndInputSetting('element-click-text', 'copy-me');
  await selectItemAndInputSetting('element-click-message', 'Copied successful!');
  await selectItemAndInputSetting('element-click-active', 'my-active-class');
  await selectItemAndInputSetting('element-click-duration', '500');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('Copy to clipboard - Copy sibling', async (t) => {
  await selectAttribute('Copy to clipboard');

  await selectMultipleInstances(2);
  await selectInstance(2);

  await selectItem('element-copy-sibling');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
