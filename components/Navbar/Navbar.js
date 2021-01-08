import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import { SecondaryNav } from "./SecondaryNav";

export function Navbar() {

    const [show, setShow] = React.useState(false);
    const [filters, setFilters] = React.useState({});

    return (
        <>
            <SecondaryNav
                toggled={show}
                toggle={setShow}
                filters={[filters, setFilters]} />
            <nav className={styles.navbarMobile}>
                <ul>
                    <Link href="/"><a><li>log in</li></a></Link>
                </ul>
            </nav>
        </>
    );
}