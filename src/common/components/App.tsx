import Router from "routes/Router";
import Providers from "./Providers";

export const App = () => {
  return (
    <Providers>
      <Router />
    </Providers>
  );
};
