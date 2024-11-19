import React from "react";
import thisStyle from "../styles/FeedPage.module.css";
import ActualThemes from "../modules/ActualThemes.jsx";
import Blogers from "../modules/Blogers.jsx";
import Navigation from "../modules/Navigation.jsx";
import FeedNavigation from "../modules/FeedNavigation.jsx";
import LastMsgs from "../modules/LastMsgs.jsx";
import CreatePost from "../modules/CreatePost.jsx";

const FeedPage = () => {

    return (
      <>
        <Navigation />
        <div className={thisStyle.flex_msgs_recommend}>
          <div className={thisStyle.greets_msgs}>
            <CreatePost />
              <div className={thisStyle.last_msgs}>
              <LastMsgs />
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

        <FeedNavigation
          style={{
            display: window.innerWidth < 1279 ? "block" : "none",
          }}
        />
      </>
    );
  }

export default FeedPage;
