import classNames from "classnames";
import {
  FC,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styles from "./Modal.module.scss";

const Modal: FC<
  { onRequestClose: () => void; className?: string } & PropsWithChildren
> = ({ onRequestClose, className, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onRequestClose]);

  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (ref.current && ref.current === event?.target) {
        onRequestClose();
      }
    },
    [onRequestClose]
  );

  return (
    <div
      className={classNames(className, styles.modal)}
      onClick={handleOnClick}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Modal;
