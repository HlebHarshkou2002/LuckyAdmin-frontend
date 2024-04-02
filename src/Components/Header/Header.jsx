import React, { useState } from "react";
import s from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { logout, selectIsAuth } from "../../redux/slices/auth";

import { UserOutlined } from "@ant-design/icons";

import { Avatar, Space, Dropdown, Button } from "antd";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import {  Modal } from 'antd';

function HeaderContainer(props) {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(logout());
    window.localStorage.removeItem("token");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const items = [
    {
      key: "1",
      label: (
        <div>
          <div>{props.fullName}</div>
          <div>{props.email}</div>
        </div>
      ),
      type: "text",
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <div>Настройки</div>,
    },
    {
      key: "3",
      label: <div>Профиль</div>,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: (
        <div>
          {isAuth ? (
            <div onClick={showModal} className={s.logout__btn}>
              Выход <LogoutOutlined />
            </div>
          ) : (
            <Link to="/login" className={s.auth__info}>
              <span>Account</span>
            </Link>
          )}
        </div>
      ),
      danger: true,
    },
  ];


  if (!isAuth) {
    <Navigate to="/" />;
  }

  return (
    <div className={s.header__wrapper}>
      <div className={s.account__header}>
        <div>
          <Modal title="Вы действительно хотите выйти?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText="Нет" okText="Да">
            <p>Это приведёт к потере доступа к данным...</p>
          </Modal>
          <Space wrap size={14}>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
            >
              <Avatar size={40} icon={<UserOutlined />} />
            </Dropdown>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default HeaderContainer;
