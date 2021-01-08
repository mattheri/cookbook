import React from "react";
import ReactDOM from "react-dom";

export function Portal(props) {

    const portalDOM = typeof window !== "undefined" && document.createElement("div");
    const mount = typeof window !== "undefined" && document.querySelector("body");
    
    React.useEffect(() => {
        mount.appendChild(portalDOM);
        return () => mount.removeChild(portalDOM);
    }, [mount, portalDOM])

    if (typeof window !== "undefined") {
        return ReactDOM.createPortal(
            props.children,
            portalDOM
        )
    }

    return <div></div>
}