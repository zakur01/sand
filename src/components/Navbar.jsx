import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { reset, Logout } from '../features/authSlice';
// import { useState } from react;
function Navbar({ hovered, changeHovered }) {
  const dispatch = useDispatch();
  const Logout2 = () => {
    dispatch(reset());
    localStorage.removeItem('user');
  };
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return (
      <div
        onMouseEnter={() => changeHovered(true)}
        onMouseLeave={() => changeHovered(false)}
      >
        <div
          className={
            hovered
              ? 'navbar scale-in-ver-top hovered '
              : 'navbar scale-in-ver-top '
          }
        >
          <div className="navbar-logo">
            <h1>Песочница</h1>
          </div>
          <div className="navbar-menu">
            <ul>
              <Link to="/">
                <li>Главная</li>
              </Link>
              <Link to="/music">
                <li>Стена</li>
              </Link>
              <Link to="/profile">
                {' '}
                <li>Профиль</li>
              </Link>
              <Link to="/" onClick={Logout2}>
                {' '}
                <li>Выйти</li>
              </Link>
              <li>
                <h2></h2>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onMouseEnter={() => changeHovered(true)}
        onMouseLeave={() => changeHovered(false)}
      >
        <div
          className={
            hovered
              ? 'navbar scale-in-ver-top hovered'
              : 'navbar scale-in-ver-top'
          }
        >
          <div className="navbar-logo">
            <h1>Песочница</h1>
          </div>
          <div className="navbar-menu">
            <ul>
              <Link to="/">
                <li>Главная</li>
              </Link>
              <Link to="/music">
                <li>Стена</li>
              </Link>
              {/* <Link to="/contacts">
                <li>Контакты</li>
              </Link> */}
              <Link to="/login">
                <li>Войти</li>
              </Link>
              <Link to="/registration">
                <li>Зарегистрироваться</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
