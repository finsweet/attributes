import { type FsAttributeKey } from '@finsweet/attributes-utils';

/**
 * Dynamically loads an attribute package.
 * @param key
 */
export const loadAttribute = async (key: FsAttributeKey) => {
  switch (key) {
    case 'a11y': {
      return import('@finsweet/attributes-a11y');
    }

    case 'accordion': {
      return import('@finsweet/attributes-accordion');
    }

    case 'autovideo': {
      return import('@finsweet/attributes-autovideo');
    }

    case 'cmscombine': {
      return import('@finsweet/attributes-cmscombine');
    }

    case 'cmsfilter': {
      return import('@finsweet/attributes-cmsfilter');
    }

    case 'cmsload': {
      return import('@finsweet/attributes-cmsload');
    }

    case 'cmsnest': {
      return import('@finsweet/attributes-cmsnest');
    }

    case 'cmsprevnext': {
      return import('@finsweet/attributes-cmsprevnext');
    }

    case 'cmsselect': {
      return import('@finsweet/attributes-cmsselect');
    }

    case 'cmsslider': {
      return import('@finsweet/attributes-cmsslider');
    }

    case 'cmssort': {
      return import('@finsweet/attributes-cmssort');
    }

    case 'cmsstatic': {
      return import('@finsweet/attributes-cmsstatic');
    }

    case 'cmstabs': {
      return import('@finsweet/attributes-cmstabs');
    }

    case 'codehighlight': {
      return import('@finsweet/attributes-codehighlight');
    }

    case 'combobox': {
      return import('@finsweet/attributes-combobox');
    }

    case 'component': {
      return import('@finsweet/attributes-component');
    }

    case 'copyclip': {
      return import('@finsweet/attributes-copyclip');
    }

    case 'countitems': {
      return import('@finsweet/attributes-countitems');
    }

    case 'displayvalues': {
      return import('@finsweet/attributes-displayvalues');
    }

    case 'favcustom': {
      return import('@finsweet/attributes-favcustom');
    }

    case 'formsubmit': {
      return import('@finsweet/attributes-formsubmit');
    }

    case 'greenhouse': {
      return import('@finsweet/attributes-greenhouse');
    }

    case 'inputactive': {
      return import('@finsweet/attributes-inputactive');
    }

    case 'inputcounter': {
      return import('@finsweet/attributes-inputcounter');
    }

    case 'launchdarkly': {
      return import('@finsweet/attributes-launchdarkly');
    }

    case 'linkblockedit': {
      return import('@finsweet/attributes-linkblockedit');
    }

    case 'mirrorclick': {
      return import('@finsweet/attributes-mirrorclick');
    }

    case 'mirrorinput': {
      return import('@finsweet/attributes-mirrorinput');
    }

    case 'modal': {
      return import('@finsweet/attributes-modal');
    }

    case 'numbercount': {
      return import('@finsweet/attributes-numbercount');
    }

    case 'queryparam': {
      return import('@finsweet/attributes-queryparam');
    }

    case 'rangeslider': {
      return import('@finsweet/attributes-rangeslider');
    }

    case 'readtime': {
      return import('@finsweet/attributes-readtime');
    }

    case 'richtext': {
      return import('@finsweet/attributes-richtext');
    }

    case 'scrolldisable': {
      return import('@finsweet/attributes-scrolldisable');
    }

    case 'selectcustom': {
      return import('@finsweet/attributes-selectcustom');
    }

    case 'sliderdots': {
      return import('@finsweet/attributes-sliderdots');
    }

    case 'smartlightbox': {
      return import('@finsweet/attributes-smartlightbox');
    }

    case 'socialshare': {
      return import('@finsweet/attributes-socialshare');
    }

    case 'starrating': {
      return import('@finsweet/attributes-starrating');
    }

    case 'toc': {
      return import('@finsweet/attributes-toc');
    }

    case 'videohls': {
      return import('@finsweet/attributes-videohls');
    }

    default: {
      throw `Finsweet Attribute "${key}" is not supported.`;
    }
  }
};
