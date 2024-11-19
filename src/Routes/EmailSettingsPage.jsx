import style from "../styles/EmailSettingsPage.module.css";
import { useState } from "react";
import Navigation from "../modules/Navigation.jsx";
import FeedNavigation from "../modules/FeedNavigation.jsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const EmailSettingsPage = () => {
  const location = useLocation();
  const profile = location.pathname === "/settings/profile";
  const pass = location.pathname === "/settings/password";
  const mail = location.pathname === "/settings/email";
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = Cookies.get("userToken");

  if (!token) {
    return (
      <>
        <Navigation />
          <h1>Пользователь не авторизован</h1>
        <FeedNavigation/>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className={style.settings_mail}>
        <h1>Смена почты</h1>
        <div className={style.mail_inputs}>
          <form>
            <label>
              <span className={style.new_mail}>Новая почта</span>
              <input
                type="mail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <span className={style.wrong_new_mail}>Почта уже занята</span>
            </label>
            <label>
              <span className={style.password}>Пароль для подтверждения</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={style.wrong_password}>Неверный пароль</span>
            </label>
            <div className={style.button_submit}>
              <button>Сохранить</button>
            </div>
          </form>
        </div>

        <div className={style.select_setting}>
          <div
            className={style.main_setting}
            onClick={() => navigate("/settings/profile", { replace: false })}
            style={{
              borderBottom:
              profile && window.innerWidth < 1279
                ? "5px solid #0057FF"
                : "initial",
            borderLeft:
              profile && window.innerWidth > 1278
                ? "3px solid #0057FF"
                : "initial",
            }}
          >
            <p
              style={{
                color: profile ? "#0057FF" : "#000000",
                fontWeight: profile ? "600" : "400",
              }}
            >
              Настройки профиля
            </p>
          </div>
          <div
            className={style.pass_setting}
            onClick={() => navigate("/settings/password", { replace: false })}
            style={{
              borderBottom:
              pass && window.innerWidth < 1279
                ? "5px solid #0057FF"
                : "initial",
            borderLeft:
              pass && window.innerWidth > 1278
                ? "3px solid #0057FF"
                : "initial",
            }}
          >
            <p
              style={{
                color: pass ? "#0057FF" : "#000000",
                fontWeight: pass ? "600" : "400",
              }}
            >
              Смена пароля{" "}
            </p>
          </div>
          <div
            className={style.mail_setting}
            onClick={() => navigate("/settings/email", { replace: false })}
            style={{
              borderBottom:
              mail && window.innerWidth < 1279
                ? "5px solid #0057FF"
                : "initial",
            borderLeft:
              mail && window.innerWidth > 1278
                ? "3px solid #0057FF"
                : "initial",
            }}
          >
            <p
              style={{
                color: mail ? "#0057FF" : "#000000",
                fontWeight: mail ? "600" : "400",
              }}
            >
              Смена e-mail
            </p>
          </div>
        </div>
      </div>
      <FeedNavigation />
    </>
  );
};

export default EmailSettingsPage;
