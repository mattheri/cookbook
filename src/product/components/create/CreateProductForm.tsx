import { Box, Button, Container, Flex, HStack, VStack } from "@chakra-ui/react";
import Form from "common/components/form-inputs/Form";
import SuspenseWithLoading from "common/components/SuspenseWithLoading";
import { useFormikContext } from "formik";
import React, { lazy, useEffect, useState } from "react";
import useStorages from "storage/hooks/UseStorages";

const Scanner = lazy(() => import("barcode-scanner/components/Scanner"));

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

const CreateProductForm = () => {
  const storages = useStorages();
  const { values, setValues } = useFormikContext();
  const [isScanning, setIsScanning] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  const handleScan = () => setIsScanning(!isScanning);

  const $values = values as Record<string, any>;
  const storageValue = $values.storage;
  const quantityValue = $values.quantity;

  const onScan = (newCode: string) => {
    setCode(newCode);
    setValues({ ...$values, upc: newCode });
    handleScan();
  };

  useEffect(() => {
    setValues({
      ...$values,
      [`${storageValue}Quantity`]: quantityValue,
    });
  }, [quantityValue]);

  useEffect(() => {
    setValues({
      ...$values,
      storage: storages[0]._id,
    });
  }, [storages]);

  return (
    <Container>
      <VStack>
        <Form.Input id="productName" label="Product name" isRequired />
        <Form.Number id="quantity" label="Quanity" type="number" />
        <Flex w="100%" gap=".5rem">
          <Form.Input id="upc" label="Barcode" />
          <Button alignSelf="flex-end" onClick={handleScan}>
            {isScanning ? "Stop" : "Scan"}
          </Button>
        </Flex>
        {isScanning && (
          <SuspenseWithLoading>
            <Scanner onScan={onScan} useCodeDrawer={false} />
          </SuspenseWithLoading>
        )}
        <Form.File id="productImage" />
        <HStack>
          <Form.Select
            id="storage"
            options={storages.map((s) => ({
              value: s._id,
              label: s.name,
            }))}
            label="Add item to storage:"
          />
          <Form.Number
            id={`${storageValue}Quantity`}
            label="Quantity"
            max={Number(quantityValue)}
          />
        </HStack>
      </VStack>
    </Container>
  );
};

export default CreateProductForm;
