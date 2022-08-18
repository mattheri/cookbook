import Nav from "common/components/nav/Nav";
import React from "react";
import SignUpSignInButton from "./SignUpSignInButton";

const AuthActions = () => {
  return (
    <Nav.End>
      <SignUpSignInButton />
    </Nav.End>
  );
};

export default AuthActions;
