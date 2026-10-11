export type AdditionalIconOptions = {
  src: string;
  sizes?: number[];
  type?: 'image/png' | 'image/jpeg' | 'image/webp';
  sourceType?: string;
  purpose?: string;
  includeOriginal?: boolean;
  quality?: number;
};

export type IconsOptions = {
  sizes?: number[];
  type?: 'image/png' | 'image/jpeg' | 'image/webp';
  sourceType?: string;
  purpose?: string;
  includeOriginal?: boolean;
  quality?: number;
  additionalIcons?: AdditionalIconOptions[];
};
