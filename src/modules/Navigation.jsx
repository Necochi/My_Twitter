import styleNav from "../styles/Navigation.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const settings = location.pathname === "/settings/profile";
  const feed = location.pathname === "/feed";
  const profile = location.pathname === "/profile";
  const pass = location.pathname === "/settings/password";
  const mail = location.pathname === "/settings/email";
  const navigate = useNavigate();

  return (
    <div className={styleNav.main_logo}>
      <div className={styleNav.feed_pages}>
        <div
          className={styleNav.header_main_div}
          style={{
            borderBottom: feed ? "5px solid #0057FF" : "none",
          }}
        >
          <button onClick={() => navigate("/feed", { replace: false })}>
            <img src="/imgs/home.svg" alt="Домой" />
            <p
              style={{
                color: feed ? "blue" : "black",
                fontWeight: feed ? "600" : "400",
              }}
            >
              Лента
            </p>
          </button>
        </div>
        <div
          className={styleNav.header_profile_div}
          style={{
            borderBottom: profile ? "5px solid #0057FF" : "none",
          }}
        >
          <button onClick={() => navigate("/profile", { replace: false })}>
            <img src="/imgs/user.svg" alt="Пользователь" />
            <p
              style={{
                color: profile ? "blue" : "black",
                fontWeight: profile ? "600" : "400",
              }}
            >
              Профиль
            </p>
          </button>
        </div>
        <div
          className={styleNav.header_settings_div}
          style={{
            borderBottom: (settings || pass || mail) ? "5px solid #0057FF" : "none",
          }}
        >
          <button
            onClick={() => navigate("/settings/profile", { replace: false })}
          >
            <img src="/imgs/settings.svg" alt="Настройки" />
            <p
              style={{
                color: (settings || pass || mail) ? "blue" : "black",
                fontWeight: (settings || pass || mail) ? "600" : "400",
              }}
            >
              Настройки
            </p>
          </button>
        </div>
      </div>
      <div className={styleNav.feed_logo}>
        <img src="/imgs/whiteDulphin.svg" alt="logo" />
        <img src="/imgs/dulphin.svg" alt="logo" />
      </div>
      <div className={styleNav.feed_my_profile}>
        <img src="/imgs/myIcon.svg" alt="" />
      </div>
    </div>
  );
};

export default Navigation;
