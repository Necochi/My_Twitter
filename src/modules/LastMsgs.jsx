import convertTime from "../public/assets/convertTime.js";
import convertDate from "../public/assets/convertDate.js";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/LastMsgs.module.css";
import PreloadLastMsgs from "./PreloadLastMsgs";
import React, { useEffect, useState } from "react";
import { getMessages } from "../store/slices/messagesSlice";
import { getIcons } from "../store/slices/iconsSlice";
const LastMsgs = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const icons = useSelector((state) => state.icons);
  const iconsArr = [];
  const [times, setTimes] = useState([]);

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
      <div className={style.last_msgs}>
        <p className={style.heading}>Последние сообщения</p>
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
                      <p>{times[ind] || newTimeFunc(val.date, new Date())}</p>
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
                      <img src="/assets/imgs/send.svg" alt="send" />
                      <p>{val["quantityReposts"]}</p>
                    </div>
                    <div className={style.like}>
                      <img src="/assets/imgs/like.svg" alt="like" />
                      <p>{val["quantityLike"]}</p>
                    </div>
                    <div className={style.dwld}>
                      <img
                        src="/assets/imgs/dwld.svg"
                        alt="download"
                      />
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
    );
  }
};
export default LastMsgs;
