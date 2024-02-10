import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import Header from "./Components/Header/Header";
import Login from "./Pages/Login/Login";

import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import AdminProducts from "./Components/AdminProducts/AdminProducts";
import AddProduct from "./Components/AddProduct/AddProduct";

import SalesChart from "./Pages/SalesChart/SalesChart";
import Users from "./Pages/Users/Users";
import Supplies from "./Pages/Supplies/Supplies";
import FullSupply from "./Pages/FullSupply/FullSupply";
import Providers from "./Pages/Providers/Providers";
import CreateSupply from "./Pages/CreateSupply/CreateSupply";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = React.useState('')

  const isAuth = useSelector(selectIsAuth)

  console.log(searchValue)

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);


  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Header email={userData.data?.email} searchValue={searchValue} setSearchValue={setSearchValue}/>
          {isAuth ? <AdminPanel /> : "Требуется авторизация"}
          
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Admin */}
            {/* <Route path="/" element={<AdminPanel />} /> */}
            <Route path="/admin/products" element={<AdminProducts />} /> 
            <Route path="/admin/add-product" element={<AddProduct />} /> 
            <Route path="/admin/analysis" element={<SalesChart /> } /> 
            <Route path="/admin/users" element={<Users /> } /> 
            <Route path="/admin/supplies" element={<Supplies /> } /> 
            <Route path="/supplies/:id" element={<FullSupply /> } /> 
            <Route path="/providers" element={<Providers /> } /> 
            <Route path="/admin/add-supply" element={<CreateSupply /> } /> 
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
