import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import Card from "../Card/Card";
import Button from "../Form/Button/Button";
import { Title } from "../Text/Text";
import styles from "./CountDownCard.module.scss";

const CountDownCard: FC<{
  className?: string;
  seconds: number;
  refreshOn?: unknown;
}> = ({ className, seconds: totalSeconds, refreshOn }) => {
  const [currentSeconds, setCurrentSeconds] = useState(totalSeconds);
  const [isStarted, setIsStarted] = useState(false);
  const minutes = Math.floor(currentSeconds / 60);
  const seconds = currentSeconds % 60;

  useEffect(() => {
    setCurrentSeconds(totalSeconds);
    setIsStarted(false);
  }, [refreshOn, totalSeconds]);

  useEffect(() => {
    if (!isStarted) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentSeconds((s) => s - 1);

      if (currentSeconds === 1) {
        setIsStarted(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isStarted, setCurrentSeconds, setIsStarted, currentSeconds]);

  const startCountDown = () => {
    if (currentSeconds === 0) {
      setCurrentSeconds(totalSeconds);
    }
    setIsStarted(true);
  };

  return (
    <Card className={classNames(styles.countDownCard, className)}>
      <Title className={styles.countDown}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Title>
      <Button
        onClick={startCountDown}
        disabled={isStarted && currentSeconds > 0}
        className={styles.startButton}
      >
        Start
      </Button>
    </Card>
  );
};

export default CountDownCard;
