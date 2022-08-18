import AuthService from "auth/service/auth-service";
import useInjection from "common/hooks/UseInjection";
import { User } from "firebase/auth";
import { useState } from "react";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const auth = useInjection(AuthService);
  auth.onAuthStateChange(setUser);
  return user;
};

export default useUser;
