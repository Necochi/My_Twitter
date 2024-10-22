import style from "../styles/ProfileSettingsPage.module.css";
import Navigation from "../modules/Navigation.jsx";
import FeedNavigation from "../modules/FeedNavigation.jsx";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProfileSettingsPage = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [about, setAbout] = useState("");
  const [loca, setLoca] = useState("");
  const [web, setWeb] = useState("");
  const [birthday, setBirthday] = useState("");
  const [whoSeeBirth, setWhoSeeBirth] = useState("");
  const location = useLocation();
  const profile = location.pathname === "/settings/profile";
  const pass = location.pathname === "/settings/password";
  const mail = location.pathname === "/settings/email";
  const navigate = useNavigate();

  return (
    <>
      <Navigation />

      <div className={style.main_settings}>
        <h1>Настройки профиля</h1>
        <div className={style.settings_form}>
          <form>
            <div className={style.name_photo}>
              <div className={style.photo}>
                <label className={style.avatar}>
                  <input
                    type="button"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </label>
              </div>
              <div className={style.names}>
                <label>
                  <span className={style.spanName}>Имя</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label>
                  <span className={style.spanNickname}>Никнейм</span>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <span className={style.wrong_spanNickname}>
                    Этот никнейм уже занят
                  </span>
                </label>
              </div>
            </div>
            <form>
              <label>
                <span className={style.spanAbout}>О себе</span>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
              <label>
                <span className={style.spanLocation}>Геолокация</span>
                <input
                  type="text"
                  value={loca}
                  onChange={(e) => setLoca(e.target.value)}
                />
              </label>
              <label>
                <span className={style.spanWeb}>Веб сайт</span>
                <input
                  type="text"
                  value={web}
                  onChange={(e) => setWeb(e.target.value)}
                />
              </label>
              <div className={style.birthday}>
                <label className={style.birth}>
                  <span className={style.spanBirth}>День рождения</span>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </label>
                <label className={style.birth_see}>
                  <span className={style.spanBirthSee}>
                    Кто видит день рождения
                  </span>
                  <select onChange={(e) => setWhoSeeBirth(e.target.value)}>
                    <option value="value1" selected>
                      Только я
                    </option>
                    <option value="value2">Все</option>
                  </select>
                </label>
              </div>
            </form>
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
                  ? "5px solid #0057FF"
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
                  ? "5px solid #0057FF"
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

export default ProfileSettingsPage;
