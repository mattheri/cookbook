import useUser from "auth/hooks/UseUser";
import Form from "common/components/form-inputs/Form";
import Modal from "common/components/modals/Modal";
import useInjection from "common/hooks/UseInjection";
import useTranslate from "common/hooks/UseTranslate";
import { storageNamespace } from "storage/i18n/en";
import StorageService from "storage/service/storage-service";
import { CreateStorageModalId } from "common/constants/constants";
import { Button, VStack } from "@chakra-ui/react";
import useModal from "common/components/modals/hooks/UseModal";
import { StorageDTO } from "storage/storage";
import { storageValidationSchema } from "storage/schemas";

const initialValues = {
  name: "",
  shared: false,
  storageImage: {
    url: null,
    name: null,
  },
};

const UpdateStorageModal = () => {
  const storageService = useInjection(StorageService);
  const user = useUser();
  const t = useTranslate(storageNamespace);
  const { close } = useModal(CreateStorageModalId);

  const createNewStorage = async (storage?: StorageDTO) => {
    if (!user) return;

    await storageService.createNewStorage(storage);
  };

  const onSubmit = async (values: typeof initialValues) => {
    await createNewStorage(values);
    close();
  };

  return (
    <Modal id={CreateStorageModalId}>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validation={storageValidationSchema}
      >
        <Modal.Header>{t("actions.create")}</Modal.Header>
        <Modal.Body>
          <VStack>
            <Form.Input id="name" label="Name" />
            <Form.Switch id="shared" label="Shared" />
            <Form.File id="storageImage" />
          </VStack>
        </Modal.Body>
        <Modal.Footer gap="1rem">
          <Form.Submit>{t("actions.add")}</Form.Submit>
          <Button onClick={close} colorScheme="red">
            {t("actions.cancel")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateStorageModal;
