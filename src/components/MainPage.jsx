import React from 'react';
import building_img from '../assets/building_tumblr.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function MainPage({ changeHovered }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  function mouseEnter() {
    changeHovered(true);
  }
  function mouseLeave() {
    changeHovered(false);
  }
  return (
    <div className="main-page-container">
      <div className="main-page-image shadow-sm">
        <img className="image" src={building_img} alt="" />
      </div>
      <div className="main-page ">
        <Link to="/music">
          <div
            className="main-page-item"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          >
            <h1 className="text-red">Стена</h1>
          </div>
        </Link>
        {!isAuthenticated ? (
          <Link to="/login">
            <div
              className="main-page-item"
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
            >
              <h1>Логин</h1>
            </div>
          </Link>
        ) : null}
        {!isAuthenticated ? (
          <Link to="/registration">
            <div
              className="main-page-item"
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
            >
              <h1>Регистрация</h1>
            </div>
          </Link>
        ) : null}
        <div
          className="main-page-item"
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          <h1>Контакты</h1>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
