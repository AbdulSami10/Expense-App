import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Expense from "../../Expense";
import { auth } from "../../firebase";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/sign-in");
      }
    });
  }, []);
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate("sign-in");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <>
      <Expense />
      <button onClick={signOutHandler}>Sign-Out</button>
    </>
  );
};

export default HomePage;
