import { Avatar, Button, ButtonGroup } from "@chakra-ui/react";
import SignoutButton from "auth/components/SignoutButton";
import useUser from "auth/hooks/UseUser";
import useTranslate from "common/hooks/UseTranslate";
import { CgProfile } from "react-icons/cg";

const ProfileButton = () => {
  const user = useUser();
  const t = useTranslate();

  return (
    <ButtonGroup isAttached>
      <Button
        leftIcon={
          user?.photoURL ? (
            <Avatar
              size="xs"
              name={user.displayName || ""}
              src={user?.photoURL}
            />
          ) : (
            <CgProfile />
          )
        }
      >
        {t("profile")}
      </Button>
      <SignoutButton />
    </ButtonGroup>
  );
};

export default ProfileButton;
