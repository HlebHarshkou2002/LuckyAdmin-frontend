import React from "react";
import s from "./User.module.scss";
import { fetchRemoveUser } from "../../../redux/slices/users";
import { useDispatch } from "react-redux";

import {
  CloseCircleOutlined,
} from "@ant-design/icons";

function User(props) {
  const dispatch = useDispatch();
  
  const removeUser = async () => {
    if (window.confirm("Вы действительно хотите удалить пользователя?")) {
      dispatch(fetchRemoveUser(props._id));
      console.log(props._id);
    }
  };

  console.log(props._id);
  return (
    <tr className={s.users__block}>
      <td>{props.fullName}</td>
      <td>{props.email}</td>
      <td>{props.createdAt}</td>
      <td>
        <CloseCircleOutlined style={{ color: "red", fontSize: "22px" }} onClick={removeUser}/>
      </td>
    </tr>
  );
}

export default User;
