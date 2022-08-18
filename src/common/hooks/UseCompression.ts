import { FileWithSrc } from "common/components/form-inputs/FileInput";
import { RefObject, useRef, useState, startTransition } from "react";

const useCompression = (
  imageRef: RefObject<HTMLImageElement>,
  file: FileWithSrc,
  fileSizeThreshold: number = 50000,
  compressionQuality: number = 60,
  compressImage: boolean = true
) => {
  const [compressedSrc, setCompressedSrc] = useState<null | string>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const compression = useRef(false);
  const quality = useRef(compressionQuality);

  const compress = () => {
    if (compressedFile && compressedFile.name !== file.name)
      compression.current = false;
    if (compression.current) setIsLoading(false);
    if (!imageRef.current || !file || compression.current) return;
    if (file.size < fileSizeThreshold || !compressImage) return file;

    setIsLoading(true);

    const canvas = document.createElement("canvas");
    const image = imageRef.current;
    const context = canvas.getContext("2d");
    const factor = quality.current / 100;
    const factoredDimensions = {
      w: image.width * factor,
      h: image.height * factor,
    };

    canvas.width = factoredDimensions.w;
    canvas.height = factoredDimensions.h;

    context?.drawImage(image, 0, 0, factoredDimensions.w, factoredDimensions.h);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const newFile = new File([blob], file.name, { type: "image/jpeg" });

          if (newFile.size > fileSizeThreshold) {
            quality.current = quality.current - 1;
            compress();
          } else {
            compression.current = true;
            setCompressedFile(newFile);
            setCompressedSrc(URL.createObjectURL(blob));
          }
        }
      },
      "image/jpeg",
      factor
    );
  };

  return {
    src: compressedSrc,
    file: compressedFile,
    compress,
    isLoading,
  };
};

export default useCompression;
