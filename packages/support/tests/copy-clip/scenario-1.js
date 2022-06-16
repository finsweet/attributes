import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  selectItemAndInputSetting,
  selectMultipleInstances,
  selectInstance,
} from './../helpers/actions';
import {
  assertErrorsCountOnReport,
} from './../helpers/assertions';


fixture`Copy to clipboard`
    .page`http://localhost:9000/scenarios/copy-clip/scenario-1.html`;

test('Copy to clipboard - Default', async t => {
  await selectAttribute('Copy to clipboard');

  await selectItemAndInputSetting('element-setting-text', 'copy-me');
  await selectItemAndInputSetting('element-setting-message', 'Copied successful!');
  await selectItemAndInputSetting('element-setting-active', 'my-active-class')
  await selectItemAndInputSetting('element-setting-duration', '500');

  await clickRunCheck();

  await assertErrorsCountOnReport(0);
});


test('Copy to clipboard - Copy sibling', async t => {
  await selectAttribute('Copy to clipboard');

  await selectMultipleInstances(2);
  await selectInstance(2);

  await selectItem('element-copy-sibling')

  await clickRunCheck();

  await assertErrorsCountOnReport(0);
});
