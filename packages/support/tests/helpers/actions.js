import { t } from 'testcafe';
import {
  attributesDisplay,
  attributesOptions,
  instancesInput,
  toggleInstances,
  instanceButtons,
  runCheckBtn,
  resetBtn,
  getItemCheckbox,
  getItemToggle,
  getItemSelect,
  getItemSelectOptions,
  getItemInput,
  getFieldIdentifier,
  getFieldSpecialization,
  getFieldSpecializationOptions,
  getAttributeError,
  getAddFieldButton,
  getItemType,
  getDeleteFieldButton,
} from './pageObject';

export async function selectAttribute(title) {
  await t.click(attributesDisplay).click(attributesOptions.withText(title));
}

export async function selectMultipleInstances(value) {
  await t
    .click(toggleInstances)
    .click(instancesInput)
    .pressKey('ctrl+a delete')
    .typeText(instancesInput, `${value}`, { paste: true });
}

export async function toggleMultipleInstances() {
  await t.click(toggleInstances);
}

export async function moreInstances() {
  await t.click(moreInstances);
}

export async function minusInstances() {
  await t.click(minusInstances);
}

export async function selectInstance(value) {
  await t.click(instanceButtons.withText(`${value}`));
}

export async function clickRunCheck() {
  await t.click(runCheckBtn);
}

export async function clickReset() {
  await t.click(resetBtn);
}

export async function selectItem(attributeId) {
  await t.click(getItemCheckbox(attributeId));
}

export async function clickToggleSelector(attributeId) {
  await t.click(getItemToggle(attributeId));
}

export async function clickSettingType(attributeId, type) {
  await t.click(getItemType(attributeId, type));
}

export async function selectItemAndInputSetting(attributeId, attributeValue) {
  await selectItem(attributeId);
  await clickToggleSelector(attributeId);
  await typeSettingOption(attributeId, attributeValue);
}

export async function selectItemAndSelectSetting(attributeId, attributeValue) {
  await selectItem(attributeId);
  await clickToggleSelector(attributeId);
  await selectSettingOption(attributeId, attributeValue);
}

export async function selectSettingOption(attributeId, value) {
  await t.click(getItemSelect(attributeId)).click(getItemSelectOptions(attributeId).withText(value));
}

export async function typeSettingOption(attributeId, value) {
  const input = getItemInput(attributeId);

  await t.click(input).pressKey('ctrl+a delete').typeText(input, `${value}`, { paste: true });
}

export async function typeFieldIdentifier(attributeId, value) {
  const identifier = getFieldIdentifier(attributeId);
  await t.click(identifier).pressKey('ctrl+a delete').typeText(identifier, `${value}`, { paste: true }).wait(250);
}

export async function selectFieldSpecialization(attributeId, value) {
  await t.click(getFieldSpecialization(attributeId)).click(getFieldSpecializationOptions(attributeId).withText(value));
}

export async function addField(index = 1) {
  await t.click(getAddFieldButton(index));
}

export async function deleteField(attributeId) {
  await t.click(getDeleteFieldButton(attributeId));
}

export async function getValidationMessage(attributeId, index = 1) {
  const validationWrapper = await getAttributeError(attributeId, index);

  return {
    errorId: await validationWrapper.getAttribute('data-error'),
    errorMessage: await validationWrapper.innerText,
  };
}
