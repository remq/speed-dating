export type Styles = {
  foo: string;
  primaryBackgroundColor: string;
  primaryColor: string;
  primaryTextColor: string;
  secondaryBackgroundColor: string;
  secondaryColor: string;
  sizeL: string;
  sizeM: string;
  sizeS: string;
  sizeXL: string;
  sizeXS: string;
  sizeXXS: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
