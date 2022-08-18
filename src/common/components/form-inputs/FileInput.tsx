import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import useInput from "common/hooks/UseInput";
import useTranslate from "common/hooks/UseTranslate";
import { useField } from "formik";
import {
  ChangeEventHandler,
  FC,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import { MdFileDownload } from "react-icons/md";
import PreviewImage from "../PreviewImage";

type FileTypes =
  | "image/apng"
  | "image/bmp"
  | "image/gif"
  | "image/jpeg"
  | "image/pjpeg"
  | "image/png"
  | "image/svg+xml"
  | "image/tiff"
  | "image/webp"
  | "image/x-icon";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  src?: string;
  acceptedFiles?: FileTypes[] | FileTypes;
  compressImage?: boolean;
  compressQuality?: number;
  fileSizeThreshold?: number;
}

export interface FileWithSrc extends File {
  src?: string;
}

const FileInput: FC<Props> = ({
  id,
  src,
  acceptedFiles,
  compressImage = true,
  compressQuality = 60,
  fileSizeThreshold = 10000,
}) => {
  const [image, setImage] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const imageSrcRef = useRef<string | undefined>(src);
  const { $error, setValue, setError } = useInput(id);
  const t = useTranslate();

  const getFileTypes = () => {
    if (Array.isArray(acceptedFiles)) {
      return acceptedFiles.map((t) => t.replace("image/", "")).join(", ");
    }

    return acceptedFiles?.replace("image/", "");
  };

  const isFileValid = (file: File | null) => {
    if (!file) return true;

    const type = file.type;

    if (acceptedFiles) {
      if (Array.isArray(acceptedFiles))
        return (acceptedFiles as string[]).includes(type);

      return acceptedFiles === type;
    }

    return true;
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputFiles = event.target.files;
    console.log(inputFiles);

    if (!inputFiles || inputFiles.length === 0) return;

    for (const file of inputFiles) {
      setImage(file);
    }

    if (!isFileValid(inputFiles.item(0))) {
      setError(t("inputs.errors.file.invalidFile", { type: getFileTypes() }));
    }
  };

  const removeImage = () => {
    if (!inputRef.current) return;
    inputRef.current.value = "";

    setImage(null);
    setValue(null);

    if (imageSrcRef.current) imageSrcRef.current = undefined;
  };

  const onImageReady = async (file: File) => {
    const toDataURL = (): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;

        reader.readAsDataURL(file);
      });
    };

    const url = await toDataURL();
    const name = file.name;

    setValue({ url, name });
  };

  return (
    <FormControl pos="relative" isInvalid={!!(image && $error)}>
      <VStack>
        <Button
          as="label"
          htmlFor={id}
          leftIcon={<MdFileDownload />}
          w="100%"
          cursor="pointer"
        >
          {t("addImage")}
        </Button>
        <SimpleGrid minChildWidth="8rem" w="100%">
          {!$error ? (
            <PreviewImage
              file={image || imageSrcRef.current}
              onRemove={removeImage}
              onFileCompressed={onImageReady}
              compressImage={compressImage}
              compressQuality={compressQuality}
              fileSizeThreshold={fileSizeThreshold}
            />
          ) : (
            <FormErrorMessage>{$error}</FormErrorMessage>
          )}
        </SimpleGrid>
      </VStack>
      <Input
        type="file"
        opacity="0"
        id={id}
        pos="absolute"
        onChange={onChange}
        ref={inputRef}
        multiple={false}
      />
    </FormControl>
  );
};

export default FileInput;
