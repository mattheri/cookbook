import { Button, VStack } from "@chakra-ui/react";
import Form from "common/components/form-inputs/Form";
import useModal from "common/components/modals/hooks/UseModal";
import Modal from "common/components/modals/Modal";
import { EditStorageModalId } from "common/constants/constants";
import useInjection from "common/hooks/UseInjection";
import useTranslate from "common/hooks/UseTranslate";
import { useEffect, useState } from "react";
import { storageNamespace } from "storage/i18n/en";
import { storageValidationSchema } from "storage/schemas";
import StorageService from "storage/service/storage-service";
import { Storage, StorageDTO } from "storage/storage";

const DEFAULT_STORAGE_VALUE = {
  name: "",
  shared: false,
  storageImage: {
    url: null,
    name: null,
  },
};

const EditStorageModal = () => {
  const [storage, setStorage] = useState<StorageDTO>(DEFAULT_STORAGE_VALUE);
  const { currentContext, close } = useModal<Storage>(EditStorageModalId);
  const t = useTranslate(storageNamespace);
  const storageService = useInjection(StorageService);

  useEffect(() => {
    if (Object.keys(currentContext).length) setStorage(currentContext);
  }, [currentContext]);

  const onSubmit = async (values: typeof storage) => {
    if (!storage._id) return;

    storageService.updateStorage(storage._id, values);
    close();
  };

  const cancelAction = () => {
    setStorage(DEFAULT_STORAGE_VALUE);
    close();
  };

  return (
    <Modal id={EditStorageModalId}>
      <Modal.Header>
        {t("actions.editWithName", { name: storage.name })}
      </Modal.Header>
      <Form
        initialValues={{
          name: storage.name,
          shared: storage.shared,
          storageImage: { url: null, name: null },
        }}
        onSubmit={onSubmit}
        validation={storageValidationSchema}
      >
        <Modal.Body>
          <VStack>
            <Form.Input id="name" label={t("form.labels.name")} />
            <Form.Switch id="shared" label="Shared" />
            <Form.File
              id="storageImage"
              src={storage.storageImage?.url || ""}
              name={storage.storageImage?.name || ""}
            />
          </VStack>
        </Modal.Body>
        <Modal.Footer gap="1rem">
          <Form.Submit>Edit</Form.Submit>
          <Button colorScheme="red" onClick={cancelAction}>
            {t("actions.cancel")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditStorageModal;
