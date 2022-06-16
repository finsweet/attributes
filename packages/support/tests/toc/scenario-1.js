import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  typeFieldIdentifier,
  selectItemAndInputSetting,
  selectMultipleInstances,
  selectFieldSpecialization,
  selectInstance,
  selectItemAndSelectSetting,
} from './../helpers/actions';
import {
  assertErrorsCountOnReport,
} from './../helpers/assertions';


fixture`Table of contents`
    .page`http://localhost:9000/scenarios/toc/scenario-1.html`;

test('Table of contents - Default', async t => {
  await selectAttribute('Table of Contents');


  await selectItemAndInputSetting('element-setting-offsettop', '100');
  await selectItemAndInputSetting('element-setting-offsetbottom', '150');
  await selectItem('element-setting-hideurlhash');
  await selectItem('element-table');
  await selectItem('element-ix-trigger');


  //await selectItemAndInputSetting('element-setting-wait', '200');


  await clickRunCheck();

  await assertErrorsCountOnReport(0);
});
