import { Box, IconButton, Image } from "@chakra-ui/react";
import { FC } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Hoverable from "./hoverable";
import LoadingAnimation from "./LoadingAnimation";

interface Props {
  onRemove: () => void;
  isLoading: boolean;
  file?: string;
}

const PreviewImage: FC<Props> = ({ file, onRemove, isLoading }) => {
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

        <LoadingAnimation isLoading={isLoading}>
          <Image maxW="80%" src={file} />
        </LoadingAnimation>
      </Box>
    </Hoverable>
  );
};

export default PreviewImage;
