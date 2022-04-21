import React, { useEffect } from 'react';
import './MessageItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteMessage, GetMessages, reset } from '../features/messageSlice';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { useState } from 'react';
import axios from 'axios';

function MessageItem({
  date,
  id,
  userid,
  Uuser,
  text,
  setSent,
  sent,
  imageItem,
  comments,
}) {
  const { User, user_id, token } = useSelector((state) => state.auth);
  const [formActive, setFormActive] = useState(true);
  const [avatar, setAvatar] = useState(null);
  // const [active2, setActive] = useState(true);
  const [fade, setFade] = useState(false);
  const dispatch = useDispatch();
  function getAvatar() {}
  // console.log(image);
  function deleteMessage(e) {
    console.log(comments);
    // e.preventDefault();
    console.log(token);
    setFade(true);
    setTimeout(() => {
      dispatch(DeleteMessage(id));
    }, 1000);
    // dispatch(reset());
    setSent(sent + 1);
    setTimeout(() => {
      setFade(false);
    }, 2100);
  }

  async function getAvatar() {
    return await axios
      .get(`https://strapi-sand.herokuapp.com/api/users/${userid}`)
      .then((res) => {
        if (res.data.avatar_id !== null) {
          const avatar_id = res.data.avatar_id;
          axios
            .get(
              `https://strapi-sand.herokuapp.com/api/upload/files/${avatar_id}`
            )
            .then((res) => {
              if (res.data.url) {
                setAvatar(res.data.url);
              } else {
                setAvatar('');
              }
            });
        } else {
          setAvatar('');
        }
      });
  }

  function openImg() {
    window.open(imageItem, '_blank');
  }
  useEffect(() => {
    getAvatar();
    console.log(fade);
  }, []);
  // useEffect(() => {
  //   dispatch(GetMessages());
  // }, [comments]);
  // const img = `https://strapi-sand.herokuapp.com${imageItem}`;
  if (Uuser == User) {
    return (
      <div className={fade ? 'message_item_fadeout' : 'message_item'}>
        <div className="message_item-content">
          <div className="message_item-content_section">
            <div className="message_item-content_section-inner">
              <img
                src={avatar ? avatar : ''}
                alt=""
                className="message_item-content_avatar"
              />
              <p className="text-sky-200 font-bold">{Uuser}</p>
            </div>
            <p className="message_item-content_date">{date}</p>
          </div>
          {text ? <p className="messages_item-content_text">{text}</p> : ''}

          {imageItem == ' ' ? (
            <div></div>
          ) : (
            <img onClick={openImg} src={imageItem}></img>
          )}
          <div className="message_item-comment_section  ">
            <Comments comments={comments} />
            <div
              className="message_item-accordeon cursor-pointer py-2 flex justify-center"
              onClick={() => setFormActive(!formActive)}
            >
              <h3 className="message_item-accordeon-sign">
                {formActive ? 'Написать комментарий' : 'Закрыть'}
              </h3>
            </div>
            <CommentForm
              setFormActive={setFormActive}
              formActive={formActive}
              user_id={user_id}
              message_id={id}
            />
          </div>
          <button
            type="button"
            className="message_item-delete"
            onClick={deleteMessage}
          >
            X
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={fade ? 'message_item_fadeout' : 'message_item'}>
        <div className="message_item-content">
          <div className="message_item-content_section">
            <div className="message_item-content_section-inner">
              {avatar ? (
                <img
                  src={avatar}
                  alt=""
                  className="message_item-content_avatar"
                />
              ) : (
                <div className="message_item-content_avatar"></div>
              )}
              <p className="text-sky-200 font-bold">{Uuser}</p>
            </div>
            <p className="message_item-content_date">{date}</p>
          </div>
          {text ? <p className="messages_item-content_text">{text}</p> : ''}
          {imageItem == ' ' ? (
            <div></div>
          ) : (
            <img onClick={openImg} src={imageItem}></img>
          )}
          <div className="message_item-comment_section  ">
            <Comments comments={comments} />
            <div
              className="message_item-accordeon cursor-pointer py-2 flex justify-center"
              onClick={() => setFormActive(!formActive)}
            >
              <h3 className="message_item-accordeon-sign">
                {formActive ? 'Написать комментарий' : 'Закрыть'}
              </h3>
            </div>
            <CommentForm
              setFormActive={setFormActive}
              formActive={formActive}
              user_id={user_id}
              message_id={id}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MessageItem;
