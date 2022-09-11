export interface SchemaInputConfig {
  instance: number;
  key: string;
}

export interface SchemaInputElement extends SchemaInputConfig {
  element: string;
  type: 'element';
  validation: SchemaInputValidation | null;
}

export interface SchemaInputSetting extends SchemaInputConfig {
  enable: boolean;
  type: 'setting';
  setting: string;
  option: string;
  validation: SchemaInputValidation | null;
}

export interface SchemaInputElementSetting extends SchemaInputConfig {
  element: string;
  enable: boolean;
  type: 'elementSetting';
  setting: string;
  option: string;
  validation: SchemaInputValidation | null;
}

export interface SchemaInputField extends SchemaInputConfig {
  field: string;
  index: string;
  specialization: string;
  identifier: string;
  type: 'field';
  validation: SchemaInputValidation | null;
}

export interface SchemaInputFieldSetting extends SchemaInputConfig {
  field: string;
  index: string;
  type: 'fieldSetting';
  enable: boolean;
  setting: string;
  option: string;
  validation: SchemaInputValidation | null;
}

export interface SchemaInputFieldElement extends SchemaInputConfig {
  field: string;
  index: string;
  element: string;
  type: 'fieldElement';
  validation: SchemaInputValidation | null;
}

export type SchemaInput =
  | SchemaInputElement
  | SchemaInputField
  | SchemaInputElementSetting
  | SchemaInputFieldSetting
  | SchemaInputFieldElement
  | SchemaInputSetting;

export type SchemaForm = SchemaInput[];

export interface SchemaInputValidation {
  messages: InputValidationMessage[];
  //message: string;
  status: boolean;
  //type?: string;
}

export interface InputValidationMessage {
  message: string;
  type: string;
}

export type SchemaInputType =
  | SchemaInputElement['type']
  | SchemaInputElementSetting['type']
  | SchemaInputField['type']
  | SchemaInputFieldSetting['type']
  | SchemaInputFieldElement['type']
  | SchemaInputSetting['type'];

export interface InputChannel {
  input: SchemaInput;
  domElements: HTMLElement[] | null;
}

export type FieldChangeSpecialization = (fieldIndex: string, value: string) => void;

export type FieldChangeIdentifier = (fieldIndex: string, value: string) => void;
