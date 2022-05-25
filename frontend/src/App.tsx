import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import EquipmentPage from "./pages/EquipmentPage";
import useEquipmentItems from "./hooks/useEquipmentItems";
import RequireAuth from "./routing/RequireAuth";
import {ToastContainer} from "react-toastify";
import LoginPage from "./pages/LoginPage";
import useAppUser from "./hooks/useAppUser";
import AddEquipmentItemPage from "./pages/AddEquipmentItemPage";
import useAllAppUsers from "./hooks/useAllAppUsers";

function App() {
    const {equipmentItems, addEquipmentItem} = useEquipmentItems();
    const currentUser = useAppUser()
    const appUsers = useAllAppUsers()
    return (
    <div className="App">
        <ToastContainer/>
        <Routes>
            <Route element={<RequireAuth />}>
                <Route path="/" element={<EquipmentPage equipmentItems={equipmentItems} appUsers={appUsers}/>}/>
                <Route path={"equipment/additem"} element={<AddEquipmentItemPage addEquipmentItem={addEquipmentItem} currentUser={currentUser}/>}/>
            </Route>
            <Route path={'/login'} element={<LoginPage />}/>
        </Routes>
    </div>
  );
}

export default App;
