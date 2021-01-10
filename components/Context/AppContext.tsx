import React from "react";
import { useGetAuthCookie } from "../Hooks/useGetAuthCookie";

export const AppContext = React.createContext(null);

export type User = {
    id: string,
    username: string,
    name?: string,
    picture?: string
}

export type AppContextState = {
    connected: boolean,
    user: User
}

export function AppContextProvider<T>(props: React.PropsWithChildren<T>) {

    const user = useGetAuthCookie();

    const [appState, setAppState] = React.useState<AppContextState>({
        connected: user ? user.connected : false,
        user: user ? user.user : {}
    });

    React.useEffect(() => console.log(appState), [appState]);

    return (
        <AppContext.Provider value={[appState, setAppState]}>
            {props.children}
        </AppContext.Provider>
    );
}