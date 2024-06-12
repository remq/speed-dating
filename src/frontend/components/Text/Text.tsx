import classNames from "classnames";
import { Oswald, Source_Sans_3 } from "next/font/google";
import { FC, PropsWithChildren } from "react";
import styles from "./Text.module.scss";

type TextProps = PropsWithChildren & { className?: string };

const oswald = Oswald({ subsets: ["latin"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export const Title: FC<TextProps> = ({ children, className }) => (
  <h2 className={classNames(oswald.className, styles.title, className)}>
    {children}
  </h2>
);

export const Text: FC<TextProps> = ({ children, className }) => (
  <p className={classNames(sourceSans.className, styles.text, className)}>
    {children}
  </p>
);
