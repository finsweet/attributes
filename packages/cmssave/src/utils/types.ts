export interface CMSSaveItemProps {
  [fieldKey: string]: string;
}

export interface CMSSaveStore {
  [collectionKey: string]: CMSSaveItemProps[];
}
