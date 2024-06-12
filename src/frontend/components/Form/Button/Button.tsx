import classNames from "classnames";
import { Source_Sans_3 } from "next/font/google";
import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(className, sourceSans.className, styles.button)}
    >
      {children}
    </button>
  );
};

export default Button;
