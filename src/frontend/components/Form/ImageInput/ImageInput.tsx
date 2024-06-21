import CameraIcon from "@frontend/components/SVGs/CameraIcon";
import classNames from "classnames";
import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import styles from "./ImageInput.module.scss";

type ImageInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "accept" | "name"
> & { name: string };

const ImageInput = forwardRef(
  (
    { className, ...props }: ImageInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { getValues } = useFormContext();
    const images = getValues(props.name) as FileList;
    const [imagePreview, setImagePreview] = useState<string>();
    useEffect(() => {
      if (!images || !images.length) {
        return setImagePreview(undefined);
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setImagePreview(event.target?.result);
        }
      };
      reader.readAsDataURL(images[0]);
      return () => {
        reader.abort();
      };
    }, [images, setImagePreview]);

    return (
      <label
        className={classNames(
          className,
          styles.imageInput,
          imagePreview && styles.hasPreview
        )}
      >
        {imagePreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Profile image preview"
            className={styles.imagePreview}
            src={imagePreview}
          />
        ) : (
          <CameraIcon className={styles.cameraIcon} />
        )}
        <input
          {...props}
          ref={ref}
          type="file"
          accept="image/*;capture=camera"
          className={classNames(styles.imageInputInput)}
        />
      </label>
    );
  }
);

ImageInput.displayName = "ImageInput";

export default ImageInput;
