import { IconButton } from "@chakra-ui/react";
import useModal from "common/components/modals/hooks/UseModal";
import useTranslate from "common/hooks/UseTranslate";
import { FC } from "react";
import { MdModeEdit } from "react-icons/md";
import { storageNamespace } from "storage/i18n/en";
import { EditStorageModalId } from "common/constants/constants";
import { Storage } from "storage/storage";

interface Props {
  storage: Storage;
}

const EditStorageAction: FC<Props> = ({ storage }) => {
  const t = useTranslate(storageNamespace);
  const { open, provideContext } = useModal(EditStorageModalId);

  const onEdit = () => {
    provideContext(storage);
    open();
  };

  return (
    <IconButton
      icon={<MdModeEdit />}
      aria-label={t("actions.edit")}
      onClick={onEdit}
      variant="ghost"
    />
  );
};

export default EditStorageAction;
