import axios from "axios";
import styles from "./google.module.css";

type Props = {
    callback: (data: any) => void
}

export function Google({ callback }: Props) {
    gapi.load("auth2", () => {
        gapi.auth2.init({
            client_id: "661449334056-gt1ss0r05bl8m94s54lo0jlv6p0mg7gf.apps.googleusercontent.com"
        });
        gapi.signin2.render("google-signin-button", {
            theme: "dark",
            'width': 240,
            'height': 50,
            'longtitle': true,
        })
    })

    const handleGoogleSignIn = async () => {
        const auth2 = gapi.auth2.getAuthInstance();
        const profile = await auth2.signIn();

        if (Object.keys(profile).length) {
            const data = {
                user: profile.getBasicProfile().getEmail(),
                name: profile.getBasicProfile().getName(),
                picture: profile.getBasicProfile().getImageUrl()
            }
            
            const res = await (await axios.post("/api/auth/oAuth", data)).data;
            callback(res);
        }
    }

    return (
        <a className={styles.google} onClick={() => handleGoogleSignIn()}><img src="/uploads/images/google_icon.png" />Sign in with Google</a>
    )
}