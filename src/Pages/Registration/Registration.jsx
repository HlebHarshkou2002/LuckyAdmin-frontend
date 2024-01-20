import React from "react";
import s from "./Registration.module.scss";
import { Link, Navigate } from "react-router-dom";
import UserImg from "../../images/Registration/user.png";
import { useDispatch, useSelector } from "react-redux";

import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";

function Registration() {
  const isAuth = useSelector(selectIsAuth);
  

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Veronika",
      email: "blablakrause@tut.by",
      password: "hello",
    },
  });

  const onSubmit = async (values) => {
    console.log(values)
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Не удалось авторизоваться");
    }
  };

  return (
    <div className={s.registration__block__wrapper}>
      <div className={s.registration__block__bg}>
        <div className={s.registration__block}>
          <Link to="/" className={s.exit}>
            X
          </Link>

          <div className={s.user__img__wrapper}>
            <img src={UserImg} alt="" />
          </div>

          <div className={s.registration__title}>Registration</div>

          <div className={s.registration__fields}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("fullName", { required: "Укажите имя" })}
                />
              </div>
              <div>
                <input
                  placeholder="Email"
                  type="email"
                  {...register("email", { required: "Укажите почту" })}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Password"
                  {...register("password", { required: "Укажите пароль" })}
                />
              </div>
              <div>
                <button disabled={!isValid} type="submit" className={s.registration__button}>Register</button>
              </div> 
            </form>

            <Link to="/login" className={s.registation__title}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
