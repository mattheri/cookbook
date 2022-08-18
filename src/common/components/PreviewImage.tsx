import { Box, IconButton, Image, Spinner } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Hoverable from "./hoverable";
import PreviewImageCompressor from "./PreviewImageCompressor";

interface Props {
  onRemove: () => void;
  file?: File | string;
  onFileCompressed: (file: File) => void;
  fileSizeThreshold?: number;
  compressQuality?: number;
  compressImage?: boolean;
}

const PreviewImage: FC<Props> = ({
  file,
  onRemove,
  onFileCompressed,
  fileSizeThreshold,
  compressQuality,
  compressImage = true,
}) => {
  if (!file) return null;

  return (
    <Hoverable
      position={{ right: 0, top: 0, transform: "translateX(-3rem)" }}
      actionsContainerStyles={{ zIndex: 1 }}
    >
      <Box
        pos="relative"
        w="100%"
        display="grid"
        placeItems="center"
        overflow="hidden"
      >
        <Hoverable.Action>
          <IconButton
            pos="absolute"
            aria-label="remove image"
            onClick={onRemove}
            padding="0"
            fontSize="20px"
            size="lg"
            icon={<AiOutlineCloseCircle />}
            variant="ghost"
          />
        </Hoverable.Action>
        {typeof file === "string" ? (
          <Image src={file} />
        ) : (
          <PreviewImageCompressor
            file={file}
            fileSizeThreshold={fileSizeThreshold}
            onFileCompressed={onFileCompressed}
            compressImage={compressImage}
            compressQuality={compressQuality}
          />
        )}
      </Box>
    </Hoverable>
  );
};

export default PreviewImage;
