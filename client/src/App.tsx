import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {

  useEffect(() =>{
    // TODO: This is just an example how to call the backend server. Should be deleted
    const callBackend = async () => {
      var serverMessage = await axios.get("test");
      console.log(serverMessage);
    }
    callBackend();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
