import React, {useState} from 'react';
import logo from '../logo.svg';
import '../App.css';
import LoginForm from "./Login";
import Dashboard from "./dashboard/Dashboard";
import Tags from "./dashboard/create/Tags";

function App() {
  const [state, setState] = useState<boolean | undefined>(undefined);
  fetch("/api/role").then((response) => {
      setState(response.status === 200)
  })
  return (
    <div className="App">
      {
        state === undefined ? <div>Loading...</div> : state ? <Dashboard /> : <LoginForm/>
      }
    </div>
  );
}

export default App;
