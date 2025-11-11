import { useDispatch, useSelector } from 'react-redux';
import RegSignButtonsUp from './modules/RegSignButtonsUp';
import LastMsgs from './modules/LastMsgs';
import Statistic from './modules/Statistic';
import RegSignButtonsDown from './modules/RegSignButtonsDown';
import RegistrationForm from './modules/RegistrationForm';
import AuthorizationForm from './modules/AuthorizationForm';
import './App.css';
import { hideRegForm } from './store/slices/regFormSlice';
import { hideSignForm } from './store/slices/signFormSlice';
import ActualThemes from './modules/ActualThemes';
import Blogers from './modules/Blogers';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const regState = useSelector((state) => state.regForm.isHidden);
  const signState = useSelector((state) => state.signForm.isHidden);
  const [valid, setValid] = useState();
  const navigate = useNavigate();
  let hidden = {};
  if (!regState || !signState) {
    document.body.classList.add('stop_scrolling');
  } else {
    document.body.classList.remove('stop_scrolling');
    hidden.display = 'none';
  }

  // console.log("Cookies:", Cookies.get("userToken"));
  // const token = Cookies.get("userToken");
  // if (token) {
    const ValidToken = () => {
      fetch('/api/feed', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      })
      .then((res) => {
        if (!res.ok) {
          console.log('Токен неверный');
          setValid(false);
          return res.text().then((text) => {
            console.log('Ответ сервера:', text);
            throw new Error('Unauthorized');
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log('Токен верный:', data);
        setValid(true);
      })
      .catch((error) => {
        console.log('Ошибка ValidToken:', error);
        setValid(false);
      });
    };

  useEffect(() => {
    ValidToken();
  }, [])

  if (valid) {
   navigate('/feed');
  }


  return (
    <>
      <div
        className="black_block"
        style={hidden}
        onClick={() => {
          dispatch(hideRegForm());
          dispatch(hideSignForm());
        }}
      ></div>
      <RegSignButtonsUp />
      <Statistic />
      <div className="information">
        <div className="msgs_heading">
          <p className="header">Последние сообщения</p>
          <LastMsgs />
          <div className="blur_div"></div>
        </div>
        <div className="themes_blogers">
          <ActualThemes className="themes_module" />
          <Blogers className="blogers_module" />
        </div>
      </div>
      <RegSignButtonsDown />
      <RegistrationForm />
      <AuthorizationForm />
    </>
  );
};

export default App;
