import { addListener } from '@finsweet/attributes-utils';

export interface OptionsType {
  beforeElement: HTMLElement;
  afterElement: HTMLElement;
  handleElement?: HTMLElement | null;
}
export class BeforeAfterSlider {
  private wrapper: HTMLElement;
  private beforeElement: HTMLElement;
  private afterElement: HTMLElement;
  private handleElement?: HTMLElement | null;
  constructor(wrapper: HTMLElement, options: OptionsType) {
    this.wrapper = wrapper;
    this.beforeElement = options.beforeElement;
    this.afterElement = options.afterElement;
    this.handleElement = options.handleElement;
  }

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
      afterLabel.style.textShadow = '0 0 4px rgba(0,0,0,0.5)'; // (x-offset, y-offset, blur, color)
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
  }
}
