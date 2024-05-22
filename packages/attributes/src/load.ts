import { type FinsweetAttributeKey } from '@finsweet/attributes-utils';

/**
 * Dynamically loads an attribute package.
 * @param solution
 */
export const loadAttribute = async (solution: FinsweetAttributeKey) => {
  switch (solution) {
    case 'a11y': {
      return import('@finsweet/attributes-a11y');
    }

    case 'accordion': {
      return import('@finsweet/attributes-accordion');
    }

    case 'autovideo': {
      return import('@finsweet/attributes-autovideo');
    }

    case 'beforeafter': {
      return import('@finsweet/attributes-beforeafter');
    }

    case 'calevent': {
      return import('@finsweet/attributes-calevent');
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

    case 'consent': {
      return import('@finsweet/attributes-consent');
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

    case 'list': {
      return import('@finsweet/attributes-list');
    }

    case 'masonry': {
      return import('@finsweet/attributes-masonry');
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

    case 'nativesearch': {
      return import('@finsweet/attributes-nativesearch');
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

    case 'slider': {
      return import('@finsweet/attributes-slider');
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

    case 'typing': {
      return import('@finsweet/attributes-typing');
    }

    case 'videohls': {
      return import('@finsweet/attributes-videohls');
    }

    default: {
      throw `Finsweet Attribute "${solution}" is not supported.`;
    }
  }
};
