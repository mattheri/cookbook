import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import useInjection from "common/hooks/UseInjection";
import useInput from "common/hooks/UseInput";
import useTranslate from "common/hooks/UseTranslate";
import ImageCompression from "common/utils/ImageCompression";
import {
  ChangeEventHandler,
  FC,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import { MdFileDownload } from "react-icons/md";
import PreviewImage from "../PreviewImage";
import Show from "../Show";

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

const FileInput: FC<Props> = ({ id, src, acceptedFiles }) => {
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { $error, setValue, setError, $value } = useInput(id);
  const t = useTranslate();
  const imageCompressor = useInjection(ImageCompression);

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

  const onImageReady = async (file: File) => {
    setIsLoading(false);

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

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputFiles = event.target.files;
    setIsLoading(true);

    if (!inputFiles || inputFiles.length === 0) return;

    if (!isFileValid(inputFiles.item(0))) {
      setError(t("inputs.errors.file.invalidFile", { type: getFileTypes() }));

      return;
    }

    imageCompressor.compress(inputFiles[0]).subscribe((file) => {
      if (!file) return;

      onImageReady(file);
    });
  };

  const removeImage = () => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
    setValue(null);
  };

  return (
    <FormControl pos="relative" isInvalid={!!($value?.src && $error)}>
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
          <PreviewImage
            file={$value?.url}
            onRemove={removeImage}
            isLoading={isLoading}
          />
          <Show condition={!!$error}>
            <FormErrorMessage>{$error}</FormErrorMessage>
          </Show>
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
