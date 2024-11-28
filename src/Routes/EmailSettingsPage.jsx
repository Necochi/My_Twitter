import validateEmail from "../assets/validateEmail.js";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import FeedNavigation from '../modules/FeedNavigation.jsx';
import Navigation from '../modules/Navigation.jsx';
import style from '../styles/EmailSettingsPage.module.css';

function EmailSettingsPage() {
  const location = useLocation();
  const profile = location.pathname === '/settings/profile';
  const pass = location.pathname === '/settings/password';
  const mail = location.pathname === '/settings/email';
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const token = Cookies.get('userToken');

  function checkMail() {
    if (password === '' || newEmail === '') {
      return 'Заполните пустые поля!';
    }
    if (!validateEmail(newEmail)) {
      return 'Неправильная почта';
    }
    return 'Почта успешно изменена!';
  }

  async function changeMail(e) {
    e.preventDefault();
    const result = checkMail();
    console.log(result);
    if (result === 'Почта успешно изменена!') {
      try {
        fetch('/changeMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newEmail,
            password,
          }),
        })
          .then(async (res) => {
            if (res.ok) {
              console.log(res);
              setMessage(result);
              console.log('succsess!');
              return res.json();
            }
            const data = await res.json();
            console.log(data);

            setMessage(data);
          })
          .catch((error) => {
            console.log('ошибка', error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setMessage(result);
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании или изменении message
    }
  }, [message]);

  if (!token) {
    return (
      <>
        <Navigation />
        <h1>Пользователь не авторизован</h1>
        <FeedNavigation />
      </>
    );
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
            </label>
            <label>
              <span className={style.password}>Пароль для подтверждения</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className={style.button_submit}>
              <span
                className={style.wrong_mail}
                style={{
                  display: message === '' ? 'none' : 'flex',
                  backgroundColor: message === 'Почта успешно изменена!' ? '#05d305' : 'red',
                }}
              >
                {message}
              </span>
              <button
                onClick={changeMail}
              >
                Сохранить
              </button>
            </div>
          </form>
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
                ? '3px solid #0057FF'
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
                ? '3px solid #0057FF'
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

export default EmailSettingsPage;
