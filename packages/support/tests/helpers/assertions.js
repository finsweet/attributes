import { t } from 'testcafe';
import {
  attributesDisplay,
  inputInstances,
  attributeHeader,
  reportItems,
  getReportError,
  getAttributeError,
  getSelectorName,
  getSelectorValue,
  getSelectorInputValue,
  getSelectorSelectValue,
  getAttribute,
  headerSuccess,
} from './pageObject';

export async function assertSuccessReport() {
  await t.expect(headerSuccess.visible).ok();
}

export async function assertAttributeSelected(attribute) {
  await t.expect(attributesDisplay.innerText).eql(attribute);
}

export async function assertInstancesCount(value) {
  await t.expect(inputInstances.value).eql(`${value}`);
}

export async function assertInstanceSelected(value) {
  await t.expect(instanceButtons.withText(`${value}`).hasClass('selected')).ok();
}

export async function assertHeaderTitle(attribute, instance) {
  await t.expect(attributeHeader).eql(`Check ${attribute} - Instance #${instance}`);
}

export async function assertErrorsCountOnReport(count) {
  await t.expect(reportItems.count).eql(count, 'check errors count', { timeout: 5000 });
}

export async function assertErrorIsOnReport(attributeId, errorType, index = 1) {
  await t
    .expect(getReportError(attributeId, index).getAttribute('data-error'))
    .eql(errorType, `check error ${attributeId}=${errorType}`, { timeout: 5000 });
}

export async function assertErrorIsOnAttribute(attributeId, errorType, index = 1) {
  await t
    .expect(getAttributeError(attributeId, index).getAttribute('data-error'))
    .eql(errorType, `check error ${attributeId}=${errorType}`, { timeout: 5000 });
}

export async function assertSuccess(attributeId, index = 1) {
  await t
    .expect(getAttributeError(attributeId, index).getAttribute('data-error'))
    .eql('success', `check success ${attributeId}`, { timeout: 5000 });
}

export async function assertSelectorName(attributeId, value) {
  await t.expect(getSelectorName(attributeId).innerText).eql(value);
}

export async function assertSelectorValue(attributeId, value) {
  await t.expect(getSelectorValue(attributeId).innerText).eql(value);
}

export async function assertSelectorSelectValue(attributeId, value) {
  await t.expect(getSelectorSelectValue(attributeId).innerText).eql(value);
}

export async function assertSelectorInputValue(attributeId, value) {
  await t.expect(getSelectorInputValue(attributeId).value).eql(value);
}

export async function assertStatusEmpty(attributeId) {
  const element = await getAttribute(attributeId);
  await t.expect(element.hasClass('is-success')).notOk();
  await t.expect(element.hasClass('is-error')).notOk();
}

export async function assertStatusSuccess(attributeId) {
  const element = await getAttribute(attributeId);
  await t.expect(element.hasClass('is-success')).ok();
}

export async function assertStatusError(attributeId) {
  const element = await getAttribute(attributeId);
  await t.expect(element.hasClass('is-error')).ok();
}
