import React from 'react';
import { useCookies } from "react-cookie";
import { AppContext } from '../Context/AppContext';

export function useUserLogOut() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const [appState, setAppState] = React.useContext(AppContext);
    
    const handleLogOut = () => {
        removeCookie("user");
    
        setAppState({
            connected: false,
            user: {}
        });
    }

    return handleLogOut;
}