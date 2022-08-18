import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import Form from "common/components/form-inputs/Form";
import useModal from "common/components/modals/hooks/UseModal";
import Modal from "common/components/modals/Modal";
import { CreateProductModalId } from "common/constants/constants";
import CreateProductForm from "./CreateProductForm";
import Scanner from "./Scanner";

const initialValues = {
  storage: "",
  productName: "",
  productDescription: "",
  upc: "",
  productImage: {
    url: "",
    name: "",
  },
};

const CreateProductModal = () => {
  const { close } = useModal(CreateProductModalId);

  return (
    <Modal id={CreateProductModalId}>
      <Modal.Header>Add product</Modal.Header>
      <Form
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        <Modal.Body>
          <Tabs isFitted variant="enclosed" isLazy>
            <TabList>
              <Tab>Pick</Tab>
              <Tab>Create</Tab>
              <Tab>Scan</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>one</TabPanel>
              <TabPanel>
                <CreateProductForm />
              </TabPanel>
              <TabPanel>
                <Scanner />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button colorScheme="red" onClick={close}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
