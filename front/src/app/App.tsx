import React, {useEffect, useState} from 'react';
import logo from '../logo.svg';
import '../App.css';
import LoginForm from "./Login";
import Dashboard from "./dashboard/Dashboard";
import Tags from "./dashboard/create/Tags";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {fetchLogin} from "./roleSlice";

function App() {
  const isLogged = useSelector((state: RootState) => state.roleReducer.isLogged)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchLogin() as any)
  }, []);


  return (
    <div className="App">
      {
        isLogged === undefined ? <div>Loading...</div> : isLogged ? <Dashboard /> : <LoginForm/>
      }
    </div>
  );
}

export default App;
