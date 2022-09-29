import type { AttributeExamples } from '$global/types/examples';

export const examples: AttributeExamples = [
  {
    title: 'Image as the source',
    description: 'Use an existing image on the page as the source for the favicon.',
    data: {
      type: '@webflow/XscpData',
      payload: {
        nodes: [
          {
            _id: '08a02589-cc25-b0dd-eb0d-75afcb787037',
            tag: 'img',
            classes: [],
            children: [],
            type: 'Image',
            data: {
              attr: {
                src: 'https://uploads-ssl.webflow.com/6132770a5e2efb2a37b68270/615b047565d1ab33bf96c850_attriutes-favicon.png',
                loading: 'lazy',
                width: 'auto',
                height: 'auto',
              },
              img: { id: '615b047565d1ab33bf96c850', sizes: [{ max: 10000, size: '100vw' }] },
              xattr: [{ name: 'fs-favcustom-element', value: 'src' }],
            },
          },
        ],
        styles: [],
        assets: [
          {
            cdnUrl:
              'https://uploads-ssl.webflow.com/6132770a5e2efb2a37b68270/615b047565d1ab33bf96c850_attriutes-favicon.png',
            siteId: '6132770a5e2efb2a37b68270',
            width: 32,
            isHD: false,
            height: 32,
            fileName: '615b047565d1ab33bf96c850_attriutes-favicon.png',
            createdOn: '2021-10-04T13:41:09.593Z',
            origFileName: 'attriutes-favicon.png',
            fileHash: 'a883c23fd3cfc3222ecb5471d829823d',
            variants: [],
            mimeType: 'image/png',
            s3Url:
              'https://s3.amazonaws.com/webflow-prod-assets/6132770a5e2efb2a37b68270/615b047565d1ab33bf96c850_attriutes-favicon.png',
            thumbUrl:
              'https://daks2k3a4ib2z.cloudfront.net/6132770a5e2efb2a37b68270/615b047565d1ab33bf96c850_attriutes-favicon.png',
            _id: '615b047565d1ab33bf96c850',
            updatedOn: '2021-10-04T19:02:13.008Z',
            fileSize: 1350,
          },
        ],
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
