import {
  selectAttribute,
  clickRunCheck,
  selectItem,
  selectSettingOption,
  clickToggleSelector,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element Conditions Sibling Errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-condition-sibling.html`;

test('Element not sibling of', async (t) => {
  await selectAttribute('Copy to clipboard');

  await selectItem('element-click');
  await selectItem('element-copy-sibling');
  await clickRunCheck();

  await assertErrorsCountOnReport(1);
  await assertErrorIsOnReport('element-copy-sibling', 'conditions-isSiblingOf');
  await assertErrorIsOnAttribute('element-copy-sibling', 'conditions-isSiblingOf');

  await writeFileValidationMessage('Element attribute incorrect location - Not a sibling', 'element-copy-sibling');
});
