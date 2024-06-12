import classNames from "classnames";
import { Source_Sans_3 } from "next/font/google";
import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./TextInput.module.scss";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

const TextInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    {...props}
    ref={ref}
    className={classNames(className, sourceSans.className, styles.textInput)}
  />
));

TextInput.displayName = "TextInput";

export default TextInput;
