import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Popup as P } from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { PopupActions, PopupProps } from "reactjs-popup/dist/types";

interface Props extends ForwardRefExoticComponent<PopupProps & RefAttributes<PopupActions>> {}

export function Popup({ children, ...rest }: React.PropsWithChildren<Props>) {

    <P {...rest}>
        {children}
    </P>
}