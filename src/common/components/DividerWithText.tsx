import { Divider } from "@chakra-ui/react";
import { FC } from "react";
import { Colors } from "common/common";

interface Props {
  text?: string;
  color?: Colors;
  bg?: Colors;
}

const DividerWithText: FC<Props> = ({
  text,
  color = "chakra-body-text",
  bg = "white",
}) => {
  return (
    <Divider
      position="relative"
      marginTop="1.5rem !important"
      marginBottom="1rem !important"
      _after={{
        content: `"${text}"`,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "fit-content",
        height: "1.5rem",
        paddingInline: "0.5rem",
        backgroundColor: bg,
        color: color,
      }}
    />
  );
};

export default DividerWithText;
