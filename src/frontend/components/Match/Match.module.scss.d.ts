export type Styles = {
  image: string;
  match: string;
  name: string;
  table: string;
  tableLabel: string;
  tableNumber: string;
  user: string;
  users: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
