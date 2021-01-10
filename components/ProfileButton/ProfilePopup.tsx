import React from "react";
import Link from "next/link";
import styles from "./profilebutton.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useUserLogOut } from "../Hooks/useUserLogOut";
import axios from "axios";

type Props = {
    id: string
}

type User = {
    id: string,
    username: string
    name?: string,
    picture?: string,
}

export function ProfilePopup({ id }: Props) {
    const [user, setUser] = React.useState<User>({
        id: "",
        username: "",
        name: '',
        picture: ''
    }); 

    React.useEffect(() => {
        (async () => {
            const res = await (await axios.get(`/api/user/${id}`)).data;
            setUser(res);
        })()
    }, [])

    const handleLogOut = useUserLogOut();

    return (
        <Popup
            arrow
            on="hover"
            contentStyle={{
                display: "flex",
                flexDirection: "column",
                zIndex: 10000
            }}
            trigger={
                <a className={styles.profilebtn}>
                    {user.username && user.picture ? <img src={user.picture} /> : user.username.substring(0, 1).toUpperCase()}
                </a>
            }
            mouseLeaveDelay={300}
            position="bottom left">
            <Link href={`/profile/${id}`}><a className={styles.profile}>Profile</a></Link>
            <a className={styles.logout} onClick={handleLogOut}>Logout</a>
        </Popup>
    );
}