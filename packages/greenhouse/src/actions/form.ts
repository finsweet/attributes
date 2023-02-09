import { cloneNode, FORM_CSS_CLASSES, isFile } from '@finsweet/ts-utils';
import type { JobWithQuestions, Question } from '@finsweet/ts-utils/dist/types/apis/Greenhouse';
import slugify from 'slugify';

import { Form } from '../components/Form';
import type {
  ComplianceResponse,
  DemographicQuestion,
  DemographicQuestions,
  DemographicResponse,
  EducationResponse,
  EmploymentResponse,
  FormElementsTemplate,
  FormTemplate,
} from '../types';
import { ATTRIBUTES, getSelector, queryElement } from '../utils/constants';
import { insertAfter } from '../utils/dom';
import {
  createInputElement,
  createInputHidden,
  createMultiSelectElement,
  createSingleSelectElement,
  createTextAreaElement,
} from '../utils/forms';

const GDPR_CONSENT_GIVEN_KEY = 'gdpr_consent_given';
const DEMOGRAPHIC_ANSWERS_PREFIX = 'demographic_answers';

export async function createJobForm(job: JobWithQuestions, jobId: string, boardId: string, form: HTMLFormElement) {
  const templates = getTemplates(form);
  if (templates === null) {
    return;
  }

  removeTemplates(templates);

  for (const { key, value } of [
    { key: 'job_id', value: jobId },
    { key: 'board_id', value: boardId },
  ]) {
    createInputHidden(key, value, templates);
  }

  const { questions, compliance, data_compliance, demographic_questions } = job;

  for (const question of questions) {
    const cloneWrapper = cloneNode(templates.wrapper);
    createQuestion(question, { ...templates, wrapper: cloneWrapper });
    appendQuestionWrapper(templates, cloneWrapper);
  }

  for (const { questions, description } of compliance) {
    const cloneWrapper = cloneNode(templates.wrapper);

    createQuestionDescription(description, { ...templates, wrapper: cloneWrapper });

    for (const question of questions) {
      createQuestion(question, { ...templates, wrapper: cloneWrapper });
    }

    appendQuestionWrapper(templates, cloneWrapper);
  }

  if (demographic_questions) {
    // /** @TODO import from ts-utils  */
    const demographicQuestionsTyped = demographic_questions as unknown as DemographicQuestions;

    const cloneWrapper = cloneNode(templates.wrapper);

    const { header, description, questions } = demographicQuestionsTyped;

    createQuestionHeader(header, { ...templates, wrapper: cloneWrapper });
    createQuestionDescription(description, { ...templates, wrapper: cloneWrapper });
    for (const question of questions) {
      createDemographicQuestion(question, { ...templates, wrapper: cloneWrapper });
    }

    appendQuestionWrapper(templates, cloneWrapper);
  }

  const requiresGDPRCheckbox = data_compliance.some(
    ({ type, requires_consent }) => type === 'gdpr' && requires_consent
  );

  if (requiresGDPRCheckbox) {
    const cloneWrapper = cloneNode(templates.wrapper);
    createGDPRCheckbox({ ...templates, wrapper: cloneWrapper });

    appendQuestionWrapper(templates, cloneWrapper);
  }

  templates.wrapper.remove();

  handleFormSubmissions(templates.form);
}

function appendQuestionWrapper(templates: FormTemplate, wrapper: HTMLElement) {
  const { form } = templates;

  const allQuestion = form.querySelectorAll<HTMLElement>(`${getSelector('element', 'questions')}`);

  const lastQuestion = allQuestion[allQuestion.length - 1];

  insertAfter(wrapper, lastQuestion);
}

// function createHiddenField() {}

function removeTemplates(templates: FormTemplate) {
  templates.description.remove();
  templates.header.remove();
  templates.compliance.remove();
  templates.elements.input.remove();
  templates.elements.textarea.remove();
  templates.elements.checkbox.remove();
  templates.elements.select.remove();
  templates.elements.label.remove();
}

