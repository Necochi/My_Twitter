import style from "../styles/CreatePost.module.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Widget } from "@uploadcare/react-widget";
import { addNewPost, getPosts } from "../store/slices/postSlice.js";
import postSize from "../assets/post_size.js";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const [hidden, setHidden] = useState(true);
  const [postSizeNumber, setPostSizeNumber] = useState(0);
  const [error, setError] = useState(null);
  const [post, setPost] = useState("");
  const [show, setShow] = useState(null);

  const circumference = 2 * 3.14 * 70;
  const procent = (postSizeNumber / 300) * 100;
  const offset = circumference * ((100 - procent) / 100);
  const handleFileUpload = (fileInfo) => {
    setImgUrl(fileInfo.cdnUrl);
  };

  useEffect(() => {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
    }, 2000);

    // Чистим таймер при размонтировании компонента
    return () => clearTimeout(timer);
  }, [error]);

  const handleSavePost = (e) => {
    if (postSizeNumber > 1) {
      e.preventDefault();
      const postData = {
        name: "name",
        message: post,
        imgMessage: imgUrl,
      };

      dispatch(addNewPost(postData));

      dispatch(getPosts())
      setError(false);
      setHidden(true);
      setPost("");
      setPostSizeNumber('')
      setImgUrl("");
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    setPostSizeNumber(postSize(post));
  }, [post]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (!hidden && window.innerWidth < 1279) {
    document.body.classList.add("stop_scrolling");
  } else {
    document.body.classList.remove("stop_scrolling");
  }

  return (
    <>
    <div
          className={style.invisible_div}
          style={{
            display: !hidden && window.innerWidth > 1278 ? "block" : "none",
          }}
          onClick={() => {
            setHidden(true);
            setError(null);
          }}
        ></div>

    <div
          className={style.msgSend}
          style={{
            display: !error && error !== null && show ? "block" : "none",
          }}
        >
          Пост создан!
        </div>
        <div
          className={style.msgNotSend}
          style={{
            display: error && error !== null && show ? "block" : "none",
          }}
        >
          Ошибка создания!
        </div>
        <div
          className={style.black_div}
          style={{
            display:
              window.innerWidth < 1279 && (error || !hidden) ? "block" : "none",
          }}
          onClick={() => {
            setHidden(true);
            setError(null);
          }}
        ></div>
    <div
      className={style.greets}
      onClick={() => setHidden(false)}
      style={{
        display: hidden && window.innerWidth > 1278 ? "block" : "none",
      }}
    >
      <button>Что нового, Александр?</button>
      </div>
      <div
        className={style.post_block}
        style={{
          display: hidden ? "none" : "block",
        }}
      >
        <div className={style.swipe_line_div}>
          <div className={style.swipe_line}></div>
        </div>
        <div className={style.post_texstarea}>
          <textarea
            onChange={(e) => setPost(e.target.value)}
            maxLength={300}
            name="post"
            id="post"
            cols="50"
            rows="3"
            style={{
              resize: "none",
              overflowY: "hidden",
              height: "auto",
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          ></textarea>
        </div>
        <div className={style.post_info}>
          <div className={style.add_picture}>
            <div className={style.photo}></div>
          </div>
          <div className={style.post_symbols_send}>
            <div className={style.symbols}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 160 160"
                style={{ transform: "rotate(-90deg)" }}
            >
                <circle
                  r="70"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  stroke="#DFDFDF"
                  strokeWidth="10px"
                ></circle>
                <circle
                  r="70"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  stroke="#0057FF"
                  strokeLinecap="round"
                  strokeWidth="10px"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                ></circle>
              </svg>

              <p
                style={{
                  marginLeft:
                    postSizeNumber > 99
                    ? "0"
                    : postSizeNumber > 9
                    ? "6px"
                    : "13px",
                }}
              >
              {postSizeNumber}
              </p>
            </div>
              <div className={style.circle}>
                {/* <img src="/imgs/addPhoto.svg" alt="Добавить фото" /> */}
                <Widget
                  style={{
                    width: "40px",
                  }}
                  publicKey="8712be514bdf73095914"
                  onChange={(fileInfo) => handleFileUpload(fileInfo)}
                />
              </div>
              <div className={style.send}>
                <button onClick={handleSavePost}>Отправить</button>
              </div>
            </div>
          </div>
        </div>
        <div className={style.add_post}>
          <button onClick={() => setHidden(false)}>
            <img src="/imgs/addPost.svg" alt="Написать пост" />
          </button>
        </div>
    </>
  )
}

export default CreatePost;