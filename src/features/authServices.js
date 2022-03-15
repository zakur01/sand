import axios from 'axios';
const API_URL = 'http://localhost:1337/api/auth/local/';

const login = async (formData) => {
  const res = await axios.post(API_URL + '?populate=*', formData);
  if (res) localStorage.setItem('user', JSON.stringify(res.data));
  // console.log(res);
  return res;
};

const register = async (formData) => {
  const res = await axios.post(API_URL + 'register', formData);
  if (res) localStorage.setItem('user', JSON.stringify(res));
  return res;
};
const logout = async () => {
  localStorage.removeItem('user');
};
const authServices = { login, logout, register };
export default authServices;
