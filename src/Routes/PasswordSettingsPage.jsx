import style from "../styles/PasswordSettingsPage.module.css";
import { useState } from "react";
import Navigation from "../modules/Navigation.jsx";
import FeedNavigation from "../modules/FeedNavigation.jsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PasswordSettingsPage = () => {
  const location = useLocation();
  const profile = location.pathname === "/settings/profile";
  const pass = location.pathname === "/settings/password";
  const mail = location.pathname === "/settings/email";
  const navigate = useNavigate();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatNewPass, setRepeatNewPass] = useState("");
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
      <div className={style.settings_pass}>
        <h1>Смена пароля</h1>
        <div className={style.pass_inputs}>
          <form>
            <label>
              <span className={style.old_pass}>Старый пароль</span>
              <input
                type="password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
              <span className={style.wrong_old_pass}>
                Неверный старый пароль
              </span>
            </label>
            <label>
              <span className={style.new_pass}>Новый пароль</span>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <span className={style.wrong_new_pass}>Пароли не совпадают</span>
            </label>
            <label>
              <span className={style.repeat_new_pass}>
                Повторите новый пароль
              </span>
              <input
                type="password"
                value={repeatNewPass}
                onChange={(e) => setRepeatNewPass(e.target.value)}
              />
              <span className={style.wrong_repeat_new_pass}>
                Пароли не совпадают
              </span>
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

export default PasswordSettingsPage;
