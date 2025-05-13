import { type FinsweetAttributeKey } from '@finsweet/attributes-utils';

/**
 * Dynamically loads an attribute package.
 * @param key
 */
export const loadAttribute = async (key: FinsweetAttributeKey) => {
  switch (key) {
    case 'accordion': {
      return import('@finsweet/attributes-accordion');
    }

    case 'autovideo': {
      return import('@finsweet/attributes-autovideo');
    }

    case 'codehighlight': {
      return import('@finsweet/attributes-codehighlight');
    }

    case 'combobox': {
      return import('@finsweet/attributes-combobox');
    }

    case 'inject': {
      return import('@finsweet/attributes-inject');
    }

    case 'copyclip': {
      return import('@finsweet/attributes-copyclip');
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

    case 'inputactive': {
      return import('@finsweet/attributes-inputactive');
    }

    case 'inputcounter': {
      return import('@finsweet/attributes-inputcounter');
    }

    case 'list': {
      return import('@finsweet/attributes-list');
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

    case 'removequery': {
      return import('@finsweet/attributes-removequery');
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
