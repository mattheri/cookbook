import { IconButton } from "@chakra-ui/react";
import useTranslate from "common/hooks/UseTranslate";
import { FC } from "react";
import { storageNamespace } from "storage/i18n/en";
import { MdDelete } from "react-icons/md";
import useDeleteStorage from "storage/hooks/UseDeleteStorage";

interface Props {
  storageId: string;
  storageName: string;
}

const DeleteStorageAction: FC<Props> = ({ storageId, storageName }) => {
  const t = useTranslate(storageNamespace);
  const deleteStorage = useDeleteStorage(storageId);

  return (
    <IconButton
      aria-label={`${t("actions.deleteWithName", { name: storageName })}`}
      icon={<MdDelete />}
      onClick={deleteStorage}
      variant="ghost"
    />
  );
};

export default DeleteStorageAction;
