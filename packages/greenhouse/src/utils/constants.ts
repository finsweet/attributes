import { GREENHOUSE_ATTRIBUTE } from 'global/constants/attributes';

import { generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${GREENHOUSE_ATTRIBUTE}`;

export const LIST_ELEMENT_KEY = 'list';
export const LINK_ELEMENT_KEY = 'link';
export const TITLE_ELEMENT_KEY = 'title';
export const DESCRIPTION_ELEMENT_KEY = 'description';
export const OFFICE_ELEMENT_KEY = 'office';
export const DEPARTMENT_ELEMENT_KEY = 'department';
export const APPLY_ELEMENT_KEY = 'apply';
export const FORM_ELEMENT_KEY = 'form';
export const QUESTIONS_ELEMENT_KEY = 'questions';
export const QUESTIONS_HEADER_ELEMENT_KEY = 'questions-header';
export const QUESTIONS_DESCRIPTIONS_ELEMENT_KEY = 'questions-description';

export const BOARD_SETTING_KEY = 'board';
export const QUERY_PARAM_SETTING_KEY = 'queryparam';
export const DEFAULT_QUERY_PARAM_SETTING_KEY = 'id';
export const FILTER_SETTING_KEY = 'filter';
export const DISPLAY_SETTING_KEY = 'display';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Added to either the Collection List Wrapper or the Collection List.
       */
      list: LIST_ELEMENT_KEY,

      /**
       * Added to any <a> element, it will append the job ID as a query parameter
       */
      link: LINK_ELEMENT_KEY,
      /**
       * Added to any text element, it will display the Job Title.
       */
      title: TITLE_ELEMENT_KEY,
      /**
       * Added to a Rich Text Block, it will display the Job Description.
       */
      description: DESCRIPTION_ELEMENT_KEY,
      /**
       * Added to any text element, it will display the Job Office name.
       */
      office: OFFICE_ELEMENT_KEY,
      /**
       * Added to any text element, it will display the Job Department name.
       */
      department: DEPARTMENT_ELEMENT_KEY,
      /**
       * Added to any link or button element, it will set the link href to the Greenhouse job application page.
       */
      apply: APPLY_ELEMENT_KEY,

      /**
       * Defines a Job Application Form
       */
      form: FORM_ELEMENT_KEY,
      /**
       * Added to a wrapper Div that holds the Question elements. This element will be cloned for each question.
       */
      questions: QUESTIONS_ELEMENT_KEY,
      /**
       * Display the header of a set of questions.
       */
      ['questions-header']: QUESTIONS_HEADER_ELEMENT_KEY,

      /**
       *  It will display the description of a set of questions
       */
      ['questions-description']: QUESTIONS_DESCRIPTIONS_ELEMENT_KEY,
    },
  },

  /**
   * Defines the query parameter used to define a job ID. Defaults to id.
   */
  queryparam: {
    key: `${ATTRIBUTES_PREFIX}-${QUERY_PARAM_SETTING_KEY}`,
    default: DEFAULT_QUERY_PARAM_SETTING_KEY,
  },
  board: {
    key: `${ATTRIBUTES_PREFIX}-${BOARD_SETTING_KEY}`,
  },

  filter: {
    key: `${ATTRIBUTES_PREFIX}-${FILTER_SETTING_KEY}`,
  },
  display: {
    key: `${ATTRIBUTES_PREFIX}-${DISPLAY_SETTING_KEY}`,
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const GH_API_BASE = 'https://boards-api.greenhouse.io/v1/boards/';

export const GH_API_JOBS = '/jobs';

export const GH_DEPARTMENT = 'department';

export const GH_OFFICE = 'office';

export const SUPPORTED_NESTED_KEYS = [GH_DEPARTMENT, GH_OFFICE];
