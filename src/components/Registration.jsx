import React from 'react';
import './Registration.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RegAuth } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function Registration({ changeHovered }) {
  const { User } = useSelector((state) => state.auth);
  changeHovered(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const [button, setButton] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { email, password, username } = formData;
  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // !
  // useEffect(() => {
  //   if (
  //     password.length > 4 &&
  //     password !== '' &&
  //     email !== '' &&
  //     password !== ''
  //   ) {
  //     setButton(true);
  //   } else {
  //     setButton(false);
  //   }
  // }, [password]);

  const regPayload = {
    username: username,
    email: email,
    password: password,
  };
  const initialMount = useRef(true);
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      alert(`Вы зарегистрировались как ${User}`);
    }
  }, [User]);
  const regSubmit = async (e) => {
    e.preventDefault();
    dispatch(RegAuth(regPayload));
  };
  // navigate('/music')
  //   return await axios
  //     .post('http://localhost:1337/api/auth/local/register', regPayload)
  //     .then((response) => {
  //       console.log(response);

  //       navigate('/login');
  //     });
  // };
  // useEffect(() => {
  //   setFormData({
  //     username: '',
  //     email: '',
  //     password: '',
  //   });
  // }, [regSubmit]);

  return (
    <div className="reg_container">
      <form action="" onSubmit={regSubmit}>
        <label htmlFor="">Юзернейм</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={inputChange}
        />
        <label htmlFor="">Почта</label>

        <input type="email" name="email" value={email} onChange={inputChange} />
        <label htmlFor="">Пароль</label>

        <input
          type="password"
          name="password"
          value={password}
          onChange={inputChange}
        />

        <button type="submit" className="login_button">
          Регистрация
        </button>
      </form>
    </div>
  );
}

export default Registration;
