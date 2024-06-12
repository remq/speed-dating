export type Styles = {
  footer: string;
  name: string;
  profileImage: string;
  userSwipingCard: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
