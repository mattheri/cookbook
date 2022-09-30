import { Image, Spinner } from "@chakra-ui/react";
import useCompression from "common/hooks/UseCompression";
import { FC, useEffect, useRef } from "react";
import LoadingAnimation from "./LoadingAnimation";
import Show from "./Show";

interface Props {
  file: File;
  isLoading: boolean;
}

const PreviewImageCompressor: FC<Props> = ({ file, isLoading }) => {
  return (
    <>
      <LoadingAnimation isLoading={isLoading}>
        <Show condition={!!(file && !isLoading)}>
          <Image src={URL.createObjectURL(file)} />
        </Show>
      </LoadingAnimation>
    </>
  );
};

export default PreviewImageCompressor;
