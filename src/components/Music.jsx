import React from 'react';
import './Music.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MessageItem from './MessageItem';
import { GetMessages, PostMessage, reset } from '../features/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Upload, reset_upload } from '../features/uploadSlice';

function Music({ changeHovered, setModule }) {
  const [content, setContent] = useState('');
  const [sent, setSent] = useState('');
  const [image, setImage] = useState(null);
  const [nasaImg, setNasaImg] = useState();
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  const { User, user_id, token, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    changeHovered(false);

    // const res = await axios.get('http://localhost:1337/api/messages/');
    // setMess(res.data.data);

    // console.log(messages);

    dispatch(GetMessages());
    // setMess(messages);
    // console.log(mess);
    // return () => {
    //   dispatch(reset());
    // };c
    // console.log(image_id);
  }, []);
  // console.log(mess);
  // console.log(mess);
  // let user_id = User.user.id;
  const formData = new FormData();
  const data = {
    text: content,
    user: user_id,
  };
  formData.append('data', JSON.stringify(data));
  if (image) {
    formData.append('files.image', image, image.name);
  }

  const Submit = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setModule(true);
      setTimeout(() => {
        setModule(false);
      }, 2500);
    }
    dispatch(PostMessage(formData));

    setSent(sent + 1);
    setContent('');
  };

  function onChange(e) {
    // e.preventDefault();
    setContent(e.target.value);
  }
  function imageChange(e) {
    setImage(e.target.files[0]);
  }

  function handleKeyPress(event) {
    if (event.ctrlKey && event.key == 'Enter') {
      console.log('pressed Enter!');
      dispatch(PostMessage(formData));
      setSent(sent + 1);
      setContent('');
    }
  }

  return (
    <div className="messages-section">
      <h1 className="mb-4">поместите своё сообщениe...</h1>
      <div className="messages-input">
        <form type="submit">
          <label
            htmlFor="file-upload"
            className="image_submit-label subpixel-antialiased font-black "
          >
            загрузить изображение
          </label>
          <button>Очистить изображение</button>
          <p className="mb-4">{image ? image.name : ''}</p>
          <input
            className="image-submit"
            onChange={imageChange}
            type="file"
            id="file-upload"
            name="file"
          />
        </form>
        <form onSubmit={Submit}>
          <textarea
            className="messages-input-text"
            name="text"
            type="text"
            onChange={onChange}
            onKeyDown={handleKeyPress}
            value={content}
          />
          <br></br>
          <input
            className="messages-input-submit"
            type="submit"
            placeholder="Отправить"
            value="Отправить"
          />
        </form>
      </div>

      <div className="messages">
        {messages
          .slice(0)
          .reverse()
          .map((text3, index) => (
            <MessageItem
              index={index}
              Uuser={text3.attributes.user.data.attributes.username}
              key={text3.id}
              id={text3.id}
              text={text3.attributes.text}
              setSent={setSent}
              sent={sent}
              imageItem={
                text3.attributes.image.data !== null
                  ? text3.attributes.image.data.attributes.url
                  : ' '
              }
              comments={
                text3.attributes.comments.data !== null
                  ? text3.attributes.comments.data
                  : ' '
              }
            />
          ))}
      </div>
    </div>
  );
}

export default Music;
