import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MDBContainer } from 'mdb-react-ui-kit';
import './App.css';
import LoginContainer from "./components/Body/Login/LoginContainer";

const App = () => {
  return (
      <BrowserRouter>
        <MDBContainer fluid>
            <LoginContainer />
        </MDBContainer>
      </BrowserRouter>
  );
};

export default App;
