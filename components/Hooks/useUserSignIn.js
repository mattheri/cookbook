import React from 'react';
import { AppContext } from '../Context/AppContext';
import { useCookies } from "react-cookie";

export function useUserSignIn() {
    const [ appContext, setAppContext ] = React.useContext(AppContext);
    const [cookie, setCookie] = useCookies(["user"]);

    function handleSignIn(data) {
        setCookie("user", data, {
            path: "/",
            maxAge: 3600,
            sameSite: true
        });
        setAppContext(data);
    }

    return { handleSignIn, appContext };
}