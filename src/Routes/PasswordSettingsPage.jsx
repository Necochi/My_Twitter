import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import FeedNavigation from '../modules/FeedNavigation.jsx';
import Navigation from '../modules/Navigation.jsx';
import style from '../styles/PasswordSettingsPage.module.css';

function PasswordSettingsPage() {
  const location = useLocation();
  const profile = location.pathname === '/settings/profile';
  const pass = location.pathname === '/settings/password';
  const mail = location.pathname === '/settings/email';
  const navigate = useNavigate();
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [repeatNewPass, setRepeatNewPass] = useState('');
  const [message, setMessage] = useState('');
  const token = Cookies.get('userToken');

  const checkPass = () => {
    if (oldPass === '' || newPass === '' || repeatNewPass === '') {
      return 'Заполните пустые поля!';
    }
    if (newPass !== repeatNewPass) {
      return 'Новые пароли не совпадают!';
    }
    if (newPass.length <= 5 || repeatNewPass.length <= 5) {
      return 'Пароль должен состоять минимум из 6 символов!';
    }
    if (oldPass === newPass) {
      return 'Новый пароль не должен совпадать со старым!';
    }
    return 'Пароль изменён!';
  };

  async function sendPass(e) {
    e.preventDefault();
    const result = checkPass();
    console.log(result);
    if (result === 'Пароль изменён!') {
      try {
        fetch('/changePass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldPass,
            newPass,
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
            </label>
            <label>
              <span className={style.new_pass}>Новый пароль</span>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
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
              <span
                className={style.wrong_repeat_new_pass}
                style={{
                  display: message === '' ? 'none' : 'flex',
                  backgroundColor: message === 'Пароль изменён!' ? '#05d305' : 'red',
                }}
              >
                {message}
              </span>
            </label>
            <div className={style.button_submit}>
              <button
                onClick={sendPass}
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

export default PasswordSettingsPage;
