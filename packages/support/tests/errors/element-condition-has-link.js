import {
  selectAttribute,
  clickRunCheck,
  selectItem,
  selectSettingOption,
  clickToggleSelector,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element Conditions Has Link Errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-condition-has-link.html`;

test('Element that required link failed due to miss link on page', async (t) => {
  await selectAttribute('CMS PrevNext');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);
  await assertErrorIsOnReport('element-list', 'conditions-hasLink');
  await assertErrorIsOnAttribute('element-list', 'conditions-hasLink');

  await writeFileValidationMessage('Link reference not found', 'element-list');
});
