import React from 'react';
import './Login.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAuth, reset } from '../features/authSlice';
import AlertModule from '../components/AlertModule';
import { unwrapResult } from '@reduxjs/toolkit';

function Login({ setModule, changeHovered }) {
  const navigate = useNavigate();
  changeHovered(false);
  const dispatch = useDispatch();
  const { token, User, message, user_id, isLoading, isAuthenticated } =
    useSelector((state) => state.auth);

  // const navigate = useNavigate();
  // const [button, setButton] = useState(false);
  // const [module, setModule] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // !
  const loginPayload = {
    identifier: email,
    password: password,
  };
  const RegSubmit = (e) => {
    e.preventDefault();
    // setButton(true);
    dispatch(LoginAuth(loginPayload))
      .then(unwrapResult)
      .then((obj) => console.log({ obj }))
      .catch((obj) => setError(obj.data.error.message));
  };
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      // alert(`${User} is here`);

      setModule(true);
      setTimeout(() => {
        setModule(false);
      }, 2500);

      setTimeout(() => {
        navigate('/music');
      }, 2550);
    }
    // return () => {
    //   dispatch(reset());
    // };
  }, [User]);

  return (
    <div className="reg_container">
      <form action="" onSubmit={RegSubmit}>
        <label htmlFor="">Почта</label>

        <input
          type="email"
          name="email"
          value={email}
          onChange={inputChange}
          className="mb-4"
        />
        <label htmlFor="">Пароль</label>

        <input
          type="password"
          name="password"
          value={password}
          onChange={inputChange}
        />
        <button className="login_button" type="submit">
          Логин
        </button>
        <p className="text-red-500">
          {error && error == 'Invalid identifier or password'
            ? 'Неправильный пароль или логин'
            : null}
        </p>
      </form>
    </div>
  );
}

export default Login;