function getTemplates(form: HTMLFormElement) {
  const formWrapper = form.closest<HTMLFormElement>(`form`) || form.querySelector<HTMLFormElement>('form');

  const questionsWrapper = queryElement<HTMLDivElement>(ATTRIBUTES.element.values.questions, { scope: form });
  const questionsHeader = queryElement<HTMLElement>(ATTRIBUTES.element.values['questions-header'], { scope: form });
  const questionsDescription = queryElement<HTMLElement>(ATTRIBUTES.element.values['questions-description'], {
    scope: form,
  });

  if (!questionsWrapper || !questionsHeader || !questionsDescription || !formWrapper) {
    return null;
  }

  const label = questionsWrapper.querySelector<HTMLLabelElement>('label');
  const inputTemplate = questionsWrapper.querySelector<HTMLInputElement>(':scope > input');
  const textAreaTemplate = questionsWrapper.querySelector<HTMLTextAreaElement>('textarea');
  const selectTemplate = questionsWrapper.querySelector<HTMLSelectElement>('select');
  const checkboxTemplate = questionsWrapper.querySelector<HTMLLabelElement>(`.${FORM_CSS_CLASSES.checkboxField}`);

  const complianceTemplate =
    formWrapper
      .querySelector('input[name="data_compliance[gdpr_consent_given]"')
      ?.closest<HTMLElement>(`.${FORM_CSS_CLASSES.checkboxField}`) || checkboxTemplate;

  if (!label || !inputTemplate || !textAreaTemplate || !selectTemplate || !checkboxTemplate || !complianceTemplate) {
    return null;
  }

  return {
    form: formWrapper,
    elements: {
      label,
      input: inputTemplate,
      textarea: textAreaTemplate,
      select: selectTemplate,
      checkbox: checkboxTemplate,
    },
    compliance: complianceTemplate,
    wrapper: questionsWrapper,
    header: questionsHeader,
    description: questionsDescription,
  };
}

function createQuestion(question: Question, templates: FormTemplate) {
  const { elements, wrapper } = templates;

  const { label, ...formElements } = elements;

  const labelId = createQuestionLabel(question.label, question.required, label, wrapper);
  createQuestionField(labelId, question, formElements, wrapper);
}

function createDemographicQuestion(question: DemographicQuestion, templates: FormTemplate) {
  const { elements, wrapper } = templates;

  const { label, ...formElements } = elements;

  const labelId = createQuestionLabel(question.label, question.required, label, wrapper);
  createDemographicQuestionField(labelId, question, formElements, wrapper);
}

function createQuestionDescription(text: string, templates: FormTemplate) {
  const { description, wrapper } = templates;

  const descriptionElement = cloneNode(description);
  descriptionElement.innerHTML = decodeHTML(text);
  wrapper.appendChild(descriptionElement);
}

function createQuestionHeader(text: string, templates: FormTemplate) {
  const { header, wrapper } = templates;

  const headerElement = cloneNode(header);
  headerElement.textContent = text;
  wrapper.appendChild(headerElement);
}

function createGDPRCheckbox(templates: FormTemplate) {
  const { compliance, wrapper } = templates;

  const checkboxWrapper = cloneNode(compliance);
  const checkboxLabel = checkboxWrapper.querySelector('span');
  const checkboxInput = checkboxWrapper.querySelector('input');
  if (!checkboxLabel || !checkboxInput) return;

  checkboxInput.name = GDPR_CONSENT_GIVEN_KEY;

  checkboxInput.required = true;

  wrapper.append(checkboxWrapper);
}

function createQuestionLabel(label: string, required: boolean, labelTemplate: HTMLLabelElement, wrapper: HTMLElement) {
  const newLabel = cloneNode(labelTemplate);
  // Label Text
  const labelId = slugify(label, { strict: true, lower: true });
  newLabel.id = labelId;
  // Make sure camelcase used is separated by spaces
  newLabel.innerText = label.replace(/([a-z])([A-Z])/g, '$1 $2');
  newLabel.removeAttribute('for');

  if (!required) newLabel.innerText = `${label} (optional)`;

  wrapper.append(newLabel);

  return labelId;
}

function createQuestionField(
  labelId: string,
  question: Question,
  formElements: Omit<FormElementsTemplate, 'label'>,
  wrapper: HTMLElement
) {
  const { required } = question;
  const { input, textarea, select, checkbox } = formElements;

  // Question Fields
  question.fields.forEach(({ name, type, values }) => {
    if (type === 'input_text') {
      // GH doesn't return a type for email fields, hence checking the name.
      if (name === 'email') createInputElement(wrapper, input, 'email', name, labelId, required);
      else createInputElement(wrapper, input, 'text', name, labelId, required);
    }

    if (type === 'input_file') {
      createInputElement(wrapper, input, 'file', name, labelId, required);
    }

    if (type === 'textarea') {
      createTextAreaElement(wrapper, textarea, name, labelId, required);
    }

    if (type === 'multi_value_single_select' && values) {
      const options = values.map(({ label, value }) => ({
        label,
        value,
        freeForm: false,
      }));
      createSingleSelectElement(wrapper, select, null, name, labelId, required, options);
    }

    if (type === 'multi_value_multi_select' && values) {
      const options = values.map(({ label, value }) => ({
        label,
        value,
        freeForm: false,
      }));

      createMultiSelectElement(wrapper, checkbox, null, name, required, options);
    }
  });
}

