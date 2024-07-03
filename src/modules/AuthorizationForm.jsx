import validateEmail from "../public/assets/validateEmail";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/AuthorizationForm.module.css";
import { useEffect, useRef } from "react";
import { hideSignForm } from "../store/slices/signFormSlice";
const AuthorizationForm = () => {
  const dispatch = useDispatch();
  const signState = useSelector((state) => state.signForm.isHidden);
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
    emailPlch.current.addEventListener("focus", () => {
      emailPlch.current.placeholder = "";
      emailPlchSpan.current.style.display = "";
    });
    emailPlch.current.addEventListener("focusout", () => {
      emailPlch.current.placeholder = "Электронная почта";
      emailPlchSpan.current.style.display = "none";
    });
    passPlch.current.addEventListener("focus", () => {
      passPlch.current.placeholder = "";
      passPlchSpan.current.style.display = "";
    });
    passPlch.current.addEventListener("focusout", () => {
      passPlch.current.placeholder = "Пароль";
      passPlchSpan.current.style.display = "none";
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
        <legend>Авторизация</legend>

        <label htmlFor="email" id="emailSign_label"></label>
        <input
          type="email"
          name="email"
          id="email_signIn"
          placeholder="Электронная почта"
          ref={emailPlch}
        />
        <span
          className={style.email_plchold_sign}
          ref={emailPlchSpan}
          style={{ display: "none" }}
        >
          Электронная почта
        </span>
        <label htmlFor="password" id="passCheck_signIn_label"></label>
        <input
          type="password"
          name="password"
          id="passCheck_signIn"
          placeholder="Пароль"
          ref={passPlch}
        />
        <span
          className={style.pass_plchold_sign}
          ref={passPlchSpan}
          style={{ display: "none" }}
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
