import './Comments.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetMessages } from '../features/messageSlice';

export default function Comments({ Uuser, comments, sent, setSent }) {
  const [users, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [active, setActive] = useState(true);
  const [fade, setFade] = useState(false);

  const [smh, setSmh] = useState(0);
  const dispatch = useDispatch();
  const { User, token } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.messages);

  function deleteComment(e) {
    // console.log(commentUser);
    e.preventDefault();
    console.log('first_delete');
    const target = e.target;
    const parent = target.parentElement;
    const id = parent.attributes.id.value;
    // console.log(comments);

    console.log('second_delete');
    const res = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return axios.delete(
        'https://strapi-sand.herokuapp.com/api/comments/' + id,
        config
      );
    };
    setFade(true);
    setSmh(smh + 1);
    console.log('third_delete');
    setTimeout(() => {
      res();
    }, 1400);
    setTimeout(function () {
      dispatch(GetMessages());
    }, 1600);
    setTimeout(function () {
      setFade(false);
    }, 2000);
  }

  return (
    <div className="comments ">
      <div
        className="comments-btn cursor-pointer m-0 flex justify-center"
        onClick={() => setActive(!active)}
      >
        <h3 className="mr-1">{`Комментарии (${comments.length}`})</h3>
        <div className={`icon ${active ? '' : 'active-icon '}`}>
          <i className=" bx bxs-chevron-down cursor-pointer"></i>
        </div>
      </div>
      <div className={`comments-container ${active ? 'active' : ''}`}>
        {comments
          .slice(0)
          .reverse()
          .map((comment) => {
            return (
              <div
                key={comment.id}
                id={comment.id}
                className={`comments-container_content ${
                  fade ? 'fadeout' : ''
                }`}
              >
                <p className="comments-container_content-date">
                  {comment.attributes.realdate}
                </p>
                <p className="comments-container_content-p text-sky-200 font-bold ">
                  {comment.attributes.us}
                </p>

                <p>{comment.attributes.content}</p>
                {User == comment.attributes.us ? (
                  <button className="button_delete" onClick={deleteComment}>
                    X
                  </button>
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
}
