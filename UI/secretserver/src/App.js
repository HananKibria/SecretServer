import React from "react";
import Store from "./components/Store";
import Header from "./components/Header";
import Secret from "./components/Secret";
import { Routes, Route} from "react-router-dom";
import {Helmet} from 'react-helmet';

const App = () => {
  
    return (
        <div className="application">
        <Helmet>
            <style>{'body { background-color: aliceblue; }'}</style>
        </Helmet>
        <div >
        <Header />
        <Routes>
        <Route path="/" element={<Store/>} />
        <Route path="/secret" element={<Secret />} />
        </Routes>
      </div>
    </div>
      
    );
  };
  export default App;
  