import { Box, IconButton, Portal } from "@chakra-ui/react";
import useModal from "common/components/modals/hooks/UseModal";
import { CreateProductModalId } from "common/constants/constants";
import { GiOpenedFoodCan } from "react-icons/gi";

const AddProduct = () => {
  const { open } = useModal(CreateProductModalId);

  return (
    <Portal>
      <Box
        zIndex="2"
        pos="fixed"
        bottom="1rem"
        right="1rem"
        height="5rem"
        width="5rem"
      >
        <IconButton
          colorScheme="red"
          icon={<GiOpenedFoodCan size="2rem" />}
          aria-label="Add products"
          w="100%"
          h="100%"
          rounded="full"
          onClick={open}
        />
      </Box>
    </Portal>
  );
};

export default AddProduct;
