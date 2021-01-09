import axios from "axios";

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
            console.log(profile);
            console.log(profile.getBasicProfile().getName());

            const data = {
                user: profile.getBasicProfile().getEmail(),
                name: profile.getBasicProfile().getName(),
                picture: profile.getBasicProfile().getImageUrl()
            }
            
            const res = await (await axios.post("/api/auth/google", data)).data;
            console.log(res);

            callback(res);
        }
    }

    return (
        <div className="g-signin2" id="google-signin-button" onClick={() => handleGoogleSignIn()}></div>
    )
}