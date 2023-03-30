import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const SignUpForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setSignUpData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(signUpData);
    if (signUpData.password === signUpData.confirmPassword) {
      createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      )
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Paswoord must be same");
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="email" name="email" onChange={handleChange} required />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          required
        />
        <button>Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;
