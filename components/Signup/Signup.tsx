import Link from "next/link";
import React from "react";
import { Button, SubmitButton } from "../Button/Button";
import { Close } from "../Close/Close";
import { Container } from "../Container/Container";
import { AppContext } from "../Context/AppContext";
import { Google } from "../GoogleSignIn/Google";
import { Input } from "../Input/Input";
import styles from "./signup.module.css";
import { useUserSignIn } from "../Hooks/useUserSignIn";

export function Signup(props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [retype, setRetype] = React.useState("");
    const [errors, setErrors] = React.useState({
        username: {
            state: false,
            message: "",
            length: username.length
        },
        password: {
            state: false,
            message: "",
            length: password.length
        },
        retype: {
            state: false,
            message: "",
            length: retype.length
        }
    });

    const handleUsername = (val) => setUsername(val);
    const handlePassword = (val) => setPassword(val);
    const handleRetype = (val) => setRetype(val);
    const handleUsernameError = (val) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setErrors(errors => Object.assign(
            {},
            errors,
            {
                username: {
                    state: errors.username.state,
                    message: errors.username.message,
                    length: val.length
                }
            }
        )
        )

        if ((!regex.test(val) || val.length < 5) && !errors.username.state) {
            setErrors(errors => Object.assign(
                {},
                errors,
                {
                    username: {
                        state: true,
                        message: "Please use a valid email address.",
                        length: username.length
                    }
                }
            )
            )
        }
        
        if ((regex.test(val) && errors.username.state) || (val.length < 1 && errors.username.state)) {
            setErrors(errors => Object.assign(
                {},
                errors,
                {
                    username: {
                        state: false,
                        message: "",
                        length: username.length
                    }
                }
            )
            )
        }
    }

    const handlePasswordError = (val) => {
        if (val.length < 7 && !errors.password.state) {
            setErrors(errors => Object.assign(
                {},
                errors,
                {
                    password: {
                        state: true,
                        message: "Password must be at least 7 characters long.",
                        length: password.length
                    }
                }
            )
            )
        }

        if ((val.length < 1 && errors.password.state) || (val.length >= 7 && errors.password.state)) {
            setErrors(errors => Object.assign(
                {},
                errors,
                {
                    password: {
                        state: false,
                        message: "",
                        length: password.length
                    }
                }
            )
            )
        }
    }

    const handleRetypeError = (val) => {
        if (!errors.retype.state && val !== password) {
            setErrors(errors => Object.assign(
                {},
                errors,
                {
                    retype: {
                        state: true,
                        message: "Passwords don't match.",
                        length: retype.length
                    }
                }
            )
            )
        }

        if (val === password && errors.retype.state) {
            setErrors(errors => Object.assign(
                {},
                errors,
                {
                    retype: {
                        state: false,
                        message: "",
                        length: retype.length
                    }
                }
            )
            )
        }
    }

    const { handleSignIn, appContext } = useUserSignIn()

    React.useEffect(() => {
        if (appContext.connected) {
            props.close();
        }
    }, [appContext.connected])

    return (
        <Container className={styles.signup}>
            <Close onClick={props.close} />
            <form className={styles.form}>
                <Input
                    type="email"
                    id="username"
                    onChange={handleUsername}
                    value={username}
                    label="Email"
                    validate={handleUsernameError}
                    error={errors.username.state}
                    errorMessage={errors.username.message} />
                <Input
                    type="password"
                    id="password"
                    onChange={handlePassword}
                    value={password}
                    label="Password"
                    validate={handlePasswordError}
                    error={errors.password.state}
                    errorMessage={errors.password.message} />
                <Input
                    type="password"
                    id="password-retype"
                    onChange={handleRetype}
                    value={retype}
                    label="Retype password"
                    validate={handleRetypeError}
                    error={errors.retype.state}
                    errorMessage={errors.retype.message} />
                <SubmitButton onSubmit={{
                    url: "/api/auth/createLocal",
                    callback: handleSignIn,
                    method: "POST",
                    data: { username, password }
                }} disabled={Object.entries(errors)
                    .filter(([key, value]) => value.state || value.length < 1).length} text="Sign Up" />
            </form>
            <hr className={styles.hr} />
            <div className={styles.socialIcons}>
                <Google callback={handleSignIn} />
            </div>
            <div className={styles.login}>
                <p>
                    Already have an account?
                </p>
                <Link href="/login"><a>Sign in</a></Link>
            </div>
        </Container>
    );
}