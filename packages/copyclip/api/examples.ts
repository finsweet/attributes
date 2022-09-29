import type { AttributeExamples } from '$global/types/examples';

export const examples: AttributeExamples = [
  {
    title: 'Copy me',
    description: 'Copy the content of the trigger when clicking on it.',
    data: {
      type: '@webflow/XscpData',
      payload: {
        nodes: [
          {
            _id: '0160498a-3d95-b32e-c856-f1929f90c685',
            tag: 'a',
            classes: ['a68e3d79-d1bd-ac24-2e2f-ab078b960d5b'],
            children: ['0160498a-3d95-b32e-c856-f1929f90c686'],
            type: 'Link',
            data: {
              button: true,
              link: { mode: 'external', url: '#' },
              xattr: [
                { name: 'fs-copyclip-element', value: 'click' },
                { name: 'fs-copyclip-message', value: 'Copied!' },
              ],
            },
          },
          { _id: '0160498a-3d95-b32e-c856-f1929f90c686', text: true, v: 'Copy me' },
        ],
        styles: [
          {
            _id: 'a68e3d79-d1bd-ac24-2e2f-ab078b960d5b',
            fake: false,
            type: 'class',
            name: 'fs-copyclip_button',
            namespace: '',
            comb: '',
            styleLess:
              'padding-top: 0.6rem; padding-right: 2rem; padding-bottom: 0.65rem; padding-left: 2rem; border-top-left-radius: 500px; border-top-right-radius: 500px; border-bottom-left-radius: 500px; border-bottom-right-radius: 500px; background-color: hsla(254.08450704225356, 100.00%, 58.24%, 1.00); color: hsla(0, 0.00%, 100.00%, 1.00); text-align: center;',
            variants: {
              main_hover: { styleLess: 'background-color: hsla(254.08450704225356, 100.00%, 61.16%, 1.00);' },
            },
            children: [],
            selector: null,
          },
        ],
        assets: [],
        ix1: [],
        ix2: { interactions: [], events: [], actionLists: [] },
      },
      meta: {
        unlinkedSymbolCount: 0,
        droppedLinks: 0,
        dynBindRemovedCount: 0,
        dynListBindRemovedCount: 0,
        paginationRemovedCount: 0,
      },
    },
  },
  {
    title: 'Copy this',
    description: 'Copy the content of a target element when clicking on the trigger.',
    data: {
      type: '@webflow/XscpData',
      payload: {
        nodes: [
          {
            _id: '0160498a-3d95-b32e-c856-f1929f90c699',
            tag: 'div',
            classes: ['10c2ad06-2ada-6865-1dd0-015791aa51be'],
            children: ['0160498a-3d95-b32e-c856-f1929f90c69a', '0160498a-3d95-b32e-c856-f1929f90c69c'],
            type: 'Block',
            data: { tag: 'div', text: false },
          },
          {
            _id: '0160498a-3d95-b32e-c856-f1929f90c69a',
            tag: 'a',
            classes: ['a68e3d79-d1bd-ac24-2e2f-ab078b960d5b'],
            children: ['0160498a-3d95-b32e-c856-f1929f90c69b'],
            type: 'Link',
            data: {
              button: true,
              link: { mode: 'external', url: '#' },
              xattr: [
                { name: 'fs-copyclip-element', value: 'click-2' },
                { name: 'fs-copyclip-message', value: 'Copied!' },
              ],
            },
          },
          { _id: '0160498a-3d95-b32e-c856-f1929f90c69b', text: true, v: 'Copy this --->' },
          {
            _id: '0160498a-3d95-b32e-c856-f1929f90c69c',
            tag: 'p',
            classes: ['a68e3d79-d1bd-ac24-2e2f-ab078b960d58'],
            children: ['0160498a-3d95-b32e-c856-f1929f90c69d'],
            type: 'Paragraph',
            data: { xattr: [{ name: 'fs-copyclip-element', value: 'copy-this-2' }] },
          },
          { _id: '0160498a-3d95-b32e-c856-f1929f90c69d', text: true, v: 'I am the text that will be copied.' },
        ],
        styles: [
          {
            _id: '10c2ad06-2ada-6865-1dd0-015791aa51be',
            fake: false,
            type: 'class',
            name: 'fs-copyclip_wrapper',
            namespace: '',
            comb: '',
            styleLess:
              'position: relative; display: grid; justify-items: start; align-items: center; grid-auto-flow: column; grid-auto-columns: auto; grid-column-gap: 1rem; grid-row-gap: 1rem; grid-template-columns: auto; grid-template-rows: auto;',
            variants: {},
            children: [],
            selector: null,
          },
          {
            _id: 'a68e3d79-d1bd-ac24-2e2f-ab078b960d5b',
            fake: false,
            type: 'class',
            name: 'fs-copyclip_button',
            namespace: '',
            comb: '',
            styleLess:
              'padding-top: 0.6rem; padding-right: 2rem; padding-bottom: 0.65rem; padding-left: 2rem; border-top-left-radius: 500px; border-top-right-radius: 500px; border-bottom-left-radius: 500px; border-bottom-right-radius: 500px; background-color: hsla(254.08450704225356, 100.00%, 58.24%, 1.00); color: hsla(0, 0.00%, 100.00%, 1.00); text-align: center;',
            variants: {
              main_hover: { styleLess: 'background-color: hsla(254.08450704225356, 100.00%, 61.16%, 1.00);' },
            },
            children: [],
            selector: null,
          },
          {
            _id: 'a68e3d79-d1bd-ac24-2e2f-ab078b960d58',
            fake: false,
            type: 'class',
            name: 'fs-copyclip_text',
            namespace: '',
            comb: '',
            styleLess: 'color: hsla(0, 0.00%, 67.33%, 1.00);',
            variants: {},
            children: [],
            selector: null,
          },
        ],
        assets: [],
        ix1: [],
        ix2: { interactions: [], events: [], actionLists: [] },
      },
      meta: {
        unlinkedSymbolCount: 0,
        droppedLinks: 0,
        dynBindRemovedCount: 0,
        dynListBindRemovedCount: 0,
        paginationRemovedCount: 0,
      },
    },
  },
  {
    title: 'Copy sibling',
    description: 'Copy the content of a sibling element when clicking on the trigger.',
    data: {
      type: '@webflow/XscpData',
      payload: {
        nodes: [
          {
            _id: '0160498a-3d95-b32e-c856-f1929f90c6b0',
            tag: 'div',
            classes: ['10c2ad06-2ada-6865-1dd0-015791aa51be'],
            children: ['0160498a-3d95-b32e-c856-f1929f90c6b1', '0160498a-3d95-b32e-c856-f1929f90c6b3'],
            type: 'Block',
            data: { tag: 'div', text: false },
          },
          {
            _id: '0160498a-3d95-b32e-c856-f1929f90c6b1',
            tag: 'a',
            classes: ['a68e3d79-d1bd-ac24-2e2f-ab078b960d5b'],
            children: ['0160498a-3d95-b32e-c856-f1929f90c6b2'],
            type: 'Link',
            data: {
              button: true,
              link: { mode: 'external', url: '#' },
              xattr: [
                { name: 'fs-copyclip-element', value: 'click' },
                { name: 'fs-copyclip-message', value: 'Copied!' },
              ],
            },
          },
          { _id: '0160498a-3d95-b32e-c856-f1929f90c6b2', text: true, v: 'Copy sibling' },
          {
            _id: '0160498a-3d95-b32e-c856-f1929f90c6b3',
            tag: 'p',
            classes: ['a68e3d79-d1bd-ac24-2e2f-ab078b960d58'],
            children: ['0160498a-3d95-b32e-c856-f1929f90c6b4'],
            type: 'Paragraph',
            data: { xattr: [{ name: 'fs-copyclip-element', value: 'copy-sibling' }] },
          },
          {
            _id: '0160498a-3d95-b32e-c856-f1929f90c6b4',
            text: true,
            v: 'I am the sibling element that will be copied',
          },
        ],
        styles: [
          {
            _id: '10c2ad06-2ada-6865-1dd0-015791aa51be',
            fake: false,
            type: 'class',
            name: 'fs-copyclip_wrapper',
            namespace: '',
            comb: '',
            styleLess:
              'position: relative; display: grid; justify-items: start; align-items: center; grid-auto-flow: column; grid-auto-columns: auto; grid-column-gap: 1rem; grid-row-gap: 1rem; grid-template-columns: auto; grid-template-rows: auto;',
            variants: {},
            children: [],
            selector: null,
          },
          {
            _id: 'a68e3d79-d1bd-ac24-2e2f-ab078b960d5b',
            fake: false,
            type: 'class',
            name: 'fs-copyclip_button',
            namespace: '',
            comb: '',
            styleLess:
              'padding-top: 0.6rem; padding-right: 2rem; padding-bottom: 0.65rem; padding-left: 2rem; border-top-left-radius: 500px; border-top-right-radius: 500px; border-bottom-left-radius: 500px; border-bottom-right-radius: 500px; background-color: hsla(254.08450704225356, 100.00%, 58.24%, 1.00); color: hsla(0, 0.00%, 100.00%, 1.00); text-align: center;',
            variants: {
              main_hover: { styleLess: 'background-color: hsla(254.08450704225356, 100.00%, 61.16%, 1.00);' },
            },
            children: [],
            selector: null,
          },
          {
            _id: 'a68e3d79-d1bd-ac24-2e2f-ab078b960d58',
            fake: false,
            type: 'class',
            name: 'fs-copyclip_text',
            namespace: '',
            comb: '',
            styleLess: 'color: hsla(0, 0.00%, 67.33%, 1.00);',
            variants: {},
            children: [],
            selector: null,
          },
        ],
        assets: [],
        ix1: [],
        ix2: { interactions: [], events: [], actionLists: [] },
      },
      meta: {
        unlinkedSymbolCount: 0,
        droppedLinks: 0,
        dynBindRemovedCount: 0,
        dynListBindRemovedCount: 0,
        paginationRemovedCount: 0,
      },
    },
  },
  {
    title: 'Copy string',
    description: 'Copy a specific string of text when clicking on the trigger.',
    data: {
      type: '@webflow/XscpData',
      payload: {
        nodes: [
          {
            _id: 'beb81d4a-13da-12ac-ab68-aa3353b54bca',
            tag: 'a',
            classes: ['a68e3d79-d1bd-ac24-2e2f-ab078b960d5b'],
            children: ['beb81d4a-13da-12ac-ab68-aa3353b54bcb'],
            type: 'Link',
            data: {
              button: true,
              link: { mode: 'external', url: '#' },
              xattr: [
                { name: 'fs-copyclip-element', value: 'click' },
                { name: 'fs-copyclip-message', value: 'Copied!' },
                { name: 'fs-copyclip-text', value: "This is F'in cool!" },
              ],
            },
          },
          { _id: 'beb81d4a-13da-12ac-ab68-aa3353b54bcb', text: true, v: 'Copy string' },
        ],
        styles: [
          {
            _id: 'a68e3d79-d1bd-ac24-2e2f-ab078b960d5b',
            fake: false,
            type: 'class',
            name: 'fs-copyclip_button',
            namespace: '',
            comb: '',
            styleLess:
              'padding-top: 0.6rem; padding-right: 2rem; padding-bottom: 0.65rem; padding-left: 2rem; border-top-left-radius: 500px; border-top-right-radius: 500px; border-bottom-left-radius: 500px; border-bottom-right-radius: 500px; background-color: hsla(254.08450704225356, 100.00%, 58.24%, 1.00); color: hsla(0, 0.00%, 100.00%, 1.00); text-align: center;',
            variants: {
              main_hover: { styleLess: 'background-color: hsla(254.08450704225356, 100.00%, 61.16%, 1.00);' },
            },
            children: [],
            selector: null,
          },
        ],
        assets: [],
        ix1: [],
        ix2: { interactions: [], events: [], actionLists: [] },
      },
      meta: {
        unlinkedSymbolCount: 0,
        droppedLinks: 0,
        dynBindRemovedCount: 0,
        dynListBindRemovedCount: 0,
        paginationRemovedCount: 0,
      },
    },
  },
];
