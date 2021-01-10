import '../styles/normalize.css';
import '../styles/globals.css';
import React from "react";
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { AppContextProvider } from "../components/Context/AppContext";
import { Modal } from "../components/Modal/Modal";
import { useRouter } from 'next/router';
import { Login } from '../components/Login/Login';
import { Signup } from '../components/Signup/Signup';
import { CookiesProvider } from "react-cookie";
import Head from "next/head";

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  return (
    <>
      <Head>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content="661449334056-gt1ss0r05bl8m94s54lo0jlv6p0mg7gf.apps.googleusercontent.com"></meta>
        {/* <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script> */}
      </Head>
      <CookiesProvider>
        <AppContextProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
          <Modal fullscreen isOpen={router.asPath.includes("login")}>
            <Login />
          </Modal>
          <Modal fullscreen isOpen={router.asPath.includes("signup")}>
            <Signup />
          </Modal>
        </AppContextProvider>
      </CookiesProvider>
    </>
  )
}

export default MyApp
