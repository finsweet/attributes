import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * When hovering over this element, the tooltip content is shown.
   * This can be applied to any element — Div Block, Text Element, Span, etc.
   */
  'target',

  /**
   * The tooltip that shows when hover/click on `target`.
   * This element will be styled in Webflow (including CSS size properties like max-width)
   */
  'tooltip',

  /**
   * Tooltip template when using tooltips in Rich Text
   */
  'tooltip-template',

  /**
   * Arrow that will be used for tooltip
   */
  'arrow',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Animation setting
   */
  animation: {
    key: 'animation',
    values: {
      fade: 'fade',
      'slide-up': 'slide-up',
      'slide-down': 'slide-down',
      'slide-left': 'slide-left',
      'slide-right': 'slide-right',
      grow: 'grow',
      shrink: 'shrink',
      spin: 'spin',
    },
  },
  /**
   * Defines whether tooltip should be shown on hover or click.
   */
  trigger: {
    key: 'trigger',
    values: { hover: 'hover', click: 'click' },
  },
  /**
   * Defines whether tooltip should be hidden on hover or click.
   */
  triggerout: {
    key: 'triggerout',
    values: { hover: 'hover', click: 'click' },
  },
  /**
   * Defines placement for tooltip relative to toggle.
   */
  placement: {
    key: 'placement',
    values: {
      top: 'top',
      'top-start': 'top-start',
      'top-end': 'top-end',
      right: 'right',
      'right-start': 'right-start',
      'right-end': 'right-end',
      bottom: 'bottom',
      'bottom-start': 'bottom-start',
      'bottom-end': 'bottom-end',
      left: 'left',
      'left-start': 'left-start',
      'left-end': 'left-end',
    },
  },
  /**
   * Defines offset for tooltip placement.
   */
  offset: {
    key: 'offset',
  },
  /**
   * Defines padding for tooltip placement.
   */
  padding: {
    key: 'padding',
  },
  /**
   * Defines custom message for richtext element tooltip.
   */
  content: {
    key: 'content',
  },
  /**
   * Defines whether tooltip should flip when there is no space for it.
   */
  flip: {
    key: 'flip',
  },
  /**
   * Anchors the tooltip relative to any coordinates, tracks mouse movement.
   */
  floating: {
    key: 'floating',
  },
} as const satisfies AttributeSettings;
