import Link from "next/link";
import React from "react";
import { Button, SubmitButton } from "../Button/Button";
import { Close } from "../Close/Close";
import { Container } from "../Container/Container";
import { AppContext } from "../Context/AppContext";
import { Input } from "../Input/Input";
import styles from "./signup.module.css";

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

    const [appContext, setAppContext] = React.useContext(AppContext);

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
                    callback: setAppContext,
                    method: "POST",
                    data: { username, password }
                }} disabled={Object.entries(errors)
                    .filter(([key, value]) => value.state || value.length < 1).length} text="Sign Up" />
            </form>
            <hr className={styles.hr} />
            <div className={styles.socialIcons}>
                <Button
                    href="/api/auth/google"
                    text={
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                        </svg>
                    } />
                <Button
                    href="/api/auth/facebook"
                    text={
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                        </svg>
                    } />
                <Button
                    href="/api/auth/twitter"
                    text={
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                        </svg>
                    } />
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