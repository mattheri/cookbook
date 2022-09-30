import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as _Input,
  InputProps,
} from "@chakra-ui/react";
import useInput from "common/hooks/UseInput";
import { FC } from "react";
import Show from "../Show";

interface Props extends InputProps {
  id: string;
  label?: string;
}

const Input: FC<Props> = ({ id, label, ...rest }) => {
  const { $error, $touched, $value, field } = useInput(id);

  return (
    <FormControl isInvalid={!!$error && $touched}>
      <Show condition={!!label}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
      </Show>
      <_Input id={id} {...field} {...rest} value={$value} />
      <Show condition={!!($touched && $error)}>
        <FormErrorMessage>{$error}</FormErrorMessage>
      </Show>
    </FormControl>
  );
};

export default Input;
