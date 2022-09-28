import { FC, Fragment } from "react";
import { useDisclosure, Button, Tag, TagCloseButton } from "@chakra-ui/react";
import FoldableDrawer from "common/components/FoldableDrawer";
import useTranslate from "common/hooks/UseTranslate";
import { namespace } from "barcode-scanner/i18n/en";

interface Props {
  codes: string[];
  onScanAnother: () => void;
  isScanning: boolean;
  onRemoveCode: (code: string) => void;
}

const ScannedItemsTab: FC<Props> = ({
  codes,
  onScanAnother,
  isScanning,
  onRemoveCode,
}) => {
  const { onClose } = useDisclosure();
  const t = useTranslate(namespace);

  const removeCodeHandler = (code: string) => () => onRemoveCode(code);

  return (
    <FoldableDrawer
      isOpen={!!codes.length}
      onClose={onClose}
      badgeContent={
        codes.length ? t("codes", { count: codes.length }) : undefined
      }
    >
      <FoldableDrawer.Body display="flex" gap="0.5rem" flexWrap="wrap">
        {codes.map((code, index) => (
          <Fragment key={index}>
            <Tag size="lg" variant="solid" colorScheme="green" mr="1" mb="1">
              {code}
              <TagCloseButton onClick={removeCodeHandler(code)} />
            </Tag>
          </Fragment>
        ))}
      </FoldableDrawer.Body>
      <FoldableDrawer.Footer gap="1rem">
        <Button
          colorScheme="green"
          w="100%"
          disabled={isScanning}
          onClick={onScanAnother}
        >
          {t("scanAnother")}
        </Button>
        <Button w="100%" disabled={!codes.length}>
          {t("save")}
        </Button>
      </FoldableDrawer.Footer>
    </FoldableDrawer>
  );
};

export default ScannedItemsTab;
