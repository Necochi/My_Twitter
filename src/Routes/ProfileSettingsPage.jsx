import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import { Widget } from '@uploadcare/react-widget';
import style from '../styles/ProfileSettingsPage.module.css';
import Navigation from '../modules/Navigation.jsx';
import FeedNavigation from '../modules/FeedNavigation.jsx';

function ProfileSettingsPage() {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [about, setAbout] = useState('');
  const [loca, setLoca] = useState('');
  const [web, setWeb] = useState('');
  const [birthday, setBirthday] = useState('');
  const [whoSeeBirth, setWhoSeeBirth] = useState('');
  const [userData, setUserData] = useState(null);
  const [nicknameUsed, setNicknameUsed] = useState(null);
  const location = useLocation();
  const profile = location.pathname === '/settings/profile';
  const pass = location.pathname === '/settings/password';
  const mail = location.pathname === '/settings/email';
  const navigate = useNavigate();
  const token = Cookies.get('userToken');
  const handleFileUpload = (fileInfo) => {
    setAvatar(fileInfo.cdnUrl);
  };

  const getUserInfo = () => {
    try {
      fetch('/getUserInfo', {
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
          setUserData(data);
          if (data.user) {
            setNickname(data.user.nickname);
            setAvatar(data.user.avatar);
            setName(data.user.name);
            setAbout(data.user.about);
            setLoca(data.user.location);
            setWeb(data.user.website);
            setBirthday(data.user.birthday.slice(0, 10));
            setWhoSeeBirth(data.user.whoSeeBirthday);
          }
        })
        .catch((error) => {
          console.log('ошибка', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserInfo = () => {
    try {
      fetch('/updateUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar,
          name,
          nickname,
          about,
          location: loca,
          website: web,
          birthday,
          whoSeeBirthday: whoSeeBirth,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((error) => {
              throw new Error(error.error);
            });
          }
          console.log('succsess user update!');
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setNicknameUsed(data.nicknameUsed);
          getUserInfo();
        })
        .catch((error) => {
          console.log('ошибка', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  if (!token) {
    return (
      <>
        <Navigation />
        <h1>Пользователь не авторизован</h1>
        <FeedNavigation />
      </>
    );
  }
console.log(nickname);

  if (userData && userData.user) {
    return (
      <>
        <Navigation />

        <div className={style.main_settings}>
          <h1>Настройки профиля</h1>
          <div className={style.settings_form}>
            <form>
              <div className={style.name_photo}>
                <div className={style.photo}>
                  <div className={style.avatar_div}>
                    <img src={avatar} alt="avatar" />
                  </div>
                  <Widget
                    style={{
                      width: '40px',
                    }}
                    publicKey="8712be514bdf73095914"
                    onChange={(fileInfo) => handleFileUpload(fileInfo)}
                  />
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
                    <span
                      className={style.spanNickname}
                      style={{
                        color: nicknameUsed ? '#E40060' : '#B1B1B1',
                      }}
                    >
                      {nicknameUsed ? 'Никнейм занят' : 'Никнейм'}
                    </span>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      style={{
                        border: nicknameUsed ? '1px solid #E40060' : '#dfdfdf 1px solid',
                        backgroundColor: nicknameUsed ? '#FFDEEC' : 'initial',
                      }}
                    />
                  </label>
                </div>
              </div>
            </form>
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
                  <select onChange={(e) => setWhoSeeBirth(e.target.value === 'true')}>
                    <option value="false" defaultValue={whoSeeBirth === false}>
                      Только я
                    </option>
                    <option value="true" defaultValue={whoSeeBirth === true}>Все</option>
                  </select>
                </label>
              </div>
            </form>
            <div className={style.button_submit}>
              <button
                type="button"
                onClick={updateUserInfo}
              >
                Сохранить
              </button>
            </div>
          </div>
          <div className={style.select_setting}>
            <div
              className={style.main_setting}
              onClick={() => navigate('/settings/profile', { replace: false })}
              style={{
                borderBottom:
                profile && window.innerWidth < 1279
                  ? '5px solid #0057FF'
                  : 'initial',
                borderLeft:
                profile && window.innerWidth > 1278
                  ? '3px solid #0057FF'
                  : 'initial',
              }}
            >
              <p
                style={{
                  color: profile ? '#0057FF' : '#000000',
                  fontWeight: profile ? '600' : '400',
                }}
              >
                Настройки профиля
              </p>
            </div>
            <div
              className={style.pass_setting}
              onClick={() => navigate('/settings/password', { replace: false })}
              style={{
                borderBottom:
                pass && window.innerWidth < 1279
                  ? '5px solid #0057FF'
                  : 'initial',
                borderLeft:
                pass && window.innerWidth > 1278
                  ? '5px solid #0057FF'
                  : 'initial',
              }}
            >
              <p
                style={{
                  color: pass ? '#0057FF' : '#000000',
                  fontWeight: pass ? '600' : '400',
                }}
              >
                Смена пароля
                {' '}
              </p>
            </div>
            <div
              className={style.mail_setting}
              onClick={() => navigate('/settings/email', { replace: false })}
              style={{
                borderBottom:
                mail && window.innerWidth < 1279
                  ? '5px solid #0057FF'
                  : 'initial',
                borderLeft:
                mail && window.innerWidth > 1278
                  ? '5px solid #0057FF'
                  : 'initial',
              }}
            >
              <p
                style={{
                  color: mail ? '#0057FF' : '#000000',
                  fontWeight: mail ? '600' : '400',
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
  }
}

export default ProfileSettingsPage;
