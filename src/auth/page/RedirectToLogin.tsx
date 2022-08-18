import { Grid, Heading } from "@chakra-ui/react";
import useTranslate from "common/hooks/UseTranslate";

const height = "100vh";
const pItems = "center";
const tAlign = "center";

const RedirectToLogin = () => {
  const t = useTranslate("auth");

  return (
    <Grid h={height} placeItems={pItems}>
      <Heading textAlign={tAlign} as="h1">
        {t("redirecting")}
      </Heading>
    </Grid>
  );
};

export default RedirectToLogin;
