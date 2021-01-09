import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { useUserSignIn } from "../Hooks/useUserSignIn";
import styles from "./facebook.module.css";

export function Facebook() {

    const { handleSignIn } = useUserSignIn();

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

    return (
        <FacebookLogin
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
            callback={handleFindOrCreateUser}
            scope={"email,public_profile"}
            textButton="Continue with Facebook"
            fields="name, email, picture"
            icon="fa-facebook"
            cssClass={styles.facebook}
            isDisabled={false}
        />
    );
}