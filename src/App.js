import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import HomePage from "./Pages/Home";
import Navigation from "./Components/Navigation";
import ErrorPage from "./Pages/Error";
import SignUpPage from "./Pages/Sign-Up";
import SignInPage from "./Pages/Sign-in";
import ExpenseTable from "./Pages/Expense-Table";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="expense-table" element={<ExpenseTable />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
