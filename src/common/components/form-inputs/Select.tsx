import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as SELECT,
} from "@chakra-ui/react";
import useInput from "common/hooks/UseInput";
import { FC, ReactNode, SelectHTMLAttributes, useEffect } from "react";

interface Option {
  value: any;
  label: ReactNode;
}

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  id: string;
  options: Option[];
  label?: string;
}

const Select: FC<Props> = ({ id, options, label, defaultValue, ...rest }) => {
  const { $error, $value, field, isInvalid, setValue } = useInput(id);

  const setDefaultValue = () => {
    if (!$value && defaultValue) setValue(defaultValue);
  };

  return (
    <FormControl isInvalid={isInvalid} onLoad={setDefaultValue}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <SELECT {...rest} id={id} {...field} value={$value}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </SELECT>
      {isInvalid && <FormErrorMessage>{$error}</FormErrorMessage>}
    </FormControl>
  );
};

export default Select;
