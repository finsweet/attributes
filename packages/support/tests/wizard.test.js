import {
  selectAttribute,
  selectMultipleInstances,
  clickSetInstance,
  clickSchemaElement,
  clickSchemaSetting,
  clickSubmitActionValidation,
  typeSettingOption,
  clickHowManyInstances,
  clickSwitch,
  clickMoreInstances,
  selectSettingOption,
  typeInstances,
  selectInstance,
} from './helpers/actions';
import {
  assertExpectedValidationError,
  assertIsEnabledSettingCondition,
  assertIsDisabledSettingCondition,
  assertExpectedValidationSuccess,
  assertAttributeSelected,
  assertInstancesCount,
} from './helpers/assertions';

fixture`CMS Load - Scenario 1`.page`http://localhost:3000/packages/support/public/scenarios/cms-load/scenario-1.html`;

test('CMS Load - Validate Elements and Settings in mode=load-under, instance #2', async (t) => {
  await selectAttribute('CMS Load');

  await assertAttributeSelected('CMS Load');

  await selectMultipleInstances(3);

  await assertInstancesCount(3);

  await selectInstance(2);
});
