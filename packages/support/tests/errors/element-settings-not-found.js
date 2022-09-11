import {
  selectAttribute,
  clickRunCheck,
  selectItem,
  selectItemAndInputSetting,
  selectItemAndSelectSetting,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element Setting not found errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-setting-not-found.html`;

test('Element setting - not found in page', async (t) => {
  await selectAttribute('CMS Load');

  await selectItemAndSelectSetting('element-list-animation', 'slide-up');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('element-list-animation', 'attribute-not-found');
  await assertErrorIsOnAttribute('element-list-animation', 'attribute-not-found');

  await writeFileValidationMessage('Option attribute not found', 'element-list-animation');
});
