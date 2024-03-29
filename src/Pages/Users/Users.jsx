import React from "react";
import User from "./User/User";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices/users";

import s from "./Users.module.scss"

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const isUsersLoading = users.status === "loading";

  console.log(users);
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <table className={s.sales__wrapper} border="1" bordercolor="#f0f0f0">
      <tr className={s.header}>
        <th className={s.header__item}>Имя пользователя</th>
        <th className={s.header__item}>Почта пользователя</th>
        <th className={s.header__item}>Дата регистрации пользователя</th>
        <th className={s.header__item}>Действия</th>
      </tr>
      {isUsersLoading
        ? "Loading"
        : users.items.data.map((user) => (
            <User
              _id={user._id}
              fullName={user.fullName}
              email={user.email}
              createdAt={user.createdAt}
            />
          ))}
      <tr className={s.header}>
        <th className={s.header__item}>Общее количество пользователей:</th>
        <th className={s.header__item}>{isUsersLoading ? "loading" : users.items.data.length}</th>
        <th className={s.header__item}></th>
        <th className={s.header__item}></th>
      </tr>
      
    </table>
  );
}

export default Users;
