import feedStyle from "../styles/FeedNavigation.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FeedNavigation = () => {
  const location = useLocation();
  const settings = location.pathname === "/settings/profile";
  const feed = location.pathname === "/feed";
  const profile = location.pathname === "/profile";
  const pass = location.pathname === "/settings/password";
  const mail = location.pathname === "/settings/email";
  const navigate = useNavigate();
  return (
    <div className={feedStyle.footer_feed}>
      <div className={feedStyle.footer_main_div}>
        <button
          style={{
            borderBottom: feed ? "solid 4px blue" : "solid 4px #ffffff",
          }}
          onClick={() => navigate("/feed", { replace: false })}
        >
          <img src="/imgs/home.svg" alt="Домой" />
        </button>
      </div>
      <div className={feedStyle.footer_profile_div}>
        <button
          style={{
            borderBottom: profile ? "solid 4px blue" : "solid 4px #ffffff",
          }}
          onClick={() => navigate("/profile", { replace: false })}
        >
          <img src="/imgs/user.svg" alt="Пользователь" />
        </button>
      </div>
      <div className={feedStyle.footer_settings_div}>
        <button
          style={{
            borderBottom: (settings || pass || mail) ? "solid 4px blue" : "solid 4px #ffffff",
          }}
          onClick={() => navigate("/settings/profile", { replace: false })}
        >
          <img src="/imgs/settings.svg" alt="Настройки" />
        </button>
      </div>
      <div className={feedStyle.footer_myself_div}>
        <button
          style={{
            borderBottom: "solid 4px #ffffff",
          }}
        >
          <img src="/imgs/myIcon.svg" alt="Пользователь" />
        </button>
      </div>
    </div>
  );
};

export default FeedNavigation;
