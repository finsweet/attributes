import {
  getSchemaItem,
  createSchemaSelectorFromItem,
  createSchemaSelectorFromSchema,
} from '@src/services/Attributes/Schema/SchemaService';
import { validateDOMSelectors } from './SpecializationService';
import AbstractSchemaError from '@src/services/Errors/AbstractSchemaError';
// ui errors
import MissingFieldIdentifierError from './Errors/UI/MissingFieldIdentifierError';
import MissingFieldSpecializationError from './Errors/UI/MissingFieldSpecializationError';
// field errors
import MissingFieldError from './Errors/MissingFieldError';
import MissingFieldAppliedTagError from './Errors/MissingFieldAppliedTagError';
// components
import ComponentFieldNotFoundError from './Errors/Component/ComponentFieldNotFoundError';
import ComponentMissingExternalComponentError from './Errors/Component/ComponentMissingExternalComponentError';
import ComponentLinkNotWorkingError from './Errors/Component/ComponentLinkNotWorkingError';

// links
import FieldLinkNotFoundError from './Errors/Link/LinkFieldNotFoundError';
import FieldLinkMainCollectionLinkNotFoundError from './Errors/Link/FieldLinkMainCollectionLinkNotFoundError';
import FieldLinkMainCollectionLinkNotWorkingError from './Errors/Link/FieldLinkMainCollectionLinkNotWorkingError';
import FieldLinkMissingNestedCollectionError from './Errors/Link/FieldLinkMissingNestedCollectionError'
import FieldLinkNestedCollectionLinkNotFoundError from './Errors/Link/FieldLinkNestedCollectionLinkNotFoundError';
import FieldLinkNestedCollectionLinkNotWorkingError from './Errors/Link/FieldLinkNestedCollectionLinkNotWorkingError';
// types

import type {
  AttributeSchema,
  ParentSelector,
  ElementSelector,
  SelectorSelector,
  DOMSelector,
  AttributeFieldSchema,
  FieldSpecialization,
  InstanceFieldSpecializationAppliedTo,
} from '$global/types/schema';
import type { SchemaSettings, SchemaSelector } from '@src/types/Schema.types';
import type { InputChannel, SchemaInputField, InputValidationMessage } from '@src/types/Input.types';

type FieldValidatorResponse = HTMLElement | InputValidationMessage | null;

export async function validateField(
  fieldInput: SchemaInputField,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): Promise<InputChannel> {

  const schemaItem = getSchemaItem(schema, 'fields', fieldInput.field) as AttributeFieldSchema;

  const fieldSelector = createSchemaSelectorFromItem(
    schemaItem,
    'fields',
    fieldInput.field,
    schemaSettings,
    fieldInput.identifier
  );

  try {

    if (!fieldInput.identifier) {
      throw new MissingFieldIdentifierError();
    }

    if (!fieldInput.specialization) {
      throw new MissingFieldSpecializationError();
    }

    const specialization = schemaItem.specializations.find(
      (specialize: FieldSpecialization) => specialize.key === fieldInput.specialization
    );


    if (!specialization) {
      throw new Error(`Unexpected error: ${fieldInput.field} - Specialization not found`);
    }

    const {
      appliedTo
    } = specialization;

    const appliedPromises = appliedTo.map(
      async (applied: InstanceFieldSpecializationAppliedTo): Promise<FieldValidatorResponse> => {

      const { parent, selectors, key, value, type } = applied;


      try {
        return await validateSpecializationApplyTo(
          fieldSelector,
          parent,
          selectors,
          key,
          value,
          type,
          schema,
          schemaSettings
        )
      }  catch (error) {
        if (error instanceof AbstractSchemaError) {
          return {
            type: error.type,
            message: error.message,
          }
        }

        throw error;
      }

    });

    const fieldPromises = await Promise.all(appliedPromises);


    const fieldErrors = fieldPromises.filter(
      (fieldApplied: FieldValidatorResponse) =>
        fieldApplied && Object.prototype.hasOwnProperty.call(fieldApplied, 'message')
    ) as InputValidationMessage[];

    if (fieldErrors.length > 0) {
      return {
        domElements: null,
        input: {
          ...fieldInput,
          validation: {
            status: false,
            messages: fieldErrors
          }
        }
      }
    }

    return {
      domElements: fieldPromises as HTMLElement[],
      input: {
        ...fieldInput,
        validation: {
          status: true,
          messages: [
            {
              type: 'success',
              message: `Yup! Field ${fieldSelector.getPrettierSelector()} correctly setup.`
            }
          ]
        }
      }
    }

  } catch (error) {

    if (error instanceof AbstractSchemaError) {

      return {
        domElements: null,
        input: {
          ...fieldInput,
          validation: {
            status: false,
            messages: [
              {
                type: error.type,
                message: error.message,
              }
            ]
          }
        }
      }

    } else {
      throw error;
    }
  }
}


