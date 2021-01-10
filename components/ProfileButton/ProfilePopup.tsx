import React from "react";
import Link from "next/link";
import styles from "./profilebutton.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export function ProfilePopup() {

    return (
        <Popup trigger={<div className={styles.profilebtn}>
        </div>} position="bottom center">
            Hello theeereeeeeeee

        </Popup>
    );
}