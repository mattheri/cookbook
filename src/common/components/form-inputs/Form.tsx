import { Box } from "@chakra-ui/react";
import { Formik, Form as _Form, FormikConfig } from "formik";
import { PropsWithChildren } from "react";
import * as Yup from "yup";
import { ObjectShape } from "yup/lib/object";
import FileInput from "./FileInput";
import Input from "./Input";
import NumberInput from "./Number";
import Select from "./Select";
import Submit from "./Submit";
import Switch from "./Switch";

type Validation<T extends object> = { [P in keyof T]?: Yup.SchemaOf<T[P]> };

interface Props<T extends object> extends PropsWithChildren<FormikConfig<T>> {
  initialValues: T;
  validation?: Validation<T>;
}

const Form = <InitialValues extends object>({
  initialValues,
  validation,
  children,
  ...rest
}: Props<InitialValues>) => {
  return (
    <Formik
      {...rest}
      initialValues={initialValues}
      validationSchema={
        validation ? Yup.object(validation as ObjectShape) : null
      }
    >
      <Box as={_Form} w="100%" h="100%">
        {children}
      </Box>
    </Formik>
  );
};

export default Object.assign(Form, {
  Input: Input,
  Submit: Submit,
  Switch: Switch,
  File: FileInput,
  Select: Select,
  Number: NumberInput,
});
