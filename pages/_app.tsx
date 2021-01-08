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

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  return (
    <>
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
