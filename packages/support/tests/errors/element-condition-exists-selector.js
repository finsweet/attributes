import {
  selectAttribute,
  clickRunCheck,
  selectItem,
  selectSettingOption,
  clickToggleSelector,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element Conditions Exists Errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-condition-exists-selector.html`;

test('Element condition not found in page', async (t) => {
  await selectAttribute('CMS Load');

  await selectItem('element-loader');

  await clickRunCheck();

  await assertErrorsCountOnReport(2);
  await assertErrorIsOnReport('element-loader', 'conditions-exists');
  await assertErrorIsOnAttribute('element-loader', 'conditions-exists');

  await writeFileValidationMessage(
    'New - Element attribute setup requirements not met - webflow component',
    'element-loader'
  );
});
