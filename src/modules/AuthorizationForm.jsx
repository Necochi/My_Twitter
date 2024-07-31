import { useDispatch, useSelector } from "react-redux";
import style from "../styles/AuthorizationForm.module.css";
import { useEffect, useRef, useState } from "react";
import { hideSignForm } from "../store/slices/signFormSlice";
const AuthorizationForm = () => {
  const dispatch = useDispatch();
  const signState = useSelector((state) => state.signForm.isHidden);
  const [isEmailFocused, setIsEmailFocused] = useState();
  const [isPassFocused, setIsPassFocused] = useState();
  const swipeRef = useRef();
  const emailPlch = useRef();
  const emailPlchSpan = useRef();
  const passPlch = useRef();
  const passPlchSpan = useRef();
  let hidden = {};
  let hiddenwrong = {
    display: "none",
  };
  useEffect(() => {
    swipeRef.current.addEventListener("swiped-down", () => {
      dispatch(hideSignForm());
    });
    return swipeRef.current.removeEventListener("swiped-down", () => {
      dispatch(hideRegForm());
    });
  }, [dispatch]);

  if (signState) {
    hidden.display = "none";
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
          placeholder={isEmailFocused ? "" : "Электронная почта"}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          ref={emailPlch}
        />
        <span
          className={style.email_plchold_sign}
          ref={emailPlchSpan}
          onFocus={() => setIsPassFocused(true)}
          onBlur={() => setIsPassFocused(false)}
          style={{
            display: isEmailFocused ? "" : "none",
          }}
        >
          Электронная почта
        </span>
        <label htmlFor="password" id="passCheck_signIn_label"></label>
        <input
          type="password"
          name="password"
          id="passCheck_signIn"
          placeholder={isPassFocused ? "" : "Пароль"}
          ref={passPlch}
          onFocus={() => setIsPassFocused(true)}
          onBlur={() => setIsPassFocused(false)}
        />
        <span
          className={style.pass_plchold_sign}
          ref={passPlchSpan}
          onFocus={() => setIsPassFocused(true)}
          onBlur={() => setIsPassFocused(false)}
          style={{display: isPassFocused ? '' : 'none'}}
        >
          Пароль
        </span>
        <span className={style.pass_p_sign} style={hiddenwrong}>
          Пароль не верный
        </span>
        <button type="button">Войти</button>
      </form>
    </div>
  );
};

export default AuthorizationForm;
