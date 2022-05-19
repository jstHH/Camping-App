import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import EquipmentPage from "./pages/EquipmentPage";
import useEquipmentItems from "./hooks/useEquipmentItems";

function App() {
    const equipmentItems = useEquipmentItems();

    return (
    <div className="App">
        <Routes>
            <Route path="/" element={<EquipmentPage equipmentItems={equipmentItems}/>}/>
        </Routes>
    </div>
  );
}

export default App;
