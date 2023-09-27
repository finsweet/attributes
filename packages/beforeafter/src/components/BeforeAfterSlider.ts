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
  private mover: HTMLElement;

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

    this.mover = document.createElement('div') as HTMLElement;
  }

  /**
   * Inits the BeforeAfterSlider.
   */
  init() {
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

    // todo: elsH[i] => this.handleElement
    const wrapperWidth = this.wrapper.getBoundingClientRect().width;
    const moverWidth = this.handleElement?.getBoundingClientRect().width ?? 0;

    const { width, height } = this.afterElement.getBoundingClientRect();

    if (this.handleElement) {
      // this.handleElement.style.left = `${width / 2 - moverWidth / 2}px`;
      // this.handleElement?.style.top = `${height / 2 - moverWidth / 2}px`;
      // this.handleElement.style.position = 'absolute';
      // this.wrapper.appendChild(this.handleElement);

      // create a new element inside the wrapper
      this.mover.style.position = 'absolute';
      this.mover.style.display = 'flex';
      this.mover.style.justifyContent = 'center';
      this.mover.style.alignItems = 'center';
      this.mover.style.top = `0px`;
      this.mover.style.left = `${width / 2 - moverWidth / 2}px`;
      this.mover.style.width = `${moverWidth}px`;
      this.mover.style.height = `${height}px`;
      this.mover.style.background = 'rgba(255,255,255,0)';
      this.mover.style.zIndex = '200';

      this.wrapper.appendChild(this.mover);

      // append the handle to the mover
      this.mover.appendChild(this.handleElement);

      // add class to the handle and modify class to have :after and :before pseudo elements
      this.mover.classList.add('mover');
      // modify :before and :after pseudo elements
      const style = document.createElement('style');
      style.innerHTML = `
        .mover::before {
          top: 0;
          transform: translateX(-50%);
          width: 1px;
          height: 100%;
        }
        .mover::after {
          top: 50%;
          transform: translate(-50%,-50%);
          width: 5px;
          height: 33%;
          border-radius: 5px;
        }
        .mover::before,
        .mover::after {
          position: absolute;
          left: 50%;
          content: '';
          // background: #fff;
          cursor: --webkit-grab;
          cursor: grab;
        }
      `;
      this.wrapper.appendChild(style);
    }

    // Clip the `after` element since its on top of the `before` element
    this.afterElement.style.clip = `rect(0px, ${width}px, 9999px, ${width / 2}px)`;

    // Position the handle to the center of the wrapper
    // if (this.handleElement) {
    //   this.wrapper.style.display = 'flex';
    //   this.wrapper.style.justifyContent = 'center';
    //   this.wrapper.style.alignItems = 'center';

    //   // Teleport the handle to inside the wrapper
    //   this.wrapper.appendChild(this.handleElement);

    //   // Position the handle to the center of the wrapper
    //   this.handleElement.style.cursor = 'grab';
    //   //z-index
    //   this.handleElement.style.zIndex = '2'; // just in case
    // }

    // Add event listeners
    if (this.handleElement) {
      console.log('mode: ', this.mode);
      // Grab
      addListener(this.mover, 'touchstart', this.handleTouchStart);
      if (this.mode === 'hover') {
        // is hover mode
        addListener(this.mover, 'mouseenter', this.handleMouseDown);
      } else {
        // is drag mode
        addListener(this.mover, 'mousedown', this.handleMouseDown);
      }

      // Drag
      addListener(this.mover, 'mousemove', this.handleMouseMove);
      addListener(this.mover, 'touchmove', this.handleTouchMove);

      // Release
      addListener(this.mover, 'touchend', this.handleMouseUp);
      if (this.mode === 'hover') {
        // is hover mode
        addListener(this.mover, 'mouseleave', this.handleMouseUp);
      } else {
        // is drag mode
        addListener(this.mover, 'mouseup', this.handleMouseUp);
      }
    }

    addListener(window, 'resize', this.handleResize);

    return this;
  }

  // Mouse Down
  handleMouseDown = (e: MouseEvent) => {
    // e.preventDefault();
    this.isDragging = true;
    this.cursorX = e.clientX;
    this.mover.style.cursor = 'grabbing';
    console.log(`mouseDown:
    this.cursorX = e.clientX; //${e.clientX};
    console.log(this.cursorX) //${this.cursorX}`);
  };

  // Mouse Move
  handleMouseMove = (e: MouseEvent) => {
    const { width } = this.afterElement.getBoundingClientRect();
    if (!this.isDragging) return;
    // this.mover.style.cursor = 'grabbing';
    this.mover.style.left = parseInt(this.mover.style.left) + (e.clientX - this.cursorX) + 'px';
    this.cursorX = e.clientX;
    this.afterElement.style.clip = `rect(0px, ${width}px, 9999px, ${this.mover.getBoundingClientRect().width / 2 + parseInt(this.mover.style.left)
      }px)`;
  };

  // handleMouseMove = (e: MouseEvent) => {
  //   e.preventDefault();
  //   if (!this.isDragging) return;
  //   const offsetX = e.clientX - this.cursorX; // current mouse position - initial mouse position (offset)
  //   // this.cursorX = e.clientX; // update initial mouse position to current mouse position
  //   this.wrapper.style.left = parseInt(this.wrapper.style.left) + (e.clientX - X) + 'px';
  //   this.cursorOffsetX = e.clientX - offsetX; // current mouse position - offset
  //   this.handleElement.style.transform = `translateX(${this.cursorOffsetX}px)`;
  //   console.warn(`mouseMove:
  //   const newX = e.clientX - this.cursorX; // (${e.clientX} - ${this.cursorX} = ${newX})
  //   this.cursorOffsetX = e.clientX - newX; // (${e.clientX} - ${newX} = ${this.cursorOffsetX})
  //   this.handleElement.style.transform = 'translateX(\${newX}px)'; // transform: 'translateX(${newX}px)'
  //   `);
  // };

  // Mouse Up
  handleMouseUp = (e: MouseEvent | TouchEvent) => {
    // e.preventDefault();
    // if (!this.isDragging) return;
    this.isDragging = false;
    this.handleElement.style.cursor = 'grab';
    console.log('mouseUp', {
      cursorX: this.cursorX,
      cursorOffsetX: this.cursorOffsetX,
    });
  };

  // Touch Start
  handleTouchStart = (e: TouchEvent) => {
    // e.preventDefault();
    this.isDragging = true;
    // Get the horizontal coordinate of the touch
    this.cursorX = e.touches[0].clientX;
    this.handleElement.style.cursor = 'grabbing';
    console.log('touchStart');
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

  // Touch End
  handleTouchEnd = (e: TouchEvent) => {
    // e.preventDefault();
    this.isDragging = false;
    this.handleElement.style.cursor = 'grab';
    console.log('touchEnd');
  };

  handleResize = () => {
    const moverWidth = this.mover.getBoundingClientRect().width;
    const { width } = this.afterElement.getBoundingClientRect();
    const { height } = this.afterElement.getBoundingClientRect();
    this.mover.style.left = width / 2 - moverWidth / 2 + 'px';
    // mine move
    // this.afterElement.style.clip = `rect(0px, ${width}px, ${this.mover.getBoundingClientRect().height}px, ${this.mover.getBoundingClientRect().width / 2 + parseInt(this.mover.style.left)
    // mine resize
    this.afterElement.style.clip = `rect(0px, ${width}px, ${height}px,${width / 2}px)`; // rect(top, right, bottom, left

    // theirs move
    // this.nextElementSibling.style.clip = "rect(0px, " + (this.getBoundingClientRect().width / 2 + parseInt(this.style.left)) + "px, " + this.getBoundingClientRect().height + "px, 0px)";
    // }
    // theirs resize
    // imgLeft.style.clip = "rect(0px, " + width / 2 + "px, " + height + "px, 0px)";
  };
}
