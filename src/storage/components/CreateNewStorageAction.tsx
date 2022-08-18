import useTranslate from "common/hooks/UseTranslate";
import { storageNamespace } from "storage/i18n/en";
import { MdAddCircleOutline } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import useModal from "common/components/modals/hooks/UseModal";
import { CreateStorageModalId } from "common/constants/constants";

const CreateNewStorageAction = () => {
  const t = useTranslate(storageNamespace);

  const { open } = useModal(CreateStorageModalId);

  return (
    <>
      <Button leftIcon={<MdAddCircleOutline size="2rem" />} onClick={open}>
        {t("actions.create")}
      </Button>
    </>
  );
};

export default CreateNewStorageAction;
