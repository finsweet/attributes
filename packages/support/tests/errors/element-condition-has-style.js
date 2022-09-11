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
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-condition-has-styles.html`;

test('Element that required link failed due to miss link on page', async (t) => {
  await selectAttribute('Range Slider');

  await clickRunCheck();

  await assertErrorsCountOnReport(2);
  await assertErrorIsOnReport('element-track', 'conditions-hasStyles');
  await assertErrorIsOnAttribute('element-track', 'conditions-hasStyles');
  await assertErrorIsOnReport('element-handle', 'conditions-hasStyles');
  await assertErrorIsOnAttribute('element-handle', 'conditions-hasStyles');

  await writeFileValidationMessage('Element attribute styles incorrect - position: relative', 'element-track');
  await writeFileValidationMessage('Element attribute styles incorrect - position: absolute', 'element-handle');
});
