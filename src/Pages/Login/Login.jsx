import React from "react";
import s from "./Login.module.scss";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

function Login() {
  const isAuth = useSelector(selectIsAuth);
  

  console.log('isAuth', isAuth)

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if(!data.payload) {
      return alert('Не удалось авторизоваться');
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else {
      alert('Не удалось авторизоваться')
    }
  }

  if(isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className={s.login__block__wrapper}>
      <div className={s.login__block__bg}>
        <div className={s.login__block}>
          <Link to="/" className={s.exit}>
            X
          </Link>

          <div className={s.login__title}>Sign Up</div>

          <div className={s.login__fields}>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="email"
                  placeholder="Login"
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
                <button type="submit" className={s.login__button}>Login</button>
              </div>
            </form>

            <Link to="/registration" className={s.registation__title}>
              Registation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
