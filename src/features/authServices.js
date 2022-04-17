import axios from 'axios';
const API_URL = 'https://strapi-sand.herokuapp.com/api/auth/local/';

const login = async (formData) => {
  const res = await axios.post(API_URL + '?populate=*', formData);
  if (res) localStorage.setItem('user', JSON.stringify(res.data));
  // console.log(res);
  return res;
};

const register = async (formData) => {
  const res = await axios.post(API_URL + 'register', formData);
  if (res) localStorage.setItem('user', JSON.stringify(res.data));
  return res;
};
const logout = async () => {
  localStorage.removeItem('user');
};

const refreshtoken = async (formData) => {
  return await axios.post(
    'https://strapi-sand.herokuapp.com/api/auth/refreshToken',
    formData
  );
};
const authServices = { login, logout, register, refreshtoken };
export default authServices;
