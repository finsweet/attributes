import type { AttributeExamples } from '@global/types/examples';

export const examples: AttributeExamples = [
  {
    title: 'Simple Link Block',
    description: 'Convert a Div into a Link Block to make it Editor friendly.',
    data: {
      type: '@webflow/XscpData',
      payload: {
        nodes: [
          {
            _id: '5f8695f3-b249-0f8d-5198-3c14692b0bbd',
            tag: 'div',
            classes: ['9dd23695-1acc-e642-10ea-faaff22b7139'],
            children: ['5f8695f3-b249-0f8d-5198-3c14692b0bbe'],
            type: 'Block',
            data: {
              tag: 'div',
              text: false,
              attr: {},
              xattr: [{ name: 'fs-linkblockedit-element', value: 'parent' }],
            },
          },
          {
            _id: '5f8695f3-b249-0f8d-5198-3c14692b0bbe',
            tag: 'a',
            classes: [],
            children: ['5f8695f3-b249-0f8d-5198-3c14692b0bbf'],
            type: 'Link',
            data: {
              link: { mode: 'external', url: 'https://www.finsweet.com', target: '_blank' },
              attr: {},
            },
          },
          { _id: '5f8695f3-b249-0f8d-5198-3c14692b0bbf', text: true, v: 'Link Block' },
        ],
        styles: [
          {
            _id: '9dd23695-1acc-e642-10ea-faaff22b7139',
            fake: false,
            type: 'class',
            name: 'fs-linkblockedit_parent',
            namespace: '',
            comb: '',
            styleLess:
              'display: flex; width: 12rem; padding-top: 1rem; padding-bottom: 1rem; flex-direction: column; justify-content: center; align-items: center; background-color: hsla(254.08450704225356, 100.00%, 58.24%, 1.00); color: hsla(0, 0.00%, 100.00%, 1.00); cursor: pointer;',
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
];
