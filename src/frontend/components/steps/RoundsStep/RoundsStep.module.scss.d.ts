export type Styles = {
  countDown: string;
  footerContainer: string;
  map: string;
  mapImage: string;
  matches: string;
  roundsStep: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
