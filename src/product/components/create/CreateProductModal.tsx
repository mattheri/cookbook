import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Form from "common/components/form-inputs/Form";
import { CreateProductModalId } from "common/constants/constants";
import CreateProductForm from "./CreateProductForm";
import PickProductForm from "./PickProductForm";
import Scanner from "barcode-scanner/components/Scanner";
import SlidingScreen from "common/components/sliding-screen/SlidingScreen";

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
  return (
    <SlidingScreen id={CreateProductModalId}>
      <Form
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        <Tabs isFitted variant="enclosed" isLazy>
          <TabList>
            <Tab>Pick</Tab>
            <Tab>Create</Tab>
            <Tab>Scan</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PickProductForm />
            </TabPanel>
            <TabPanel>
              <CreateProductForm />
            </TabPanel>
            <TabPanel>
              <Scanner />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Form>
    </SlidingScreen>
  );
};

export default CreateProductModal;
