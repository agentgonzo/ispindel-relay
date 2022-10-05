import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './App.css';

import DataPage from './routes/DataPage';
import {ServicesPage} from "./routes/ServicesPage";
import {NavBar} from "./components/navbar";
import {InstructionsPage} from "./routes/Instructions";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <NavBar/>
        <div className="App">
          <Routes>
            <Route path="data" element={<DataPage/>}/>
            <Route path="services" element={<ServicesPage/>}/>
            <Route path="instructions" element={<InstructionsPage/>}/>
            <Route path="*" element={<Navigate to="data"/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
