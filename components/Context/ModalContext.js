import React from "react";

export const ModalContext = React.createContext();

export function ModalContextProvider(props) {

    const [modalState, setModalState] = React.useState({
        returnHref: ""
    });

    return (
        <ModalContext.Provider value={[modalState, setModalState]}>
            {props.children}
        </ModalContext.Provider>
    );
}