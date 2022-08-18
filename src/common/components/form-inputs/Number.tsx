import {
  NumberInputFieldProps,
  NumberInputProps,
  useNumberInput,
  HStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import useInput from "common/hooks/UseInput";
import { FC, useEffect } from "react";

type NumberProps = NumberInputFieldProps & NumberInputProps;

interface Props extends NumberProps {
  id: string;
  label: string;
}

const NumberInput: FC<Props> = ({
  id,
  clampValueOnBlur = true,
  defaultValue = 1,
  max = 100,
  min = 1,
  label,
  ...inputProps
}) => {
  const { getDecrementButtonProps, getInputProps, getIncrementButtonProps } =
    useNumberInput({
      id,
      clampValueOnBlur,
      defaultValue,
      min,
      max,
      precision: 1,
      ...inputProps,
    });

  const { $value, $error, isInvalid, field, setValue } = useInput(id);

  const input = getInputProps({ ...field });
  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();

  useEffect(() => {
    setValue(input["aria-valuenow"]);
  }, [input["aria-valuetext"]]);

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <HStack maxW="32rem">
        <Button {...increment}>+</Button>
        <Input {...input} value={$value} />
        <Button {...decrement}>-</Button>
      </HStack>
      {isInvalid && <FormErrorMessage>{$error}</FormErrorMessage>}
    </FormControl>
  );
};

export default NumberInput;
