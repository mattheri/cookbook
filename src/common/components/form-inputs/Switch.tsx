import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch as SWITCH,
} from "@chakra-ui/react";
import useInput from "common/hooks/UseInput";
import { useField } from "formik";
import { FC } from "react";

interface Props {
  id: string;
  label: string;
}

const Switch: FC<Props> = ({ id, label }) => {
  const { $error, $touched, $value, field } = useInput(id);

  return (
    <FormControl isInvalid={!!$error && $touched}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <SWITCH id={id} {...field} value={$value} isChecked={$value} />
      {$touched && $error ? (
        <FormErrorMessage>{$error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default Switch;
