export type ComponentTargetData = {
  target: HTMLElement;
  instance?: string;
  source: URL;
  proxiedSource?: URL;
  loadCSS: boolean;
  autoRender: boolean;
  resetIx: boolean;
};

export type ComponentData = ComponentTargetData & {
  component: HTMLElement;
  shadowRoot?: ShadowRoot;
};
