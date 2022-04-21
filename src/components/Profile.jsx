import { useEffect, useState } from 'react';
import './Profile.scss';
import axios from 'axios';
import MessageItem from './MessageItem';

import { useSelector } from 'react-redux';

function Profile() {
  const { User, user_id, token } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState();
  const [image, setImage] = useState();
  const [username2, setUsername] = useState();
  const [messages, setMessages] = useState();
  const [visible, setVisible] = useState(false);
  // ! image change
  const imageChange = (e) => {
    setImage(e.target.files[0]);
    setTimeout(() => {
      console.log(image);
    }, 3000);
  };
  // ! create a form data
  const formData = new FormData();
  if (image) {
    formData.append('files', image);
  }
  // ! submit avatar
  const avatarChange = (e) => {
    e.preventDefault();
    const res = async () => {
      return await axios
        .post(`https://strapi-sand.herokuapp.com/api/upload/`, formData)
        .then((res) => {
          const imageId = res.data[0].id;
          axios
            .put(`https://strapi-sand.herokuapp.com/api/users/${user_id}`, {
              avatar: imageId,
              avatar_id: JSON.stringify(imageId),
            })
            .then((res) => console.log(`ПРОВЕРКА ${res.data.data}`));
        })
        .catch((error) => console.log(error.message));
    };
    res();
  };

  // ! request your avatar
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const avatarReq = async () => {
    return axios
      .get('https://strapi-sand.herokuapp.com/api/users/me', config)
      .then((res) => {
        // setAvatar(req.data.avatar.url);
        setAvatar(res.data.avatar.url);
        // console.log(res.data);
      });
  };
  avatarReq();

  const getUserMessages = async () => {
    return await axios
      .get(
        `http://strapi-sand.herokuapp.com/api/messages?filters[user][id][$eq]=${user_id}&populate=*`
      )
      .then((res) => {
        setMessages(res.data.data);
        console.log(res.data.data);
        // console.log(messages);
      });
  };
  useEffect(() => {
    getUserMessages();
  }, []);

  const img = `https://strapi-sand.herokuapp.com${avatar}`;

  return (
    <div className="profile my-0 mx-auto">
      <div className="profile_section">
        <div className="profile_section-name  rounded-lg">
          <h1 className="text-center">{User}</h1>
          <img src={avatar} className=" " alt="avatar" />
          <form type="submit" onSubmit={avatarChange}>
            <div className="form_container">
              <button
                htmlFor="file-upload"
                className="image_submit-label  font-black "
              >
                загрузить новую авку
              </button>
              <h2>{image ? image.name : ''}</h2>
              <input
                className="image-submit"
                onChange={imageChange}
                type="file"
                id="file-upload"
                name="avatar"
              />
              <input
                className="image_submit-label"
                type="submit"
                placeholder="Сменить"
                value="Сменить"
              />
            </div>
            {/* <img src="" alt="" /> */}
          </form>
          {/* <p className="font-light w-60 mt-10 ">
              {' '}
              Здесь должен быть аватар, но не могу сфетчить его с помощью populate
            </p> */}
          <button className="show_button" onClick={() => setVisible(!visible)}>
            Показать свои сообщения
          </button>
          <div className={visible ? 'messages' : 'messages_closed'}>
            {messages
              ? messages
                  .slice(0)
                  .reverse()
                  .map((text3, index) => (
                    <MessageItem
                      index={index}
                      date={text3.attributes.realdate}
                      Uuser={text3.attributes.user.data.attributes.username}
                      userid={text3.attributes.user.data.id}
                      key={text3.id}
                      id={text3.id}
                      text={text3.attributes.text}
                      // setSent={setSent}
                      // sent={sent}
                      imageItem={
                        text3.attributes.image.data !== null
                          ? text3.attributes.image.data.attributes.url
                          : ' '
                      }
                      comments={
                        text3.attributes.comments.data !== null ? (
                          text3.attributes.comments.data
                        ) : (
                          <h1>error</h1>
                        )
                      }
                    />
                  ))
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
