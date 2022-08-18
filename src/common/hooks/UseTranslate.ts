import I18N from "i18n/init";
import useInjection from "./UseInjection";
import { TFunctionKeys, TOptions } from "i18next";

const useTranslate = (namespace?: string) => {
  const i18n = useInjection(I18N);

  const tFunction = (key: TFunctionKeys, options?: TOptions) => {
    if (typeof options !== "object")
      return i18n.t(key, { ns: namespace || "common" });
    return i18n.t(key, { ns: namespace || "common", ...options });
  };

  return tFunction;
};

export default useTranslate;
