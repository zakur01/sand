import './Comments.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetMessages } from '../features/messageSlice';

export default function Comments({ Uuser, comments, sent, setSent }) {
  const [users, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [active, setActive] = useState(false);

  const [smh, setSmh] = useState(0);
  const dispatch = useDispatch();
  const { User } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.messages);
  // dispatch(GetMessages());
  // useEffect(() => {
  //   dispatch(GetMessages());
  // }, [smh]);
  // dispatch(GetMessages());

  // let commentUser = [];
  // useEffect(() => {
  //   console.log('1 useeffect');
  //   for (let i = 0; i < comments.length; i++) {
  //     console.log('2 useeffect');
  //     const res = async () =>
  //       await axios.get(
  //         'http://localhost:1337/api/comments/' + comments[i].id + '?populate=*'
  //       );
  //     res().then((res) => {
  //       commentUser.push(
  //         res.data.data.attributes.user_comment.data.attributes.username
  //       );
  //     });
  //     setUser(commentUser);
  //   }
  //   console.log('3 useeffect');

  //   console.log('4 useeffect');
  //   console.log(commentUser);
  //   setRefresh(true);

  //   console.log('5 useeffect');

  //   // return () => {
  //   //   setUser(null);
  //   // };
  // }, []);

  function deleteComment(e) {
    // console.log(commentUser);
    console.log('first_delete');
    const target = e.target;
    const parent = target.parentElement;
    const id = parent.attributes.id.value;
    // console.log(comments);

    console.log('second_delete');
    const res = async () => {
      return axios.delete('http://localhost:1337/api/comments/' + id);
    };
    res();

    setSmh(smh + 1);
    console.log('third_delete');
    dispatch(GetMessages());
  }

  return (
    <div className="comments ">
      <div
        className="comments-btn cursor-pointer py-2 flex justify-center"
        onClick={() => setActive(!active)}
      >
        <h3>{`Комментарии (${comments.length}`})</h3>
        <div className={`icon ${active ? 'active-icon' : ' '}`}>
          <i className="ml-2 bx bxs-chevron-down cursor-pointer"></i>
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
                className="comments-container_content  "
              >
                <p className="comments-container_content-p text-sky-200 font-bold ">
                  {comment.attributes.us}
                </p>

                <p>{comment.attributes.content}</p>
                {User == comment.attributes.us ? (
                  <button onClick={deleteComment}>X</button>
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
}
