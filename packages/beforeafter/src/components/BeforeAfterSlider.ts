import { addListener } from '@finsweet/attributes-utils';

export interface OptionsType {
  beforeElement: HTMLElement;
  afterElement: HTMLElement;
  handleElement?: HTMLElement | null;
  mode?: 'drag' | 'hover';
}
export class BeforeAfterSlider {
  // Properties
  private wrapper: HTMLElement;
  protected beforeElement: HTMLElement;
  private afterElement: HTMLElement;
  private handleElement?: HTMLElement | null;
  private mode?: 'drag' | 'hover';
  // Events
  private isDragging: boolean;
  private cursorX: number;
  private cursorOffsetX: number;

  /**
   * Creates an instance of BeforeAfterSlider.
   * @param wrapper The wrapper element
   * @param options The options object
   */
  constructor(wrapper: HTMLElement, options: OptionsType) {
    this.isDragging = false;
    this.cursorX = 0;
    this.cursorOffsetX = 0;

    this.wrapper = wrapper;
    this.beforeElement = options.beforeElement;
    this.afterElement = options.afterElement;
    this.handleElement = options.handleElement;
    this.mode = options.mode;
  }

  /**
   * Inits the BeforeAfterSlider.
   */
  init() {
    const wrapperWidth = this.wrapper.getBoundingClientRect().width;
    const wrapperHeight = this.wrapper.getBoundingClientRect().height;

    // style `before` label
    const beforeLabel = this.beforeElement.querySelector('div') as HTMLElement;
    if (beforeLabel) {
      beforeLabel.style.position = 'absolute';
      beforeLabel.style.top = '8px';
      beforeLabel.style.left = '8px';
      beforeLabel.style.color = 'white';
      beforeLabel.style.textShadow = '0 0 4px rgba(0,0,0,0.5)'; // (x-offset, y-offset, blur, color)
      beforeLabel.style.fontSize = '14px';
    }

    // style `after` label
    const afterLabel = this.afterElement.querySelector('div') as HTMLElement;
    if (afterLabel) {
      afterLabel.style.position = 'absolute';
      afterLabel.style.top = '8px';
      afterLabel.style.right = '8px';
      afterLabel.style.color = 'white';
      afterLabel.style.textShadow = '0 0 4px rgba(0,0,0,0.8)'; // (x-offset, y-offset, blur, color)
      afterLabel.style.fontSize = '14px';
    }

    // Clip the `after` element
    this.afterElement.style.clip = `rect(0px, ${wrapperWidth}px, 9999px, ${wrapperWidth / 2}px)`;

    // Position the handle to the center of the wrapper
    if (this.handleElement) {
      this.wrapper.style.display = 'flex';
      this.wrapper.style.justifyContent = 'center';
      this.wrapper.style.alignItems = 'center';

      // Teleport the handle to inside the wrapper
      this.wrapper.appendChild(this.handleElement);

      // Position the handle to the center of the wrapper
      this.handleElement.style.cursor = 'grab';
      //z-index
      this.handleElement.style.zIndex = '2'; // just in case
    }

    // Add event listeners
    if (this.handleElement) {
      console.log('mode: ', this.mode);
      // Grab
      addListener(this.handleElement, 'touchstart', this.handleTouchHold);
      if (this.mode === 'hover') {
        addListener(this.handleElement, 'mouseenter', this.handleMouseDown);
      } else {
        addListener(this.handleElement, 'mousedown', this.handleMouseDown);
      }

      // Drag
      addListener(this.handleElement, 'mousemove', this.handleMouseMove);
      addListener(this.handleElement, 'touchmove', this.handleTouchMove);

      // Release
      addListener(this.handleElement, 'touchend', this.handleMouseUp);
      if (this.mode === 'hover') {
        addListener(this.handleElement, 'mouseleave', this.handleMouseUp);
      } else {
        addListener(this.handleElement, 'mouseup', this.handleMouseUp);
      }
    }

    return this;
  }

  // Mouse Down
  handleMouseDown = (e: MouseEvent) => {
    // e.preventDefault();
    this.isDragging = true;
    this.cursorX = e.clientX;
    this.handleElement.style.cursor = 'grabbing';
    console.log('mouseDown');
  };

  // Touch Hold
  handleTouchHold = (e: TouchEvent) => {
    // e.preventDefault();
    this.isDragging = true;
    // Get the horizontal coordinate of the touch
    this.cursorX = e.touches[0].clientX;
    this.handleElement.style.cursor = 'grabbing';
    console.log('touchHold');
  };

  // Mouse Move
  handleMouseMove = (e: MouseEvent) => {
    // e.preventDefault();
    if (!this.isDragging) return;
    const newX = e.clientX - this.cursorX;
    this.cursorOffsetX = e.clientX - newX;
    this.handleElement.style.transform = `translateX(${newX}px)`;
    console.log('mouseMove');
  };

  // Touch Move
  handleTouchMove = (e: TouchEvent) => {
    // e.preventDefault();
    if (!this.isDragging) return;
    const newX = e.touches[0].clientX - this.cursorX;
    this.cursorOffsetX = e.touches[0].clientX - newX;
    this.handleElement.style.transform = `translateX(${newX}px)`;
    console.log('touchMove');
  };

  // Mouse Up
  handleMouseUp = (e: MouseEvent | TouchEvent) => {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.handleElement.style.cursor = 'grab';
    console.log('mouseUp');
  };
}
