import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { AppContext } from "../../components/Context/AppContext";
import { fauna, client } from "../../utils/db/Fauna";

export default function Profile() {
    const [appState] = React.useContext(AppContext);
    const router = useRouter();

    React.useEffect(() => {
        if (!appState.connected) {
            router.push("/protected");
        }
    }, [appState])

    return (
        <main>

        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async (req) => {
    console.log(req);

    return {
        props: {}
    }
}