import Link from "next/link";
import React from "react";
import { ModalButton, SubmitButton } from "../Button/Button";
import { Close } from "../Close/Close";
import { Container } from "../Container/Container";
import { Input } from "../Input/Input";
import styles from "./login.module.css";
import { useUserSignIn } from "../Hooks/useUserSignIn";
import { Google } from "../GoogleSignIn/Google";
import { Facebook } from "../FacebookSignIn/Facebook";

type Props = {
    close?: () => Promise<boolean>
}

export function Login({
    close
}: Props) {
    
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
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
        }
    });

    const handleUsername = (val: string) => setUsername(val);
    const handlePassword = (val: string) => setPassword(val);
    const handleUsernameError = (val: string) => {
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
                        length: val.length
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
                        length: val.length
                    }
                }
            )
            )
        }
    }

    const handlePasswordError = (val: string) => {

        setErrors(errors => Object.assign(
            {},
            errors,
            {
                password: {
                    state: errors.password.state,
                    message: errors.password.message,
                    length: val.length
                }
            }
        )
        )
        
        if (val.length < 7 && !errors.password.state) {
            setErrors(errors => Object.assign(
                {},
                errors,
                {
                    password: {
                        state: true,
                        message: "Password must be at least 7 characters long.",
                        length: val.length
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
                        length: val.length
                    }
                }
            )
            )
        }
    }

    const { handleSignIn, appContext } = useUserSignIn();

    React.useEffect(() => {
        if (appContext.connected) {
            close();
        }
    }, [appContext.connected])

    return (
        <Container className={styles.login}>
            <Close onClick={close} />
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
                <SubmitButton onSubmit={{
                    url: "/api/auth/local",
                    callback: handleSignIn,
                    method: "POST",
                    data: { username, password }
                }} disabled={Object.entries(errors)
                    .filter(([key, value]) => value.state || value.length < 1).length} text="Sign In" />
            </form>
            <hr className={styles.hr} />
            <div className={styles.socialIcons}>
                <Google callback={handleSignIn} />
                <Facebook callback={handleSignIn} />
            </div>
            <div className={styles.signup}>
                <p>
                    Don't have an account?
                </p>
                <ModalButton href="/signup" text="Sign Up" />
            </div>
        </Container>
    );
}