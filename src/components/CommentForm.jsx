import axios from 'axios';
import React, { useEffect } from 'react';
import './CommentForm.scss';
import { Alert } from 'react-st-modal';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetMessages } from '../features/messageSlice';

function CommentForm({ setFormActive, formActive, message_id }) {
  const dispatch = useDispatch();
  const { user_id, token, User } = useSelector((state) => state.auth);
  const [content, setContent] = useState('');
  const [imageComment, setImageComment] = useState(null);
  const [usage, setUsage] = useState(0);
  const formData = new FormData();
  const user_string = user_id.toString();
  const data = {
    content: content,
    us: User,
    user_comment: user_id,
    message: message_id,
  };
  formData.append('data', JSON.stringify(data));
  if (imageComment) {
    formData.append('files.image', imageComment, imageComment.name);
  }

  function commentSubmit(e) {
    console.log(formData.data);
    e.preventDefault();
    dispatch(GetMessages());
    const resComment = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return await axios.post(
        'http://localhost:1337/api/comments?populate=*',
        formData,
        config
      );
    };
    Alert('Вы отправили комментарий', 'Ура!');

    resComment();
    dispatch(GetMessages());
    setFormActive(!formActive);
    setUsage(usage + 1);
    console.log(resComment);
    setContent('');
  }
  function contentChange(e) {
    setContent(e.target.value);
  }

  function imageChange(e) {
    setImageComment(e.target.files[0]);
    console.log(e.target.files);
  }
  // useEffect(() => {
  // }, [usage]);
  // ! keypress
  function keyPress(e) {
    if (e.ctrlKey && e.key == 'Enter') {
      const resComment = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return await axios.post(
          'http://localhost:1337/api/comments?populate=*',
          formData,
          config
        );
      };

      resComment();
      dispatch(GetMessages());
      setFormActive(!formActive);
      Alert('Вы отправили комментарий', 'Ура!');

      setUsage(usage + 1);
      console.log(resComment);
      setContent('');
    }
  }
  return (
    <div className={`comment_form ${formActive ? 'active' : ''}`}>
      <form action="submit" onSubmit={commentSubmit}>
        <textarea
          type="text"
          value={content}
          onChange={contentChange}
          onKeyUp={keyPress}
        />
        <br></br>
        {/* <label
          htmlFor="file-upload-comment"
          className="image_submit-label subpixel-antialiased font-black "
        >
          загрузить изображение
        </label>
        <p className="mb-4">{imageComment ? imageComment.name : ''}</p>
        <input
          className="image-submit"
          onChange={imageChange}
          type="file"
          id="file-upload-comment"
          name="file"
        /> */}
        <button type="submit">Отправить комментарий</button>
      </form>
    </div>
  );
}

export default CommentForm;