import { addListener, normalizeNumber } from '@finsweet/attributes-utils';

import { type BeforeAfterSliderOptions, DEFAULTS, ELEMENTS, SETTINGS } from '../utils';

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
  private dragZoneWidth = 100;

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
    this.dragZoneWidth = parseInt(DEFAULTS.dragzoneWidth) ?? this.dragHandleEl?.getBoundingClientRect().width;
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

    // const dragHandleWidth = this.dragHandleEl?.getBoundingClientRect().width ?? 50;

    // append the dragHandle to the dragZone if it exists
    if (this.dragHandleEl) {
      this.dragZoneEl.appendChild(this.dragHandleEl);
    }

    // set the drag zone width
    this.dragZoneEl.style.width = `${this.dragZoneWidth}px`;
    // clip at the start position
    const afterWidth = this.afterEl.getBoundingClientRect().width;
    const clip = {
      right: afterWidth,
      left: (this.start * afterWidth) / 100 || afterWidth / 2, //calculate the left position
    };

    // console.log('dragHandleWidth', dragHandleWidth);

    // this.dragZoneEl.style.width = `${dragHandleWidth}px`;
    this.dragZoneEl.style.width = DEFAULTS.dragzoneWidth;
    console.log('this.dragZoneEl.style.width', this.dragZoneEl.style.width);
    this.dragZoneEl.style.left = `${clip.left - this.dragZoneWidth / 2}px`;
    console.log('this.dragZoneEl.style.left', this.dragZoneEl.style.left);

    // append the dragZone to the wrapper
    this.wrapperEl.appendChild(this.dragZoneEl);

    this.clipAtPosition(clip);

    // // set the mode
    // this.setMode();
  }

  clipAtPosition(rect: { top?: number; right: number; bottom?: number; left: number }): void {
    this.afterEl.style.clip = `rect(${rect.top ?? '0'}px, ${rect.right}px, ${rect.bottom ?? '9999'}px, ${rect.left}px)`;
  }

  /**
   * Initialize the events
   */
  private initEvents(): void {
    // add the event listeners
    addListener(this.wrapperEl, 'mouseenter', (e: MouseEvent) => {
      if (this.interactionMode === 'hover') {
        this.onWrapperEnter(e);
      }
    });
    addListener(this.wrapperEl, 'mouseleave', (e: MouseEvent) => {
      if (this.interactionMode === 'hover') {
        this.onWrapperLeave(e);
      }
    });
    addListener(this.wrapperEl, 'mousedown', (e: MouseEvent) => {
      // check if target is the drag zone or is a child of the drag zone
      if (e.target === this.dragZoneEl || this.dragZoneEl?.contains(e.target as Node)) {
        this.onDragZoneGrab(e);
      }
    });
    addListener(this.wrapperEl, 'mouseup', (e: MouseEvent) => {
      if (e.target === this.dragZoneEl || this.dragZoneEl?.contains(e.target as Node)) {
        this.onDragZoneRelease(e);
      }
    });

    addListener(this.wrapperEl, 'mousemove', (e: MouseEvent) => {
      if (this.interactionMode === 'hover') {
        this.onWrapperHoverDrag(e);
      } else if (e.target === this.dragZoneEl || this.dragZoneEl?.contains(e.target as Node)) {
        this.onDragZoneDrag(e);
      }
    });
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
   * Handle the drag zone grab event
   */
  private onDragZoneGrab = (e: MouseEvent | TouchEvent): void => {
    this.isDragging = true;
    this.cursorPosition = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    this.dragZoneEl?.classList.add('grabbing');
  };

  /**
   * Handle the drag zone release event
   */
  private onDragZoneRelease = (e: MouseEvent | TouchEvent): void => {
    this.isDragging = false;
    this.dragZoneEl?.classList.remove('grabbing');
  };

  /**
   * Handle the drag zone drag event
   */
  private onDragZoneDrag = (e: MouseEvent | TouchEvent): void => {
    if (!this.isDragging || !this.dragZoneEl) return;

    const { width } = this.afterEl.getBoundingClientRect();

    this.dragZoneEl.style.left =
      parseInt(this.dragZoneEl.style.left) +
      ((e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - this.cursorPosition) +
      'px';
    this.cursorPosition = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    // this.start = (parseInt(this.dragHandleEl.style.left) / width) * 100;
    // this.clipAtStartPosition();

    const clip = {
      top: 0,
      right: width,
      bottom: 9999,
      left: this.dragZoneEl.getBoundingClientRect().width / 2 + parseInt(this.dragZoneEl.style.left), //calculate the left position
    };
    this.clipAtPosition(clip);
  };

  /**
   * Handle the hover event
   */
  private onWrapperEnter = (e: MouseEvent | TouchEvent): void => {
    this.isDragging = true;
    this.cursorPosition = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

    //get mouse cursor position in relation to the element
    const rect = this.wrapperEl.getBoundingClientRect();
    this.cursorOffset = this.cursorPosition - rect.left;

    // const dragHandleWidth = this.dragHandleEl?.getBoundingClientRect().width ?? 50;

    // Set the initial position of dragZoneEl to where the mouse entered
    if (this.dragZoneEl) {
      this.dragZoneEl.style.left = `${this.cursorOffset - this.dragZoneWidth / 2}px`;
    }
  };

  /**
   * Handle the drag on hover event
   */
  private onWrapperLeave = (e: MouseEvent | TouchEvent): void => {
    this.isDragging = false;
  };

  /**
   * Handle the drag on hover event
   */
  private onWrapperHoverDrag = (e: MouseEvent | TouchEvent): void => {
    if (!this.isDragging || !this.dragZoneEl) return;
    const { width } = this.afterEl.getBoundingClientRect();

    this.dragZoneEl.style.left =
      parseInt(this.dragZoneEl.style.left) +
      ((e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - this.cursorPosition) +
      'px';
    this.cursorPosition = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    // this.start = (parseInt(this.dragHandleEl.style.left) / width) * 100;
    // this.clipAtStartPosition();

    const clip = {
      top: 0,
      right: width,
      bottom: 9999,
      left: this.dragZoneEl.getBoundingClientRect().width / 2 + parseInt(this.dragZoneEl.style.left), //calculate the left position
    };
    this.clipAtPosition(clip);
  };

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

      // wrapper
      this.appendWrapperStyles(styleEl);
      // label
      this.appendLabelStyles(styleEl);
      // drag-zone
      this.appendDragzoneStyles(styleEl);

      // append the style element to the head
      document.head.appendChild(styleEl);
    }
  }

  private appendWrapperStyles(styleEl: HTMLStyleElement): void {
    styleEl.appendChild(
      document.createTextNode(`
      
      /**
       * Wrapper
       */
      .${CLASSNAME} {
        position: relative;
        overflow: hidden;
        user-select: none;
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none;    /* Firefox */
        -ms-user-select: none;     /* IE/Edge */
      }

      .${CLASSNAME} .grabbing {
        cursor: grabbing!important;
      }

      `)
    );
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
    // const dragHandleWidth = this.dragHandleEl?.getBoundingClientRect().width || 10;

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
        left: ${afterWidth / 2 - this.dragZoneWidth / 2}px;
        // width: ${this.dragZoneWidth}px;
        height: ${afterHeight}px;
        background: ${DEFAULTS.dragzoneBackground ?? 'rgba(0, 0, 0, 0.0)'};
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
