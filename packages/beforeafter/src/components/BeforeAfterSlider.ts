import { type BeforeAfterSliderOptions, DEFAULTS, SETTINGS } from '../utils';

const CLASSNAME = 'before-after-slider';
/**
 * A better before/after slider
 */
export class BeforeAfterSlider {
  /**
   * Internal Props
   */
  private isDragging = false;
  private isHovering = false;
  private cursorPosition = 0;
  private cursorOffset = 0;
  private dragZoneEl?: HTMLElement;

  /**
   * Passed Props
   */
  private wrapperEl: HTMLElement;
  private start: number;
  private beforeEl: HTMLElement;
  private afterEl: HTMLElement;
  private dragHandleEl?: HTMLElement;
  private interactionMode: keyof typeof SETTINGS.mode.values;

  /**
   * Constructor
   */
  constructor(
    wrapper: HTMLElement,
    { before, after, dragHandle, start = DEFAULTS.start, interactionMode = DEFAULTS.mode }: BeforeAfterSliderOptions
  ) {
    this.wrapperEl = wrapper;
    this.start = parseInt(start) ? Math.min(100, Math.max(0, parseInt(start))) : parseInt(DEFAULTS.start);
    this.beforeEl = before;
    this.afterEl = after;
    this.dragHandleEl = dragHandle;
    this.interactionMode = interactionMode;
  }

  /**
   * Initialize the component
   */
  public init(): this {
    this.initElements();
    this.initEvents();
    this.initStyles();

    return this;
  }

  /**
   * Initialize the elements
   */
  private initElements(): void {
    // create a drag zone
    this.dragZoneEl = document.createElement('div');

    // append the dragZone to the wrapper
    this.wrapperEl.appendChild(this.dragZoneEl);

    // append the dragHandle to the dragZone if it exists
    if (this.dragHandleEl) {
      this.dragZoneEl.appendChild(this.dragHandleEl);
    }

    // set the start position
    this.clipStartPosition();

    // // set the mode
    // this.setMode();
  }

  clipStartPosition(): void {
    // this.beforeEl.style.clipPath = `inset(0 ${100 - this.start}% 0 0)`;
    // this.afterEl.style.clipPath = `inset(0 0 0 ${this.start}%)`;
    const afterWidth = this.afterEl.getBoundingClientRect().width;
    const clip = {
      top: 0,
      right: afterWidth,
      bottom: 9999,
      left: (this.start * afterWidth) / 100 || afterWidth / 2, //calculate the left position
    };

    this.afterEl.style.clip = `rect(${clip.top}px, ${clip.right}px, ${clip.bottom}px, ${clip.left}px)`;
  }

  /**
   * Initialize the events
   */
  private initEvents(): void {
    // add the event listeners
    // this.wrapperEl.addEventListener('mousemove', this.onMouseMove);
    // this.wrapperEl.addEventListener('mouseleave', this.onMouseLeave);
    // this.wrapperEl.addEventListener('mousedown', this.onMouseDown);
    // this.wrapperEl.addEventListener('mouseup', this.onMouseUp);
    // this.wrapperEl.addEventListener('touchmove', this.onMouseMove);
    // this.wrapperEl.addEventListener('touchend', this.onMouseLeave);
    // this.wrapperEl.addEventListener('touchstart', this.onMouseDown);
    // window.addEventListener('resize', this.onResize);
  }

  /**
   * Initialize the styles
   */
  private initStyles(): void {
    // set the wrapper styles
    this.wrapperEl.classList.add(CLASSNAME);

    // set the before and after styles
    this.beforeEl.classList.add(`${CLASSNAME}__before`);
    this.afterEl.classList.add(`${CLASSNAME}__after`);

    // set the drag handle styles
    if (this.dragHandleEl) {
      this.dragHandleEl.classList.add(`${CLASSNAME}__handle`);
    }

    // set the drag zone styles
    if (this.dragZoneEl) {
      this.dragZoneEl.classList.add(`${CLASSNAME}__drag-zone`);
    }

    // add a style element to the head only once
    if (!document.querySelector(`head style[before-after-slider]`)) {
      const styleEl = document.createElement('style');

      styleEl.setAttribute('before-after-slider', '');

      // label
      this.appendLabelStyles(styleEl);
      // drag-zone
      this.appendDragzoneStyles(styleEl);

      // append the style element to the head
      document.head.appendChild(styleEl);
    }
  }

  private appendLabelStyles(styleEl: HTMLStyleElement): void {
    styleEl.appendChild(
      document.createTextNode(`
      
      /**
       * All labels
       */
      .${CLASSNAME}__before > div,
      .${CLASSNAME}__after > div {
        position: absolute;
        top: 8px;
        color: #fff;
        font-size: 12px;
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
      }

      /**
       * Before Label
       */
      .${CLASSNAME}__before > div {
        left: 8px;
      }

      /**
       * After Label
       */
      .${CLASSNAME}__after > div {
        right: 8px;
      }

      `)
    );
  }

  private appendDragzoneStyles(styleEl: HTMLStyleElement): void {
    if (!this.dragZoneEl) return;

    // todo: extract variables
    const afterWidth = this.afterEl.getBoundingClientRect().width;
    const afterHeight = this.afterEl.getBoundingClientRect().height;
    const dragHandleWidth = this.dragHandleEl?.getBoundingClientRect().width || 10;

    styleEl.appendChild(
      document.createTextNode(`
      
      /**
       * Drag Zone
       */
      .${CLASSNAME}__drag-zone {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: ${afterWidth / 2 - dragHandleWidth / 2}px;
        width: ${dragHandleWidth}px;
        height: ${afterHeight}px;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1;
        cursor: grab;
      }

      /**
       * Drag Zone::before
       */
      .${CLASSNAME}__drag-zone::before {
        top: 0;
        transform: translateX(-50%);
        width: 1px;
        height: 100%;
      }

      /**
       * Drag Zone::after
       */
      .${CLASSNAME}__drag-zone::after {
        top: 50%;
          transform: translate(-50%,-50%);
          width: 5px;
          height: 33%;
          border-radius: 5px;
      }

      /**
       * Drag Zone::before & drag-zone::after
       */
      .${CLASSNAME}__drag-zone::before,
      .${CLASSNAME}__drag-zone::after {
        top: 50%;
          transform: translate(-50%,-50%);
          width: 5px;
          height: 33%;
          border-radius: 5px;
      }
      `)
    );
  }
}
