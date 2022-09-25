import { useState, FC, useRef, useEffect, PropsWithChildren } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  IconButton,
} from "@chakra-ui/react";
import { TiArrowSortedUp } from "react-icons/ti";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const FoldableDrawer: FC<Props> = ({ isOpen, onClose, children }) => {
  const [isFolded, setIsFolded] = useState(false);
  const [firstUnfold, setFirstUnfold] = useState(true);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerRefTransform = useRef<string | null>(null);

  const toggleFold = () => setIsFolded(!isFolded);

  const findContainer = (element: HTMLElement | null) => {
    if (!element) return null;

    let parent = element.parentElement;
    const className = "chakra-modal__content-container";

    while (parent && !parent.classList.contains(className)) {
      parent = parent.parentElement;
    }

    return parent;
  };

  useEffect(() => {
    if (drawerRef.current) {
      const parent = drawerRef.current.parentElement;
      const container = findContainer(parent);

      if (!parent || !container) return;

      container.style.height = "auto";
      if (!drawerRefTransform.current)
        drawerRefTransform.current = parent.style.transform;

      if (isFolded) {
        parent.style.transform = parent.style.transform.replace(
          "translateY(0%)",
          "translateY(var(--chakra-translate-y))"
        );
      } else if (!isFolded && !firstUnfold) {
        parent.style.transform = drawerRefTransform.current;
      }

      setFirstUnfold(false);

      return () => setFirstUnfold(true);
    }
  }, [drawerRef, isFolded, firstUnfold]);

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      isOpen={isOpen}
      useInert={false}
      trapFocus={false}
    >
      <DrawerContent
        translateY={isFolded ? "calc(100% - 2rem)" : "0%"}
        transition="transform ease-in-out 300ms"
      >
        <DrawerHeader
          ref={drawerRef}
          borderTopWidth="1px"
          borderTopColor="blackAlpha.100"
        >
          <IconButton
            aria-label="fold-menu"
            icon={
              <TiArrowSortedUp
                style={{
                  transform: isFolded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform ease-in-out 300ms",
                }}
              />
            }
            variant="ghost"
            position="absolute"
            top="-2.3rem"
            width="2.5rem"
            height="2.5rem"
            right="1rem"
            borderTopWidth="1px"
            borderTopColor="blackAlpha.100"
            borderRightColor="blackAlpha.100"
            borderRightWidth="1px"
            borderLeftColor="blackAlpha.100"
            borderLeftWidth="1px"
            zIndex="1"
            backgroundColor="white"
            onClick={toggleFold}
          />
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default Object.assign(FoldableDrawer, {
  Footer: DrawerFooter,
  Body: DrawerBody,
});
