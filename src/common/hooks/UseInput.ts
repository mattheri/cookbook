import { useField } from "formik";

const useInput = (id: string) => {
  const [
    field,
    { touched, value, error, initialError, initialTouched, initialValue },
    { setValue, setTouched, setError },
  ] = useField(id);

  const $value = value || initialValue;
  const $touched = touched || initialTouched;
  const $error = error || initialError;
  const isInvalid = !!($error && $touched);

  return {
    field,
    $value,
    $touched,
    $error,
    isInvalid,
    setError,
    setTouched,
    setValue,
  };
};

export default useInput;
