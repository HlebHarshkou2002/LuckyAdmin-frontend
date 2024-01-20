import React from "react";
import s from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import basketIcon from "../../images/Header/basket-icon.png";

import emailImg from "../../images/Header/email-icon.png";
import lockImg from "../../images/Header/lock-icon.png";
import { logout, selectIsAdmin, selectIsAuth } from "../../redux/slices/auth";

function Header(props) {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isAdmin = useSelector(selectIsAdmin);

  const {items, totalPrice } = useSelector(state => state.cart)

  const handleSearchValueChange = (e) => {
    props.setSearchValue(e.target.value);
  };

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  if (!isAuth) {
    <Navigate to="/" />;
  }

  return (
    <div className={s.header__wrapper}>
      <div className={s.account__header__wrapper}>
        <div className={s.account__header}>
          <div className={s.email__info}>
            <img src={emailImg} alt="email" />
            <span>{props.email}</span>
          </div>
          <div>
            {isAuth ? (
              <button onClick={onClickLogout} className={s.logout__btn}>
                Logout
              </button>
            ) : (
              <Link to="/login" className={s.auth__info}>
                <img src={lockImg} alt="lock" />
                <span>Account</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
