import React, { useEffect } from 'react';
import './MessageItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteMessage, reset } from '../features/messageSlice';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { useState } from 'react';
import axios from 'axios';

function MessageItem({ id, Uuser, text, setSent, sent, imageItem, comments }) {
  const { User, user_id, token } = useSelector((state) => state.auth);
  const [image, setImage] = useState('');
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
    window.open(`http://localhost:1337${imageItem}`, '_blank');
  }

  const img = `http://localhost:1337${imageItem}`;
  if (Uuser == User) {
    return (
      <div className={fade ? 'message_item_fadeout' : 'message_item'}>
        <div className="message_item-content">
          <p className="text-sky-200 font-bold">{Uuser}</p>
          <p>{text}</p>
          {imageItem == ' ' ? (
            <div></div>
          ) : (
            <img onClick={openImg} src={img}></img>
          )}
          <CommentForm user_id={user_id} message_id={id} />
          <Comments comments={comments} />
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
      <div className="message_item">
        <div className="message_item-content">
          <p className="text-sky-200 font-bold">{Uuser}</p>
          <p className="message_item-content_text">{text}</p>
          {imageItem == ' ' ? (
            <div></div>
          ) : (
            <img onClick={openImg} src={img}></img>
          )}
          <CommentForm
            user_id={user_id}
            message_id={id}
            setSent={setSent}
            sent={sent}
          />
          <Comments
            Uuser={Uuser}
            comments={comments}
            sent={sent}
            setSent={setSent}
          />
        </div>
      </div>
    );
  }
}

export default MessageItem;
