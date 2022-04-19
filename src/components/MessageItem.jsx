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
      .get(`http://strapi-sand.herokuapp.com/api/users/${userid}`)
      .then((res) => {
        const avatar_id = res.data.avatar_id;
        axios
          .get(
            `https://strapi-sand.herokuapp.com/api/upload/files/${avatar_id}`
          )
          .then((res) => {
            setAvatar(res.data.url);
          });
      });
  }

  function openImg() {
    window.open(imageItem, '_blank');
  }

  // const img = `https://strapi-sand.herokuapp.com${imageItem}`;
  if (Uuser == User) {
    return (
      <div className={fade ? 'message_item_fadeout' : 'message_item'}>
        <div className="message_item-content">
          <p className="message_item-content_date">{date}</p>
          <button onClick={getAvatar}> Get Avatar </button>
          <img src={avatar} alt="" className="message_item-content_avatar" />
          <p className="text-sky-200 font-bold">{Uuser}</p>
          <p className="messages_item-content_text">{text}</p>

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
          <p className="message_item-content_date">{date}</p>

          <p className="text-sky-200 mt-4 font-bold">{Uuser}</p>
          <p className="messages_item-content_text">{text}</p>
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
              <h3>{formActive ? 'Написать комментарий' : 'Закрыть'}</h3>
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
