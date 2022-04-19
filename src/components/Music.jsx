import React from 'react';
import 'moment/locale/ru';
import moment from 'moment';
import './Music.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MessageItem from './MessageItem';
import { GetMessages, PostMessage, reset } from '../features/messageSlice';
import { RefreshToken } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Upload, reset_upload } from '../features/uploadSlice';

function Music({ changeHovered, setModule }) {
  const [content, setContent] = useState('');
  const [sent, setSent] = useState('');
  const [image, setImage] = useState(null);
  const [nasaImg, setNasaImg] = useState();
  const [mess, setMess] = useState(null);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  const { User, user_id, token, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  moment().locale('ru');
  const time = new moment().locale('ru').format('lll');

  useEffect(() => {
    // console.log(moment().format());
    changeHovered(false);
    setMess(messages);

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
  }, [mess]);
  // console.log(mess);
  // console.log(mess);
  // let user_id = User.user.id;
  const formData = new FormData();
  const data = {
    text: content,
    user: user_id,
    realdate: time,
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
    setImage(null);
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

  async function refreshToken() {
    dispatch(RefreshToken());
  }
  return (
    <div className="messages-section">
      <h1 className="mb-4 messages-section_gif">поместите своё сообщениe...</h1>
      {/* <button onClick={refreshToken} className="refresh_button">
        Refresh Token
      </button> */}
      <div className="messages-input">
        <div type="submit" className="messages-input_first">
          <label htmlFor="file-upload" className="image_submit-label  ">
            загрузить изображение
          </label>

          <button onClick={() => setImage(null)}>очистить изображение</button>
          <p className="mb-4 ochi">{image ? image.name : ''}</p>
          <input
            className="image-submit"
            onChange={imageChange}
            type="file"
            id="file-upload"
            name="file"
          />
        </div>
        <form className="sendform" onSubmit={Submit}>
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
              date={text3.attributes.realdate}
              Uuser={text3.attributes.user.data.attributes.username}
              userid={text3.attributes.user.data.id}
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
