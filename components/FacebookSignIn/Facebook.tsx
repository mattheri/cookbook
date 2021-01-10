import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { useUserSignIn } from "../Hooks/useUserSignIn";
import styles from "./facebook.module.css";
import React from "react";
import { useRouter } from "next/router";

export function Facebook() {

    const { handleSignIn } = useUserSignIn();

    FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v9.0'
    });

    const handleFindOrCreateUser = async (data: any) => {
        console.log(data);
        const params = {
            username: data.email,
            name: data.name,
            picture: data.picture.data.url
        }

        const res = await (await axios.post("/api/auth/oAuth", params)).data;
        handleSignIn(res);
    }

    const FBLogin = () => {
        FB.login(response => {
            if (response.authResponse) {
                console.log(response);
                FB.api("/me", response => console.log(response));
            }
        })
    }

    return (
        <>
            <div id="fb-root"></div>
            <div onClick={FBLogin} className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true"></div>
        </>
    );
}