import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import styles from "./Layout.module.scss";

const Layout: FC<
  { className?: string; isWide?: boolean } & PropsWithChildren
> = ({ children, className, isWide }) => {
  return (
    <div
      className={classNames(styles.layout, isWide && styles.isWide, className)}
    >
      {children}
    </div>
  );
};

export default Layout;