function createDemographicQuestionField(
  labelId: string,
  question: DemographicQuestion,
  formElements: Omit<FormElementsTemplate, 'label'>,
  wrapper: HTMLElement
) {
  const { select, checkbox, input } = formElements;
  const { type, answer_options, id, required } = question;

  const name = `${DEMOGRAPHIC_ANSWERS_PREFIX}_${id}`;

  if (type === 'multi_value_single_select') {
    const options = answer_options.map(({ label, id, free_form }) => ({ label, value: id, freeForm: free_form }));
    createSingleSelectElement(wrapper, select, input, name, labelId, required, options);
    return;
  }

  if (type === 'multi_value_multi_select') {
    const options = answer_options.map(({ label, id, free_form }) => ({ label, value: id, freeForm: free_form }));
    createMultiSelectElement(wrapper, checkbox, input, name, required, options);
    return;
  }
}

/**
 * Sends the form data to Zapier on submit.
 * @param form
 */
const handleFormSubmissions = (form: HTMLFormElement) => {
  const actionForm = new Form(form);

  actionForm.element.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // The endpoint URL should be set on Webflow designer.
    const endpoint = actionForm.element.getAttribute('action');
    if (!endpoint) return;

    const formData = new FormData(actionForm.element);

    const data: Record<
      string,
      | string
      | number
      | boolean
      | ComplianceResponse
      | (
          | string
          | number
          | boolean
          | EducationResponse
          | EmploymentResponse
          | DemographicResponse
          | ComplianceResponse
        )[]
    > = {};

    for (const [key, value] of formData.entries()) {
      if (!value || (isFile(value) && !value.size)) {
        continue;
      }

      if (isFile(value)) {
        if (!value.size) {
          data[key] = '';
          continue;
        }

        const base64 = await toBase64(value);
        const fileNameKey = `${key}_content_filename`;
        const fileContentKey = `${key}_content`;

        data[fileNameKey] = value.name;

        if (!base64) continue;
        // strip away data:image/png;base64 from the base64 string
        data[fileContentKey] = base64.toString().split(',').pop() || '';
        continue;
      }

      if (key.startsWith(DEMOGRAPHIC_ANSWERS_PREFIX)) {
        if (!data[DEMOGRAPHIC_ANSWERS_PREFIX]) {
          data[DEMOGRAPHIC_ANSWERS_PREFIX] = [];
        }

        const answers = data[DEMOGRAPHIC_ANSWERS_PREFIX] as DemographicResponse[];

        const [fieldId, fieldValue, fieldType] = key.replace(`${DEMOGRAPHIC_ANSWERS_PREFIX}_`, '').split('_');

        const questionId = parseInt(fieldId);

        const questionData = answers.find((answer) => answer.question_id === questionId);

        const answerOption = (fieldType && { answer_option_id: parseInt(fieldValue), text: value }) || {
          answer_option_id: parseInt(value),
        };

        if (!questionData) {
          const questionAnswer = { question_id: questionId, answer_options: [answerOption] };
          answers.push(questionAnswer);
          continue;
        }

        const questionAnwserOption = questionData.answer_options.find(
          (option) => option.answer_option_id === parseInt(value) || option.answer_option_id === parseInt(fieldValue)
        );

        if (questionAnwserOption && fieldType) {
          questionAnwserOption.text = value;
          continue;
        }
        questionData.answer_options.push(answerOption);
        continue;
      }

      const existingValue = data[key];

      if (existingValue !== undefined) {
        const newValue = Array.isArray(existingValue) ? existingValue : [existingValue];

        newValue.push(value);
        data[key] = newValue;
        continue;
      }

      if (key === GDPR_CONSENT_GIVEN_KEY) {
        data[key] = value === 'on';
        continue;
      }

      data[key] = value;
    }

    try {
      const network = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (network.ok) actionForm.showSuccess();
      else {
        actionForm.showError();
      }
    } catch (error) {
      actionForm.showError();
    }
  });
};

/**
 * Converts a File to base64.
 * @param file
 */
export const toBase64 = (file: File) =>
  new Promise<FileReader['result']>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

/**
 * This function will decode a html encoded string.
 * @param input The string to be decoded.
 * @returns {string} The decoded string.
 */
export const decodeHTML = (input: string) => {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent || '';
};
