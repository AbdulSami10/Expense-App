import React from "react";
import SignInForm from "../../Components/SignInForm";

const SignInPage = () => {
  return (
    <>
      <SignInForm />
      <a href="/sign-out">create an account</a>
    </>
  );
};

export default SignInPage;
