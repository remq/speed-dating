export type Styles = {
  countDown: string;
  countDownCard: string;
  startButton: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
