import React from 'react';
import building_img from '../assets/tumblr_head.jpg';
import { Link } from 'react-router-dom';

function Contacts() {
  return (
    <div className="main-page-container background">
      <div className="main-page-image ">
        <img className="margin-left" src={building_img} alt="" />
      </div>
      <div className="main-page ">
        <div className="main-page-item">
          <Link to="/">
            <h1>Смерть</h1>
          </Link>
        </div>
        <div className="main-page-item">
          <a href="https://www.xhamster.com/" target="_blank">
            <h1>Жопа</h1>
          </a>
        </div>
        <div className="main-page-item">
          <h1>Пустота</h1>
        </div>
        <div className="main-page-item">
          <h1>Вещества</h1>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
