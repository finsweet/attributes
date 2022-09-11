import { selectAttribute, clickRunCheck, selectItemAndSelectSetting } from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element Setting applied to errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-setting-applied-to-element.html`;

test('Element setting - found but not applied to right element', async (t) => {
  await selectAttribute('CMS Load');

  await selectItemAndSelectSetting('element-list-animation', 'slide-up');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('element-list-animation', 'applied-to');
  await assertErrorIsOnAttribute('element-list-animation', 'applied-to');

  await writeFileValidationMessage('Option attribute added to wrong element', 'element-list-animation');
});
