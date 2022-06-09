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
import CarDetailsPage from "./pages/CarDetailsPage";
import useTentItems from "./hooks/useTentItems";
import AddTentItemPage from "./pages/AddTentItemPage";
import TentDetailsPage from "./pages/TentDetailsPage";
import SpendingPage from "./pages/SpendingPage";
import useSpendings from "./hooks/useSpendings";

function App() {
    const {equipmentItems, addEquipmentItem, updateEquipmentItem, removeEquipmentItem} = useEquipmentItems();
    const currentUser = useAppUser()
    const appUsers = useAllAppUsers()
    const {carItems, addCarItem, updateCarItem, removeCarItem} = useCarItems()
    const {tentItems, addTentItem, updateTentItem, removeTentItem} = useTentItems()
    const {spendings} = useSpendings()

    return (
    <div className="App">
        <ToastContainer/>
        <Routes>
            <Route element={<RequireAuth />}>
                <Route path="/" element={<EquipmentPage equipmentItems={equipmentItems} appUsers={appUsers}/>}/>
                <Route path={"/equipment/additem"} element={<AddEquipmentItemPage addEquipmentItem={addEquipmentItem} currentUser={currentUser}/>}/>
                <Route path={`/equipment/:id`} element={<EquipmentDetailsPage appUsers={appUsers} currentUser={currentUser} removeEquipmentItem={removeEquipmentItem} updateEquipmentItem={updateEquipmentItem}/>}/>
                <Route path={"/campsite"} element={<CampsitePage   appUsers={appUsers} carItems={carItems} tentItems={tentItems}/>}/>
                <Route path={"/campsite/addcar"} element={<AddCarItemPage addCarItem={addCarItem} currentUser={currentUser}/>}/>
                <Route path={"/campsite/addtent"} element={<AddTentItemPage  addTentItem={addTentItem} currentUser={currentUser}/>}/>
                <Route path={`/campsite/car/:id`} element={<CarDetailsPage appUsers={appUsers} currentUser={currentUser} updateCarItem={updateCarItem} removeCarItem={removeCarItem}/>}/>
                <Route path={`/campsite/tent/:id`} element={<TentDetailsPage appUsers={appUsers} currentUser={currentUser} updateTentItem={updateTentItem} removeTentItem={removeTentItem}/>} />
                <Route path={"/spendings"} element={<SpendingPage appUser={appUsers} spendings={spendings}/>}/>
            </Route>
            <Route path={'/login'} element={<LoginPage />}/>
        </Routes>
    </div>
  );
}

export default App;
