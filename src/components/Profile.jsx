import { useState } from 'react';
import './Profile.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Profile() {
  const { User, user_id, token } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState();
  const [image, setImage] = useState();
  const [username2, setUsername] = useState();
  // ! image change
  const imageChange = (e) => {
    setImage(e.target.files[0]);
    setTimeout(() => {
      console.log(image);
    }, 3000);
  };
  // ! create a form data
  const formData = new FormData();
  // const username = 'Sabina 2';
  // formData.append('username', username);
  const data = {};
  formData.append('data', data);
  if (image) {
    formData.append('files.avatar', image, image.name);
  }
  // ! submit avatar
  const avatarChange = (e) => {
    e.preventDefault();
    const res = async () => {
      return await axios.put(
        `http://localhost:1337/api/users/${user_id}?populate=*`,
        formData
      );
    };
    res().then((response) => console.log(response.data));
  };
  // ! request your avatar
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const avatarReq = async () => {
    return axios
      .get('http://localhost:1337/api/users/me', config)
      .then((req) => {
        setAvatar(req.data.avatar.url);
      });
  };
  avatarReq();

  const img = `http://localhost:1337${avatar}`;

  return (
    <div className="profile flex justify-center w-9/12 my-0 mx-auto">
      <div className="profile_section">
        <div className="profile_section-name border rounded-lg p-4">
          <h1 className="text-center">{username2}</h1>
          <img src={img} className="p-6" alt="avatar" />
          <form type="submit" onSubmit={avatarChange}>
            <label
              htmlFor="file-upload"
              className="image_submit-label subpixel-antialiased font-black "
            >
              загрузить изображение
            </label>
            <input
              className="image-submit"
              onChange={imageChange}
              type="file"
              id="file-upload"
              name="avatar"
            />
            <input type="submit" placeholder="Отправить" value="Отправить" />
          </form>
          {/* <p className="font-light w-60 mt-10 ">
              {' '}
              Здесь должен быть аватар, но не могу сфетчить его с помощью populate
            </p> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;