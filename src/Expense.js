import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { auth, dataBase } from "./firebase";

import { uid } from "uid";
const Expense = () => {
  const uidd = uid();
  const [data, setData] = useState([]);
  // const [value, setValue] = useState([]);

  const [expense, setExpense] = useState([
    {
      description: "",
      value: 0,
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
      uid: uidd,
    });
    setExpense({
      id: 1,
      description: "",
      value: 0,
    });
  };

  return (
    <>
      <p>{value}</p>
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
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <ol>
        {data.map((data) => {
          return (
            <li key={data.id}>
              <ul>
                <li>{data.description}</li>
                <li>{data.value}$</li>
              </ul>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default Expense;
