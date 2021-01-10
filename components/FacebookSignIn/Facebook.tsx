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
        cookie: true,
        xfbml: true,
        version: 'v9.0'
    });

    const handleFindOrCreateUser = async (data: any) => {
        const params = {
            username: data.email,
            name: data.name,
            picture: data.picture.data.url
        }

        const res = await (await axios.post("/api/auth/oAuth", params)).data;
        handleSignIn(res);
    }

    return (
        <>
            {/* <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/fr_CA/sdk.js#xfbml=1&version=v9.0&appId=224542522593355" nonce="ofVoqfPq"></script> */}
            <div id="fb-root"></div>
            <a className={styles.facebook} onClick={() => {
                FB.login(response => {
                    if (response.authResponse) {
                        console.log(response.authResponse);
                        FB.api("/me", response => {
                            console.log(response);
                        })

                        handleFindOrCreateUser(response.authResponse);
                    }
                }, {
                    scope: "email, name, picture"
                });
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                Sign In with Facebook</a>
            {/* <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true"></div> */}
        </>
    );
    // return (
    //     <FacebookLogin
    //         appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
    //         callback={handleFindOrCreateUser}
    //         scope={"email,public_profile"}
    //         textButton="Continue with Facebook"
    //         fields="name, email, picture"
    //         icon="fa-facebook"
    //         cssClass={styles.facebook}
    //         isDisabled={false}
    //     />
    // );


}