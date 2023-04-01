import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { auth, dataBase } from "./firebase";

import { uid } from "uid";
const Expense = () => {
  const uidd = uid();
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);

  const [expense, setExpense] = useState([
    {
      description: "",
      value: 0,
      date: "",
      valueType: "",
    },
  ]);
  const handleChange = (e) => {
    setExpense((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.trim(),
    }));
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(dataBase, `${auth.currentUser.uid}`), (snapshot) => {
          setData([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((expense) => {
              setData((oldData) => [...oldData, expense]);
            });
          }
        });
      }
    });
  }, []);
  const Addition = () => {
    const values = data.map((data) => {
      return parseInt(data.value);
    });
    console.log(parseInt(values));
    let sum = 0;
    values.forEach((item) => {
      sum += item;
    });
    console.log(sum);
    return sum;
  };
  let value = Addition();
  const handleSubmit = (e) => {
    e.preventDefault();
    set(ref(dataBase, `${auth.currentUser.uid}/${uidd}`), {
      description: expense.description,
      value: expense.value,
      date: expense.date,
      valueType: expense.valueType,
      uid: uidd,
    });
    console.log(expense);
    setExpense({
      description: "",
      value: 0,
      valueType: "",
      date: "",
    });
  };

  return (
    <>
      <h1>Balance In Account:{value}</h1>

      <form>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={expense.description}
        />
        <input
          type="number"
          name="value"
          onChange={handleChange}
          value={expense.value}
        />

        <select
          name="valueType"
          onChange={handleChange}
          value={expense.valueType}
        >
          <option value=""></option>
          <option value="cash">Cash</option>
          <option value="e-wallet">E-Wallet</option>
          <option value="bankAccount">Bank Account</option>
        </select>

        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={expense.date}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <ol>
        {data.map((data) => {
          return (
            <li key={data.uid}>
              <ul>
                <li>{data.description}</li>
                <li>{data.value}rs</li>
                <li>{data.date}</li>
                <li>{data.valueType}</li>
              </ul>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default Expense;
