import React from "react";
import styles from "./filter.module.css";
import { Portal } from "../Portal/Portal";
import { Popup } from "../Popup/Popup";

export function Filter() {

    const [hovering, setHovering] = React.useState(false);
    const [coords, setCoords] = React.useState({});
    const setInitialCoords = (event) => {
        setHovering(true);
        if (!Object.keys(coords).length) {
            const rect = event.target.getBoundingClientRect();
            setCoords({ top: rect.top, left: rect.left });
        }
    }

    const closePopUp = () => {

    }

    return (
        <div className={styles.filter}>
            <div className={styles.filterbtn} onMouseEnter={(e) => setInitialCoords(e)} onMouseLeave={() => setHovering(false)}>
                <a>Filter</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </div>
        </div>
    );
}