const DEFAULT_MAX_SIZE = 1024;

export const shrinkImage = async (
  source: File,
  maxSize: number = DEFAULT_MAX_SIZE
): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      var img = document.createElement("img");
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = height * (maxSize / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = width * (maxSize / height);
            height = maxSize;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d")!;
        context.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject();
            }
          },
          "image/jpeg",
          0.8
        );
      };

      if (typeof event.target?.result === "string") {
        img.src = event.target.result;
      } else {
        reject();
      }
    };
    reader.readAsDataURL(source);
  });
