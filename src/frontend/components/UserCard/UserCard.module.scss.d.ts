export type Styles = {
  image: string;
  name: string;
  userCard: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
