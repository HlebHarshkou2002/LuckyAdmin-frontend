import React from "react";
import s from "./User.module.scss"

function User(props) {
  console.log(props.fullName);
  return (
    <div className={s.users__block}>
      <div>{props.fullName}</div>
      <div>{props.email}</div>
      <div>{props.createdAt}</div>
      <div><button>-</button></div>
    </div>
  );
}

export default User;
