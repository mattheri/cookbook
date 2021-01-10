import React from "react";
import { Sling as Hamburger } from "hamburger-react";
import Link from "next/link";
import { Search } from "../Search/Search";
import { Filter } from "../Filter/Filter";
import { Button, FnButton, ModalButton } from "../Button/Button";
import styles from "./secondary.module.css";
import { AppContext } from "../Context/AppContext";
import { useUserLogOut } from "../Hooks/useUserLogOut";
import { ProfileButton } from "../ProfileButton/ProfileButton";

export function SecondaryNav(props) {
    const [filters] = props.filters;
    const [appState, setAppState] = React.useContext(AppContext);
    const handleLogOut = useUserLogOut();

    return (
        <nav className={styles.secondaryNav}>
            <ul className={styles.desktopMenu}>
                <Link href="/"><a><li>Home</li></a></Link>
                <Filter filters={props.filters} />
            </ul>
            <div className={styles.hamburger}>
                <Hamburger
                    toggled={props.toggled}
                    toggle={props.toggle}
                    direction="right"
                    duration={0.6}
                    label="Show Menu" />
            </div>
            <Search activeFilter={filters} />
            <ul className={styles.desktopMenu}>
                {appState.connected && <ProfileButton id={appState.user.id} />}
                {appState.connected && <FnButton onClick={handleLogOut} text="Log Out" />}
                {!appState.connected && <ModalButton href="/login" text="Log In" />}
                {!appState.connected && <ModalButton href="/signup" text="Sign Up" />}
            </ul>
        </nav>
    )
}