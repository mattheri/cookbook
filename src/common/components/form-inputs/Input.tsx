import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as _Input,
  InputProps,
} from "@chakra-ui/react";
import useInput from "common/hooks/UseInput";
import { FC } from "react";

interface Props extends InputProps {
  id: string;
  label?: string;
}

const Input: FC<Props> = ({ id, label, ...rest }) => {
  const { $error, $touched, $value, field } = useInput(id);

  return (
    <FormControl isInvalid={!!$error && $touched}>
      {label ? <FormLabel htmlFor={id}>{label}</FormLabel> : null}
      <_Input id={id} {...field} {...rest} value={$value} />
      {$touched && $error ? (
        <FormErrorMessage>{$error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default Input;
