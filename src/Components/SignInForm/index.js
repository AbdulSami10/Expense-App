import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
const SignInForm = () => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setSignInData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, signInData.email, signInData.password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => alert(err.message));

    console.log(signInData);
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <input name="email" required type="email" onChange={handleChange} />
        <input
          name="password"
          required
          type="password"
          onChange={handleChange}
        />
        <button type="submit">Sign-in</button>
      </form>
    </>
  );
};

export default SignInForm;
