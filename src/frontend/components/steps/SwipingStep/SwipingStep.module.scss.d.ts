export type Styles = {
  controls: string;
  dontKnowButton: string;
  knowButton: string;
  swipingStep: string;
  tinderCard: string;
  tinderCardsContainer: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
