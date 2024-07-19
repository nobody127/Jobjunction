export type TextComponentType = {
  text: string;
  className?: string;
};

export type ThemeStoreType = {
  theme: string;
  toggleTheme: () => void;
};

export type FieldsMarqueeType = {
  field: string;
  jobs: number;
  applied: string;
};
