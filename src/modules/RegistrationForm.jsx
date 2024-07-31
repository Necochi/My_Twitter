import validateEmail from "../assets/validateEmail.js";
import { useEffect, useRef, useState } from "react";
import style from "../styles/RegistrationForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { hideRegForm } from "../store/slices/regFormSlice";
const RegistrationForm = () => {
  const dispatch = useDispatch();
  const regState = useSelector((state) => state.regForm.isHidden);
  const [email, setEmail] = useState("");
  const [trueEmail, setTrueEmail] = useState(false);
  let resultEmail;
  const [pass, setPass] = useState("");
  const [truePass, setTruePass] = useState(false);
  const [passCheck, setPassCheck] = useState("");
  const [succsessRegistr, setSuccsessRegistr] = useState(null);
  const [isEmailFocused, setIsEmailFocused] = useState();
  const [isPassFocused, setIsPassFocused] = useState();
  const [isPassCheckFocused, setIsPassCheckFocused] = useState();
  const [isRightEmail, setIsRightEmail] = useState(true);
  const [isRightPass, setIsRightPass] = useState(true);
  const [isRightPassCheck, setIsRightPassCheck] = useState(true);

  const swipeRef = useRef();

  useEffect(() => {
    swipeRef.current.addEventListener("swiped-down", () => {
      dispatch(hideRegForm());
    });
    return swipeRef.current.removeEventListener("swiped-down", () => {
      dispatch(hideRegForm());
    });
  }, [dispatch]);

  const createUser = () => {
    checkEmail();
    checkPass();
    try {
      console.log(trueEmail, truePass, email, pass);
      if (trueEmail && truePass && email !== "" && pass !== "") {
        console.log("true!");
        console.log(email, pass);

        fetch("/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail: email,
            password: pass,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              return res.json().then((error) => {
                throw new Error(error.error);
              });
            }
            setSuccsessRegistr(true);
            return res.json();
          })
          .catch((error) => {
            console.log("Error", error);
            setSuccsessRegistr(false);
          });
      }
    } catch (error) {
      console.log(error);
      console.log("something wrong");
    }
  };

  // --------------------

  let hidden = {};

  const checkEmail = () => {
    resultEmail = validateEmail(email);
    if (resultEmail) {
      setTrueEmail(true);
      setIsRightEmail(true);
    } else {
      console.log("wrong Email");
      setTrueEmail(false);
      setIsRightEmail(false);
      setSuccsessRegistr(false);
    }
  };

  const checkPass = () => {
    console.log(pass, passCheck);
    if (pass && passCheck && pass === passCheck) {
      setIsRightPass(true);
      setIsRightPassCheck(true);
      console.log("Your password is: " + pass);
      setTruePass(true);
    } else {
      console.log("wrong Pass");
      setIsRightPass(false);
      setIsRightPassCheck(false);
      setTruePass(false);
      setSuccsessRegistr(false);
    }
  };

  if (regState) {
    hidden.display = "none";
  }

  return (
    <div className={style.hidden_reg} style={hidden}>
      <div className={style.swipe_line_reg} ref={swipeRef}>
        <div className={style.swipe_line} id="swipe_line"></div>
      </div>
      <form action="" id="register_form">
        <div className={style.close_legend}>
          <div
            className={style.closeBtn}
            onClick={() => dispatch(hideRegForm())}
          >
            <img src="/imgs/close_btn.svg" alt="close" />
          </div>
          <legend>Регистрация</legend>
        </div>

        <label htmlFor="email" id="email_label"></label>
        <input
          type="email"
          name="email"
          id="email_reg"
          value={email}
          placeholder={isEmailFocused ? "" : "Электронная почта"}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            backgroundColor: isRightEmail ? "" : "#FFDEEC",
            border: isRightEmail ? "" : "#FF97C3 1px solid",
          }}
        />
        <span
          className={style.emali_plchold_reg}
          onFocus={() => setIsPassFocused(true)}
          onBlur={() => setIsPassFocused(false)}
          style={{
            display: isEmailFocused ? "" : "none",
          }}
        >
          Электронная почта
        </span>
        <span
          className={style.email_p}
          style={{
            display: isRightEmail ? "none" : "",
          }}
        >
          Адрес не валиден
        </span>
        <label htmlFor="password" id="pass_label"></label>
        <input
          type="password"
          name="password"
          id="password"
          value={pass}
          placeholder={isPassFocused ? "" : "Пароль"}
          onFocus={() => setIsPassFocused(true)}
          onBlur={() => setIsPassFocused(false)}
          onChange={(e) => setPass(e.target.value)}
          style={{
            backgroundColor: isRightPass ? "" : "#FFDEEC",
            border: isRightPass ? "" : "#FF97C3 1px solid",
          }}
        />
        <span
          className={style.pass_plchold_reg}
          onFocus={() => setIsPassFocused(true)}
          onBlur={() => setIsPassFocused(false)}
          style={{
            display: isPassFocused ? "" : "none",
          }}
        >
          Пароль
        </span>
        <span
          className={style.pass_p_reg}
          style={{
            display: isRightPass ? "none" : "",
          }}
        >
          Пароль не верный
        </span>
        <label htmlFor="password" id="passCheck_label"></label>
        <input
          type="password"
          name="passCheck"
          id="passCheck"
          value={passCheck}
          placeholder={isPassCheckFocused ? "" : "Потдверждение пароля"}
          onFocus={() => setIsPassCheckFocused(true)}
          onBlur={() => setIsPassCheckFocused(false)}
          onChange={(e) => setPassCheck(e.target.value)}
          style={{
            backgroundColor: isRightPassCheck ? "" : "#FFDEEC",
            border: isRightPassCheck ? "" : "#FF97C3 1px solid",
          }}
        />
        <span
          className={style.passCheck_plchold}
          onFocus={() => setIsPassCheckFocused(true)}
          onBlur={() => setIsPassCheckFocused(false)}
          style={{
            display: isPassCheckFocused ? "" : "none",
          }}
        >
          Подтверждение пароля
        </span>
        <span
          className={style.passCheck_p_reg}
          style={{
            display: isRightPassCheck ? "none" : "",
          }}
        >
          Пароль не верный
        </span>

        <button
          className={style.register_button}
          type="button"
          onClick={createUser}
        >
          Зарегестрироваться
        </button>
      </form>
      <div
        className={style.registrationTrue}
        style={{
          visibility:
            succsessRegistr !== null && succsessRegistr ? "visible" : "hidden",
        }}
      >
        <p>Успешная регистрация!</p>
      </div>
      <div
        className={style.registrationFalse}
        style={{
          visibility:
            succsessRegistr !== null && !succsessRegistr
              ? "visible"
              : "hidden",
        }}
      >
        <p>Если ошибок нет, то пользователь уже существует!</p>
      </div>
    </div>
  );
};

export default RegistrationForm;
