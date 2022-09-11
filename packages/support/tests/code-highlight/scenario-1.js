import { selectAttribute, clickRunCheck, selectItemAndInputSetting } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Code Highlight`.page`http://localhost:3000/packages/support/public/scenarios/code-highlight/scenario-1.html`;

test('Code Highlight - Default', async (t) => {
  await selectAttribute('Code Highlight');

  await selectItemAndInputSetting('element-code-theme', 'custom-theme');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
