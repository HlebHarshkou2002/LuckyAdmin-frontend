import React from "react";
import s from "./AdminSidebar.module.scss";
import { Link, Navigate } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className={s.admin__sidebar__wrapper}>
      <div>
        <Link to="/products" className={s.link}>Товар</Link>
      </div>
      <div>
        <Link to="/admin/analysis" className={s.link}>Анализ продаж</Link>
      </div>
      <div>
        <Link to="/admin/sales" className={s.link}>Продажи</Link>
      </div>
      <div>
        <Link to="/admin/orders" className={s.link}>Заказы</Link>
      </div>
      <div>
        <Link to="/supplies" className={s.link}>Поставки</Link>
      </div>
      <div>
        <Link to="/admin/add-supply" className={s.link}>Сформировать поставку</Link>
      </div>
      <div>
        <Link to="/providers" className={s.link}>Поставщики</Link>
      </div>
      <div>
        <Link to="/admin/users" className={s.link}>Пользователи</Link>
      </div>
    </div>
  );
}

export default AdminSidebar;
