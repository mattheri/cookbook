import { Box, HStack, VStack } from "@chakra-ui/react";
import Form from "common/components/form-inputs/Form";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import useStorages from "storage/hooks/UseStorages";

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

  const $values = values as Record<string, any>;
  const storageValue = $values.storage;
  const quantityValue = $values.quantity;

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
    <VStack>
      <Form.Input id="productName" label="Product name" isRequired />
      <Form.Number id="quantity" label="Quanity" type="number" />
      <Form.Input id="upc" label="Barcode" />
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
  );
};

export default CreateProductForm;
