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
import EquipmentDetailsPage from "./pages/EquipmentDetailsPage";
import CampsitePage from "./pages/CampsitePage";
import useCarItems from "./hooks/useCarItems";
import AddCarItemPage from "./pages/AddCarItemPage";

function App() {
    const {equipmentItems, addEquipmentItem, updateEquipmentItem, removeEquipmentItem} = useEquipmentItems();
    const currentUser = useAppUser()
    const appUsers = useAllAppUsers()
    const {carItems, addCarItem} = useCarItems()

    return (
    <div className="App">
        <ToastContainer/>
        <Routes>
            <Route element={<RequireAuth />}>
                <Route path="/" element={<EquipmentPage equipmentItems={equipmentItems} appUsers={appUsers}/>}/>
                <Route path={"/equipment/additem"} element={<AddEquipmentItemPage addEquipmentItem={addEquipmentItem} currentUser={currentUser}/>}/>
                <Route path={`/equipment/:id`} element={<EquipmentDetailsPage appUsers={appUsers} currentUser={currentUser} removeEquipmentItem={removeEquipmentItem} updateEquipmentItem={updateEquipmentItem}/>}/>
                <Route path={"/campsite"} element={<CampsitePage   appUsers={appUsers} carItems={carItems}/>}/>
                <Route path={"/campsite/addcar"} element={<AddCarItemPage addCarItem={addCarItem} currentUser={currentUser}/>}/>
            </Route>
            <Route path={'/login'} element={<LoginPage />}/>
        </Routes>
    </div>
  );
}

export default App;
