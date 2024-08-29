import convertTime from "../assets/convertTime.js";
import convertDate from "../assets/convertDate.js";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/LastMsgs.module.css";
import PreloadLastMsgs from "../modules/PreloadLastMsgs.jsx";
import React, { useEffect, useState } from "react";
import { getMessages } from "../store/slices/messagesSlice.js";
import { getIcons } from "../store/slices/iconsSlice.js";
import thisStyle from "../styles/FeedPage.module.css";
import ActualThemes from "../modules/ActualThemes.jsx";
import Blogers from "../modules/Blogers.jsx";

const FeedPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const icons = useSelector((state) => state.icons);
  const iconsArr = [];
  const [times, setTimes] = useState([]);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes = messages.data.map((message) => {
        if (message) {
          return newTimeFunc(message.date, new Date());
        }
        return null;
      });
      setTimes(newTimes);
    }, 60000);

    return () => clearInterval(interval);
  }, [messages.data]);

  useEffect(() => {
    dispatch(getMessages());
    dispatch(getIcons());
  }, [dispatch]);

  const newTimeFunc = (date, newDate) => {
    return convertTime(convertDate(date), newDate);
  };

  useEffect(() => {
    if (window.innerWidth > 1279) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [window.innerWidthth]);

  if (!hidden && window.innerWidth < 1279) {
    document.body.classList.add("stop_scrolling");
  } else {
    document.body.classList.remove("stop_scrolling");
  }

  if (messages.isLoading && icons.isLoading) {
    return (
      <div className={style.last_msgs}>
        <p className={style.heading}>Последние сообщения</p>
        <PreloadLastMsgs />
        <PreloadLastMsgs />
        <PreloadLastMsgs />
        <PreloadLastMsgs />
      </div>
    );
  } else if (!messages.isLoading && !icons.isLoading) {
    icons.data.map((v) => {
      if (v) {
        iconsArr.push(v["url"]);
      }
    });

    return (
      <>
        <div
          className={thisStyle.black_div}
          style={{
            display: !hidden && window.innerWidth < 1279 ? "block" : "none",
          }}
          onClick={() => setHidden(true)}
        ></div>
        <div className={thisStyle.main_logo}>
          <div className={thisStyle.feed_pages}>
            <div className={thisStyle.header_main_div}>
              <button
                style={{
                  borderBottom: "5px solid #0057FF",
                }}
              >
                <img src="/imgs/home.svg" alt="Домой" />
                <p>Лента</p>
              </button>
            </div>
            <div className={thisStyle.header_profile_div}>
              <button>
                <img src="/imgs/user.svg" alt="Пользователь" />
                <p>Профиль</p>
              </button>
            </div>
            <div className={thisStyle.header_settings_div}>
              <button>
                <img src="/imgs/settings.svg" alt="Настройки" />
                <p>Настройки</p>
              </button>
            </div>
          </div>
          {/* <div className={thisStyle.add_post}>
            <button>
              <img src="/imgs/addPost.svg" alt="Написать пост" />
            </button>
          </div> */}
          <div className={thisStyle.feed_logo}>
            <img src="/imgs/whiteDulphin.svg" alt="logo" />
            <img src="/imgs/dulphin.svg" alt="logo" />
          </div>
          <div className={thisStyle.feed_my_profile}>
            <img src="/imgs/myIcon.svg" alt="" />
          </div>
        </div>

        <div className={thisStyle.greets}>
          <p>Что нового, Александр?</p>
        </div>

        <div
          className={thisStyle.post_block}
          style={{
            display: hidden ? "none" : "block",
          }}
        >
          <div className={thisStyle.swipe_line_div}>
            <div className={thisStyle.swipe_line}></div>
          </div>
          <div className={thisStyle.post_texstarea}>
            <textarea name="post" id="post" cols="50" rows="3"></textarea>
          </div>
          <div className={thisStyle.post_info}>
            <div className={thisStyle.add_picture}>
              <div className={thisStyle.photo}></div>
            </div>
            <div className={thisStyle.post_symbols_send}>
              <div className={thisStyle.symbols}>
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
                    strokeDasharray="439.6px"
                    strokeDashoffset="109.9px"
                  ></circle>
                </svg>

                <p>123</p>
              </div>
              <div className={thisStyle.circle}>
                <button>
                  <img src="/imgs/addPhoto.svg" alt="Добавить фото" />
                </button>
              </div>
              <div className={thisStyle.send}>
                <button>Отправить</button>
              </div>
            </div>
          </div>
        </div>

        <div className={thisStyle.flex_msgs_recommend}>
          <div
            className={style.last_msgs}
            style={{
              marginBottom: "40px",
            }}
          >
            <div
              className={style.allMsgs}
              style={{
                paddingBottom: "30px",
              }}
            >
              {messages.data.map((val, ind) => {
                return (
                  <React.Fragment key={val["user_id"]}>
                    <div className={style.msg}>
                      <div className={style.icon}>
                        <img alt="icon" src={iconsArr[ind]} />
                      </div>
                      <div className={style.info}>
                        <div className={style.name_time}>
                          <div className={style.name_div}>
                            <p className={style.name}>{val["name"]}</p>
                            <p>{val["mail"]}</p>
                          </div>
                          <div className={style.time}>
                            <p>
                              {times[ind] || newTimeFunc(val.date, new Date())}
                            </p>
                          </div>
                        </div>
                        <div className={style.text}>
                          <p>{val["message"]}</p>
                          <img
                            className={style.added_img}
                            src={val["img_message"]}
                          ></img>
                        </div>
                        <div className={style.send_like_dwld}>
                          <div className={style.send}>
                            <img src="/imgs/send.svg" alt="send" />
                            <p>{val["quantityReposts"]}</p>
                          </div>
                          <div className={style.like}>
                            <img src="/imgs/like.svg" alt="like" />
                            <p>{val["quantityLike"]}</p>
                          </div>
                          <div className={style.dwld}>
                            <img src="/imgs/dwld.svg" alt="download" />
                            <p>{val["quantityShare"]}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={style.line}></div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className={thisStyle.recommend}>
            <div className={thisStyle.my_info}>
              <div className={thisStyle.icon_name}>
                <img src="imgs/myIcon.svg" alt="Фото" />
                <div className={thisStyle.name_userName}>
                  <p>Александр</p>
                  <span>@burtovoy</span>
                </div>
              </div>
              <div className={thisStyle.more_info}>
                <div className={thisStyle.msgs}>
                  <p>45К</p>
                  <span>Сообщений</span>
                </div>
                <div className={thisStyle.my_subs}>
                  <p>28</p>
                  <span>Читаемых</span>
                </div>
                <div className={thisStyle.subs}>
                  <p>118</p>
                  <span>Читателей</span>
                </div>
              </div>
            </div>
            <ActualThemes className={thisStyle.actual_themes} />
            <Blogers />
          </div>
        </div>

        <div className={thisStyle.footer_feed}>
          <div
            className={thisStyle.footer_main_div}
            style={{
              borderBottom: "5px solid blue",
            }}
          >
            <button>
              <img src="/imgs/home.svg" alt="Домой" />
            </button>
          </div>
          <div className={thisStyle.footer_profile_div}>
            <button>
              <img src="/imgs/user.svg" alt="Пользователь" />
            </button>
          </div>
          <div className={thisStyle.footer_settings_div}>
            <button>
              <img src="/imgs/settings.svg" alt="Настройки" />
            </button>
          </div>
          <div className={thisStyle.footer_myself_div}>
            <button>
              <img src="/imgs/myIcon.svg" alt="Пользователь" />
            </button>
          </div>
        </div>
        <div className={thisStyle.add_post}>
          <button onClick={() => setHidden(false)}>
            <img src="/imgs/addPost.svg" alt="Написать пост" />
          </button>
        </div>
      </>
    );
  }
};

export default FeedPage;
