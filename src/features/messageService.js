import axios from 'axios';

const API_URL_GET = 'http://localhost:1337/api/messages?populate=*';
const API_URL = 'http://localhost:1337/api/messages/';

const getMessages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(API_URL_GET);
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
