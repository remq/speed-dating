export type Styles = {
  isWide: string;
  layout: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
