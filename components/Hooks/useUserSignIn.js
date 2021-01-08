import React from 'react';
import { AppContext } from '../Context/AppContext';
import { useCookies } from "react-cookie";
import { useRouter } from 'next/router';
import axios from 'axios';

export function useUserSignIn() {
    const [ appContext, setAppContext ] = React.useContext(AppContext);
    const [cookie, setCookie] = useCookies(["user"]);
    const router = useRouter();

    function handleSignIn(data) {
        setCookie("user", data, {
            path: "/",
            maxAge: 3600,
            sameSite: true
        });
        setAppContext(data);
    }

    const handleOAuthSignIn = (data) => {
        console.log(data);
        router.push(data.url);
    }

    return { handleSignIn, handleOAuthSignIn, appContext };
}