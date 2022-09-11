export interface FormElementsTemplate {
  label: HTMLLabelElement;
  input: HTMLInputElement;
  textarea: HTMLTextAreaElement;
  select: HTMLSelectElement;
  checkbox: HTMLLabelElement;
}

export interface FormTemplate {
  form: HTMLFormElement;
  wrapper: HTMLElement;
  elements: FormElementsTemplate;
  header: HTMLElement;
  compliance: HTMLElement;
  description: HTMLElement;
}

export interface DemographicAnswer {
  free_form: boolean;
  label: string;
  id: number;
}

export interface DemographicQuestion {
  id: number;
  label: string;
  required: boolean;
  type: 'multi_value_single_select' | 'multi_value_multi_select';
  answer_options: DemographicAnswer[];
}

export interface DemographicQuestions {
  header: string;
  description: string;
  questions: DemographicQuestion[];
}

export interface DateResponse {
  month: string;
  year: string;
}

export interface EducationResponse {
  school_name_id: string;
  degree_id: string;
  discipline_id: string;
  start_date: DateResponse;
  end_date: DateResponse;
}

export interface EmploymentResponse {
  company_name: string;
  title: string;
  start_date: DateResponse;
  end_date: DateResponse;
  current: boolean;
}

export interface DemographicAnswerResponse {
  answer_option_id: number;
  text?: string;
}

export interface DemographicResponse {
  question_id: number;
  answer_options: DemographicAnswerResponse[];
}

export interface ComplianceResponse {
  gdpr_consent_given: boolean;
}
