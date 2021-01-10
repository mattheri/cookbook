import React from "react";
import Link from "next/link";
import styles from "./profilebutton.module.css";
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

export function ProfileButton({ id }: Props) {
    const [user, setUser] = React.useState<User>(); 

    React.useEffect(() => {
        (async () => {
            const res = await (await axios.get(`/api/user/${id}`)).data;
            setUser(res);
            console.log(res);
        })()
    }, [])

    return (
        <Link href={id}>
            <a className={styles.profilebtn}>
                {user && user.picture && <img src={user.picture} />}
            </a>
        </Link>
    );
}