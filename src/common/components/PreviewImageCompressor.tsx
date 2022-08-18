import { Image, Spinner } from "@chakra-ui/react";
import useCompression from "common/hooks/UseCompression";
import { FC, useEffect, useRef } from "react";

interface Props {
  file: File;
  onFileCompressed: (file: File) => void;
  fileSizeThreshold?: number;
  compressQuality?: number;
  compressImage?: boolean;
}

const PreviewImageCompressor: FC<Props> = ({
  file,
  onFileCompressed,
  fileSizeThreshold,
  compressImage,
  compressQuality,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const {
    file: compressedFile,
    compress,
    isLoading,
  } = useCompression(
    imageRef,
    file,
    fileSizeThreshold,
    compressQuality,
    compressImage
  );

  useEffect(() => {
    if (!isLoading && compressedFile) onFileCompressed(compressedFile);
  }, [compressedFile, isLoading]);
  return (
    <>
      <Image
        ref={imageRef}
        src={URL.createObjectURL(file)}
        maxW="100%"
        h="auto"
        pos="absolute"
        opacity="0"
        onLoad={compress}
        zIndex="-1"
        top="100%"
      />
      {isLoading && <Spinner />}
      {compressedFile && !isLoading && (
        <Image src={URL.createObjectURL(compressedFile)} />
      )}
    </>
  );
};

export default PreviewImageCompressor;
