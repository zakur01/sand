import React, { useEffect } from 'react';
import './MessageItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteMessage, GetMessages, reset } from '../features/messageSlice';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { useState } from 'react';
import axios from 'axios';

function MessageItem({ id, Uuser, text, setSent, sent, imageItem, comments }) {
  const { User, user_id, token } = useSelector((state) => state.auth);
  const [formActive, setFormActive] = useState(true);
  // const [active2, setActive] = useState(true);
  const [fade, setFade] = useState(false);
  const dispatch = useDispatch();

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

  function openImg() {
    window.open(imageItem, '_blank');
  }

  // const img = `https://strapi-sand.herokuapp.com${imageItem}`;
  if (Uuser == User) {
    return (
      <div className={fade ? 'message_item_fadeout' : 'message_item'}>
        <div className="message_item-content">
          <p className="text-sky-200 font-bold">{Uuser}</p>
          <p>{text}</p>
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
          <p className="text-sky-200 font-bold">{Uuser}</p>
          <p>{text}</p>
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
