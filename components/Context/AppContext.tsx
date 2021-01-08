import React from "react";
import { useGetAuthCookie } from "../Hooks/useGetAuthCookie";

export const AppContext = React.createContext(null);

export function AppContextProvider<T>(props: React.PropsWithChildren<T>) {

    const user = useGetAuthCookie();

    const [appState, setAppState] = React.useState({
        connected: user ? user.connected : false,
        user: user ? user.user : {}
    });

    return (
        <AppContext.Provider value={[appState, setAppState]}>
            {props.children}
        </AppContext.Provider>
    );
}