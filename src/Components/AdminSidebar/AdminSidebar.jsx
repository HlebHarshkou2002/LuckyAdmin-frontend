import React from "react";
import s from "./AdminSidebar.module.scss";
import { Link, Navigate } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className={s.admin__sidebar__wrapper}>
      <div>
        <Link to="/admin/products" className={s.link}>Товары</Link>
      </div>
      <div>
        <Link to="/admin/add-product" className={s.link}>Добавить Товар</Link>
      </div>
      <div>
        <Link to="/admin/analysis" className={s.link}>Анализ продаж</Link>
      </div>
    </div>
  );
}

export default AdminSidebar;
