import React, { useEffect } from 'react';
import './App.scss';
import axios from "axios";
import Button, { ButtonTypes } from './components/button/button';
import Input from './components/input/input';
import Card from './components/card/card';

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
        <h1>Tripper</h1>
        <p>This is just for testing the basic components. Can be deleted :)</p>

        <Button
          disabled={false}
          type={ButtonTypes.primary}
          onPress={() => {
            alert("Button Pressed");
          }}>
          A primary button
        </Button>

        <br/>

        <Button 
          disabled={false}
          type={ButtonTypes.secondary}
          onPress={() => {
            alert("Button Pressed");
          }}>
          A secondary button
        </Button>

        <br/>

        <Input name="Test" label="This is a input!" value="A input value!"></Input>
        
        <br/>

        <Card>
          <div style={{padding: 25, background: "#fff"}}>
            A basic card
          </div>
        </Card>
      </header>
    </div>
  );
}

export default App;
