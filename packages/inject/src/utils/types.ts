export type ComponentTargetData = {
  target: Element;
  instance: string | null;
  source?: URL;
  proxiedSource?: URL;
  loadCSS: boolean;
  autoRender: boolean;
  resetIx: boolean;
  positions: number[];
  replace?: boolean;
};

export type ComponentData = ComponentTargetData & {
  component: HTMLElement;
  shadowRoot?: ShadowRoot;
};
