import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import EquipmentPage from "./pages/EquipmentPage";
import useEquipmentItems from "./hooks/useEquipmentItems";
import RequireAuth from "./routing/RequireAuth";
import {ToastContainer} from "react-toastify";
import LoginPage from "./pages/LoginPage";
import useAppUser from "./hooks/useAppUser";

function App() {
    const equipmentItems = useEquipmentItems();
    const appUser = useAppUser();

    return (
    <div className="App">
        <ToastContainer/>
        <Routes>
            <Route element={<RequireAuth />}>
                <Route path="/" element={<EquipmentPage equipmentItems={equipmentItems}/>}/>
            </Route>
            <Route path={'/login'} element={<LoginPage />}/>
        </Routes>
    </div>
  );
}

export default App;
