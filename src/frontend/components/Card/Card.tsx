import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import styles from "./Card.module.scss";

const Card: FC<
  PropsWithChildren & { className?: string; isHorizontal?: boolean }
> = ({ children, className, isHorizontal }) => {
  return (
    <div
      className={classNames(
        isHorizontal && styles.isHorizontal,
        styles.card,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
