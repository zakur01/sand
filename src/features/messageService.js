import axios from 'axios';

const API_URL_GET = 'https://strapi-sand.herokuapp.com/api/messages?populate=*';
const API_URL = 'https://strapi-sand.herokuapp.com/api/messages/';

const getMessages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(API_URL_GET, config);
};

const postMessage = async (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(API_URL_GET, payload, config);
};

const deleteMessage = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios.delete(API_URL + id, config);
};

const messageServices = { getMessages, postMessage, deleteMessage };
export default messageServices;
