import { Selector } from 'testcafe';

const supportWrapper = Selector('[data-id="fs-attributes-support"]').shadowRoot();

/**
 * Walkthrought
 */
export const walkthrought = supportWrapper.find('[data-testid="walkthrough"]');

/**
 * Header
 */
export const headerSection = supportWrapper.find('[data-testid="walkthrough-header"]');
export const headerButton = headerSection.find('[data-testid="action"]');

export const attributeHeader = supportWrapper.find('[data-testid="attribute-header"]');

export const headerSuccess = supportWrapper.find('[data-testid="success"');

/**
 * Attributes
 */
//export const attributesSection = Selector('[data-testid="walkthrough-attributes"]');
// export const attributesSelect = Selector('[data-testid="select-attribute"]');
export const attributesDisplay = supportWrapper.find('[data-testid="select-attribute-display"]');

export const attributesOptions = supportWrapper.find('[data-testid="select-attribute-option"]');

/**
 * Instances
 */
export const toggleInstances = supportWrapper.find('[data-testid="select-attribute-toggle-instances"]');
export const inputInstances = supportWrapper.find('[data-testid="select-attribute-input-instances"]');
export const moreInstances = supportWrapper.find('[data-testid="select-attribute-more-instances"]');
export const minusInstances = supportWrapper.find('[data-testid="select-attribute-minus-instances"]');

export const instanceButtons = supportWrapper.find('[data-testid="select-attribute-instance"]');

// export const instancesSection = Selector('[data-testid="walkthrough-instances"]');
export const instancesMoreButton = supportWrapper.find('#more-instances');
export const instancesInput = supportWrapper.find('#instances');

/**
 * Select instance
 */
export const selectInstanceSection = supportWrapper.find('[data-testid="walkthrough-select-instance"]');

export const runCheckBtn = supportWrapper.find('[data-testid="run-check"]');
export const resetBtn = supportWrapper.find('[data-testid="reset"]');

/**
 * Schema
 */

export const getAttribute = (attributeId) => {
  return supportWrapper.find(`#${attributeId}`);
};

export const getItemCheckbox = (attributeId) => {
  return supportWrapper.find(`#${attributeId} label input[type=checkbox]`);
};

export const getItemToggle = (attributeId) => {
  return supportWrapper.find(`#${attributeId} [data-testid="attribute-toggle"]`);
};

export const getItemType = (attributeId, valueType) => {
  return supportWrapper.find(`#${attributeId} [data-testid="selector-${valueType}"]`);
};

/**
 * Report
 */
// export const reportSection = Selector('[data-testid="walkthrough-report"]');
// export const reportResponse = reportSection.find('[data-testid="report-list"]');

export const reportItems = supportWrapper.find('[data-testid="report-item"]');

export const getAddFieldButton = (index = 1) => {
  const elements = supportWrapper.find(`[data-testid="add-field"]`);

  return elements.count > 1 ? elements[index - 1] : elements;
};

export const getDeleteFieldButton = (attributeId) => {
  return supportWrapper.find(`[data-testid="${attributeId}-delete"]`);
};

export const getReportError = (attributeId, index = 1) => {
  return supportWrapper.find(`[data-test="${attributeId}"]`);
};

export const getAttributeError = (attributeId, index = 1) => {
  const elements = supportWrapper.find(`#${attributeId} [data-testid="attribute-error"]`);

  return elements.count > 1 ? elements[index - 1] : elements;
  //return Selector(`#${attributeId} [data-testid="attribute-error"]`);
};

export const getItemSelect = (attributeId) => {
  const elements = supportWrapper.find(`#${attributeId} [data-testid="settings-select"]`);
  return elements.count > 1 ? elements[index - 1] : elements;
};

export const getItemSelectOptions = (attributeId) => {
  return supportWrapper.find(`#${attributeId} [data-testid="settings-select-option"]`);
};

export const getItemInput = (attributeId) => {
  const elements = supportWrapper.find(`#${attributeId} [data-testid="selector-input"]`);
  return elements.count > 1 ? elements[index - 1] : elements;
};

export const getFieldIdentifier = (attributeId) => {
  return supportWrapper.find(`#${attributeId} [data-testid="field-identifier"]`);
};

export const getFieldSpecialization = (attributeId) => {
  return supportWrapper.find(`#${attributeId} [data-testid="field-specialization"]`);
};

export const getFieldSpecializationOptions = (attributeId) => {
  return supportWrapper.find(`#${attributeId} [data-testid="field-specialization-option"]`);
};

export const getSelectorName = (attributeId) => {
  return supportWrapper.find(`#${attributeId} [data-testid="name"] [data-testid="selector-value"]`);
};

export const getSelectorValue = (attributeId) => {
  return supportWrapper.find(`#${attributeId} [data-testid="value"] [data-testid="selector-value"]`);
};

export const getSelectorInputValue = (attributeId) => {
  return supportWrapper.find(
    `#${attributeId} [data-testid="value"] [data-testid="selector-value"] .form__controller input`
  );
};

export const getSelectorSelectValue = (attributeId) => {
  return supportWrapper.find(
    `#${attributeId} [data-testid="value"] [data-testid="selector-value"] [data-testid="settings-select"]`
  );
};
