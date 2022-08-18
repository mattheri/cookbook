import "common/i18n/en";
import "auth/i18n/en";
import "storage/i18n/en";
import { FC, PropsWithChildren } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import HigerNavContextProvider from "./nav/context/HigerNavContextProvider";
import useInjection from "common/hooks/UseInjection";
import Client from "client/client";
import { ApolloProvider } from "@apollo/client";
import StatefulLoading from "./StatefulLoading";
import { Provider } from "react-redux";
import store from "store/store";
import ModalContextProvider from "./modals/context/ModalContextProvider";
import Modals from "./modals/Modals";
import AddProduct from "product/components/AddProduct";

interface Props extends PropsWithChildren {}

const Providers: FC<Props> = ({ children }) => {
  const client = useInjection(Client);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <HigerNavContextProvider>
            <ModalContextProvider>
              <StatefulLoading />
              <Modals />
              {children}
            </ModalContextProvider>
          </HigerNavContextProvider>
        </ChakraProvider>
      </ApolloProvider>
    </Provider>
  );
};

export default Providers;
