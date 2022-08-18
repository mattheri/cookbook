import { Menu, MenuButton, MenuList, Button } from "@chakra-ui/react";
import Nav from "common/components/nav/Nav";
import ProfileButton from "common/components/ProfileButton";
import useTranslate from "common/hooks/UseTranslate";
import { storageNamespace } from "storage/i18n/en";
import CreateNewStorageAction from "./CreateNewStorageAction";

const StorageActions = () => {
  const t = useTranslate(storageNamespace);

  return (
    <>
      <Nav.Start>{t("storage")}</Nav.Start>
      <Nav.Middle>
        <CreateNewStorageAction />
      </Nav.Middle>
      <Nav.End>
        <ProfileButton />
      </Nav.End>
    </>
  );
};

export default StorageActions;
