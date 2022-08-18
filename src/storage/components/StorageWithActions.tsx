import { Avatar, Box, Flex, Heading, Image } from "@chakra-ui/react";
import GoToAction from "common/components/GoToAction";
import Hoverable from "common/components/hoverable";
import { FC } from "react";
import { Storage } from "storage/storage";
import DeleteStorageAction from "./DeleteStorageAction";
import EditStorageAction from "./EditStorageAction";

interface Props {
  storage: Storage;
}

const StorageWithActions: FC<Props> = ({ storage }) => {
  return (
    <Hoverable actionsContainerStyles={{ zIndex: 1 }}>
      <Hoverable.Action>
        <DeleteStorageAction
          storageId={storage._id}
          storageName={storage.name}
        />
      </Hoverable.Action>
      <Hoverable.Action>
        <EditStorageAction storage={storage} />
      </Hoverable.Action>
      <GoToAction to={storage._id} label="Go to storage" />
      <Box
        p="2rem"
        boxShadow="base"
        borderRadius="0.5rem"
        overflow="hidden"
        pos="relative"
        display="flex"
      >
        <Heading>{storage.name}</Heading>
        <Box
          maxW="5rem"
          h="100%"
          ml="auto"
          pos="absolute"
          right="0"
          top="0"
          display="flex"
          alignItems="center"
        >
          {storage.storageImage && storage.storageImage.url && (
            <Image src={storage.storageImage.url} objectFit="cover" />
          )}
        </Box>
      </Box>
    </Hoverable>
  );
};

export default StorageWithActions;
