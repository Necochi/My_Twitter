import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/AuthorizationForm.module.css';
import { hideSignForm } from '../store/slices/signFormSlice.js';

function AuthorizationForm() {
  const dispatch = useDispatch();
  const signState = useSelector((state) => state.signForm.isHidden);
  const [isEmailFocused, setIsEmailFocused] = useState();
  const [isPassFocused, setIsPassFocused] = useState();
  const [email, setEmail] = useState('');
  const [trueEmail, setTrueEmail] = useState(null);
  const [pass, setPass] = useState('');
  const [truePass, setTruePass] = useState(null);
  const [trueLogin, setTrueLogin] = useState(null);
  const swipeRef = useRef();
  const emailPlch = useRef();
  const emailPlchSpan = useRef();
  const passPlch = useRef();
  const passPlchSpan = useRef();
  const navigate = useNavigate();
  const hidden = {};
  const hiddenwrong = {
    display: 'none',
  };
  useEffect(() => {
    swipeRef.current.addEventListener('swiped-down', () => {
      dispatch(hideSignForm());
    });
    return swipeRef.current.removeEventListener('swiped-down', () => {
      dispatch(hideSignForm());
    });
  }, [dispatch]);

  const wrongEmail = () => {
    if (email === '') {
      console.log('wrong email log');
      return false;
    }
    console.log('correct email!');
    return true;
  };

  const wrongPass = () => {
    if (pass === '') {
      console.log('wrong pass log');
      return false;
    }
    console.log('correct pass!');
    return true;
  };

  const loginUser = () => {
      if (wrongEmail() && wrongPass()) {
        console.log('logining...');
        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mail: email,
            password: pass,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              return res.json().then((error) => {
                setTrueLogin(false);
                throw new Error(error.error);
              });
            }
            console.log('succsess!');
            setTrueLogin(true);
            navigate('/feed');
            return res.json();
          })
          .catch((error) => {
            setTrueLogin(false);
            console.log('ошибка', error);
          });
        }
      setTrueLogin(false);
  };

  if (signState) {
    hidden.display = 'none';
  }

  return (
    <div className={style.hidden_sign} style={hidden}>
      <div className={style.swipe_line_sign} ref={swipeRef}>
        <div className={style.swipe_line} id="swipe_line"></div>
      </div>

      <form action="" id="signIn_form">
        <div className={style.close_legend}>
          <div
            className={style.closeBtn}
            onClick={() => dispatch(hideSignForm())}
          >
            <img src="/imgs/close_btn.svg" alt="close" />
          </div>
          <legend>Авторизация</legend>
        </div>

        <label htmlFor="email" id="emailSign_label"></label>
        <input
          type="email"
          name="email"
          id="email_signIn"
          placeholder={isEmailFocused ? '' : 'Электронная почта'}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailPlch}
        />
        <span
          className={style.email_plchold_sign}
          ref={emailPlchSpan}
          style={{
            display: isEmailFocused ? '' : 'none',
          }}
        >
          Электронная почта
        </span>
        <label htmlFor="password" id="passCheck_signIn_label"></label>
        <input
          type="password"
          name="password"
          id="passCheck_signIn"
          placeholder={isPassFocused ? '' : 'Пароль'}
          ref={passPlch}
          onFocus={() => setIsPassFocused(true)}
          onBlur={() => setIsPassFocused(false)}
          onChange={(e) => setPass(e.target.value)}
        />
        <span
          className={style.pass_plchold_sign}
          ref={passPlchSpan}
          style={{ display: isPassFocused ? '' : 'none' }}
        >
          Пароль
        </span>
        <span className={style.pass_p_sign} style={hiddenwrong}>
          Пароль не верный
        </span>
        <button
          type="button"
          onClick={loginUser}
        >
          Войти
        </button>
      </form>
      <div
        className={style.trueLogin}
        style={{
          visibility: (trueLogin && trueLogin !== null) ? 'visible' : 'hidden',
        }}
      >
        <p>Успешный вход!</p>
      </div>
      <div
        className={style.falseLogin}
        style={{
          visibility: (!trueLogin && trueLogin !== null) ? 'visible' : 'hidden',
        }}
      >
        <p>Неправильный логин либо пароль!</p>
      </div>
    </div>
  );
}

export default AuthorizationForm;
