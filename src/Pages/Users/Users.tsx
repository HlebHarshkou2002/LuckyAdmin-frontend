import React from "react";
import User from "./User/User.tsx";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { fetchUsers } from "../../redux/slices/users.ts";

import s from "./Users.module.scss"

function Users() {
  const dispatch = useAppDispatch();

  const users = useAppSelector(state => state.users.users);
  const status = useAppSelector(state => state.users.status);

  const isUsersLoading = status === "loading";

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <table className={s.sales__wrapper}>
      <tr className={s.header}>
        <th className={s.header__item}>Имя пользователя</th>
        <th className={s.header__item}>Почта пользователя</th>
        <th className={s.header__item}>Дата регистрации пользователя</th>
        <th className={s.header__item}>Действия</th>
      </tr>
      {isUsersLoading
        ? "Loading"
        : users.map((user) => (
            <User
              _id={user._id}
              fullName={user.fullName}
              email={user.email}
              createdAt={user.createdAt}
            />
          ))}
      <tr className={s.header}>
        <th className={s.header__item}>Общее количество пользователей:</th>
        <th className={s.header__item}>{isUsersLoading ? "loading" : users.length}</th>
        <th className={s.header__item}></th>
        <th className={s.header__item}></th>
      </tr>
      
    </table>
  );
}

export default Users;