export function getParentElement(
  parent: ParentSelector | null,
  schema: AttributeSchema,
  settings: SchemaSettings,
): HTMLElement | null {

  let selector: HTMLElement | null = null;

  if (parent === null) {
    return selector;
  }

  parent.forEach((parentLevel: ElementSelector | SelectorSelector) => {

    if (parentLevel.type === 'element') {

      const parentSelector = createSchemaSelectorFromSchema(
        schema,
        'elements',
        parentLevel.element,
        settings,
        null,
      );


      selector = selector === null
        && document.querySelector(parentSelector.getElementSelector())
        || selector?.querySelector(parentSelector.getElementSelector()) || null;
      return;
    }

    if (parentLevel.type === 'selector') {
      selector = selector === null
        && document.querySelector(parentLevel.selector.selectors.join(' '))
        || selector?.querySelector(parentLevel.selector.selectors.join(' ')) || null;
      return;
    }


  })

  return selector;
}

// function

export async function fetchDocument(href: string): Promise<Document> {

  const response = await fetch(href);

  if (response.status !== 200) {
    throw new Error('Unexpected error: Link return other than 200 code.');
  }
  const htmlResponse = await response.text();
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlResponse, "text/html");
  return html;
}

function findElement(parentElement: HTMLElement | null, selector: string): HTMLElement | null {

  if (parentElement) {
    return parentElement.querySelector<HTMLElement>(selector)
  }

  return document.querySelector<HTMLElement>(selector);
}


export async function validateSpecializationApplyTo(
  field: SchemaSelector,
  parent: ParentSelector | null,
  selectors: DOMSelector[],
  key: string | undefined,
  value: string | undefined,
  type: string | undefined,
  schema: AttributeSchema,
  settings: SchemaSettings,
): Promise<HTMLElement | null> {

  if (type === 'component') {

    const value = field.getValue();

    if (value.indexOf('=') !== -1) {

      const href = value.split('=')[1];

      let page;

      try {
        page = await fetchDocument(href.replace(/^["'](.+(?=["']$))["']$/, '$1'));
      } catch {
        throw new ComponentLinkNotWorkingError(field);
      }

      const externalSelector = field.getElementSelector().replace(`=${href}`, '');

      const pageField = page.querySelector(externalSelector);

      if (!pageField) {
        throw new ComponentMissingExternalComponentError(field);
      }
      return null;
    }
  }

  const parentSelectors: HTMLElement | null = getParentElement(parent, schema, settings);


  const instanceField =  Object.assign(Object.create(Object.getPrototypeOf(field)), field)
  if (key && value) {
    instanceField.setAttribute(`fs-${settings.key}-${key}`)
    instanceField.setValue(`${value}${settings.instance>1 ? `-${settings.instance}` : ''}`)
  }

  let valueSelector = null;

  if (!key && value) {
    const searchValue = value.replace('$FIELD', field.getValue());
    valueSelector = `[value="${searchValue}"],[${instanceField.getAttribute()}="${searchValue}"]`;
  }

  const element = findElement(parentSelectors, valueSelector || instanceField.getElementSelector());

  if (element === null) {

    switch (type) {
      case 'link':
        throw new FieldLinkNotFoundError(instanceField);
      case 'component':
        throw new ComponentFieldNotFoundError(instanceField);
      case 'element':
        throw new MissingFieldError(instanceField, parent);
      default:
        throw new MissingFieldError(instanceField, parent);
    }
  }

  if (selectors.length >= 1) {
    if (!validateDOMSelectors(element, selectors)) {
      throw new MissingFieldAppliedTagError(
        instanceField,
        selectors,
      );
    }
  }

  if (type && type === 'link') {
    // check internal cms list item

    const item = element.closest('.w-dyn-item');
    const itemLink = item?.querySelector('a');

    if (!itemLink || itemLink.closest(field.getElementSelector())) {
      throw new FieldLinkMainCollectionLinkNotFoundError(field);
    }


    const href: string = itemLink.getAttribute('href') as string;

    let page;

    try {
      page = await fetchDocument(href);
    } catch {
      throw new FieldLinkMainCollectionLinkNotWorkingError(field);
    }


    const pageCollection = page.querySelector(field.getElementSelector());

    if (!pageCollection) {
      throw new FieldLinkMissingNestedCollectionError(field);
    }

    const pageItem = pageCollection?.querySelector('.w-dyn-item');

    const pageLink = pageItem?.querySelector('a');


    if (!pageLink) {
      throw new FieldLinkNestedCollectionLinkNotFoundError(field);
    }

    const nestedHref: string = pageLink.getAttribute('href') as string;

    try {
      await fetchDocument(nestedHref);
    } catch {
      throw new FieldLinkNestedCollectionLinkNotWorkingError(field);
    }

  }

  return element;

}
