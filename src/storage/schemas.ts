import * as Yup from "yup";
import { t } from "i18next";
import { storageNamespace } from "./i18n/en";

const MAX_LENGTH = 150;

export const storageValidationSchema = {
  name: Yup.string()
    .required(t("form.errors.required"))
    .max(
      MAX_LENGTH,
      t("form.errors.maxlength", { chars: MAX_LENGTH, ns: storageNamespace })
    ),
};
