import React from "react";
import s from "./User.module.scss";
import { fetchRemoveUser } from "../../../redux/slices/users";
import { useDispatch } from "react-redux";

function User(props) {
  const dispatch = useDispatch();
  
  const removeUser = async () => {
    if (window.confirm("Вы действительно хотите удалить пользователя?")) {
      debugger;
      dispatch(fetchRemoveUser(props._id));
      console.log(props._id);
    }
  };

  console.log(props._id);
  return (
    <div className={s.users__block}>
      <div>{props.fullName}</div>
      <div>{props.email}</div>
      <div>{props.createdAt}</div>
      <div>
        <button onClick={removeUser}>-</button>
      </div>
    </div>
  );
}

export default User;
