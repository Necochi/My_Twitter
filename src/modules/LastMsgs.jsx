import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import convertTime from '../assets/convertTime.js';
import style from '../styles/LastMsgs.module.css';
import PreloadLastMsgs from './PreloadLastMsgs.jsx';
import { getIcons } from '../store/slices/iconsSlice.js';
import { getPosts } from '../store/slices/postSlice.js';

function LastMsgs() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const icons = useSelector((state) => state.icons);
  const iconsArr = [];
  const [times, setTimes] = useState([]);
  const [dbPosts, setDbPosts] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dispatch(getIcons());
    dispatch(getPosts());
  }, [dispatch]);

  const getAllUsers = () => {
    try {
      fetch('/getAllUsers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((error) => {
              throw new Error(error.error);
            });
          }
          console.log('succsess getting user info');
          return res.json();
        })
        .then((data) => {
          console.log(data);

          setUserData(data);
        })
        .catch((error) => {
          console.log('ошибка', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes = posts.data.map((message) => {
        if (message) {
          return convertTime(new Date(message.date), new Date());
        }
        return null;
      });
      setTimes(newTimes);
    }, 60000);

    return () => clearInterval(interval);
  }, [dbPosts]);

  const reversedPosts = Array.isArray(posts.data) ? [...posts.data].reverse() : [];

  if (posts.isLoading && !userData) {
    return (
      <>
        <PreloadLastMsgs />
        <PreloadLastMsgs />
        <PreloadLastMsgs />
        <PreloadLastMsgs />
      </>
    );
  } if (!posts.isLoading && userData) {
    const completeUserInfo = reversedPosts.map((post) => {
      const user = userData.find((u) => u.id === post.userId);
      return {
        ...post, // Все данные поста
        avatar: user ? user.avatar : '', // Аватар пользователя
      };
    });
    return (
      <div
        className={style.allMsgs}
        style={{
          paddingBottom: '30px',
        }}
      >
        {completeUserInfo.map((val, ind) => (
          <React.Fragment key={val.userId}>
            <div className={style.msg}>
              <div className={style.icon}>
                <img alt="icon" src={val.avatar} />
              </div>
              <div className={style.info}>
                <div className={style.name_time}>
                  <div className={style.name_div}>
                    <p className={style.name}>{val.name}</p>
                    <p>{val.mail}</p>
                  </div>
                  <div className={style.time}>
                    <p>
                      {convertTime(new Date(val.date), new Date())}
                    </p>
                  </div>
                </div>
                <div className={style.text}>
                  <p>{val.message}</p>
                  <img
                    className={style.added_img}
                    src={val.imgMessage}
                    alt=""
                  />
                </div>
                <div className={style.send_like_dwld}>
                  <div className={style.send}>
                    <img src="/imgs/send.svg" alt="send" />
                    <p>{val.quantityReposts}</p>
                  </div>
                  <div className={style.like}>
                    <img src="/imgs/like.svg" alt="like" />
                    <p>{val.quantityLike}</p>
                  </div>
                  <div className={style.dwld}>
                    <img src="/imgs/dwld.svg" alt="download" />
                    <p>{val.quantityShare}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.line} />
          </React.Fragment>
        ))}
      </div>
    );
  }
}
export default LastMsgs;
