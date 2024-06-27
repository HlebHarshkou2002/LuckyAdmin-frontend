import React from "react";
import s from "./User.module.scss";
import { fetchRemoveUser } from "../../../redux/slices/users.ts";
import { useAppDispatch } from "../../../redux/hooks.ts";


import {
  CloseCircleOutlined,
} from "@ant-design/icons";

type UserProps = {
  _id: String;
  fullName: String;
  email: String;
  createdAt: String;
}

function User(props : UserProps) {
  const dispatch = useAppDispatch();

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
        <CloseCircleOutlined style={{ color: "red", fontSize: "22px" }} onClick={removeUser} />
      </td>
    </tr>
  );
}

export default User;
