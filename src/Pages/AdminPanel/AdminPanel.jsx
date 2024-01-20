import React from "react";
import s from './AdminPanel.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import AddProduct from "../../Components/AdminProducts/AdminProducts";

function AdminPanel() {
  return (
    <div className={s.admin__panel__wrapper}>
      <AdminSidebar />
        

    </div>
  );
}

export default AdminPanel;
