import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {MDBContainer} from 'mdb-react-ui-kit';
import './App.css';
import BodyContainer from "./components/Body/BodyContainer";

const App = () => {
    return (
        <BrowserRouter>
            <MDBContainer>
                <BodyContainer/>
            </MDBContainer>
        </BrowserRouter>
    );
};

export default App;
