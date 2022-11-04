interface AttributeChangeset {
  version: `v${number}.${number}.${number}` | `v${number}.${number}.${number}-beta.${number}`;
  markdown: string;
}

export type AttributeChangesets = AttributeChangeset[];
