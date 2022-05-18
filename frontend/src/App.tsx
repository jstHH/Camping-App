import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import EquipmentPage from "./pages/EquipmentPage";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<EquipmentPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
