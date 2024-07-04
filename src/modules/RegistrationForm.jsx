import validateEmail from "../public/assets/validateEmail";
import { useEffect, useRef, useState } from "react";
import style from "../styles/RegistrationForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { hideRegForm } from "../store/slices/regFormSlice";
const RegistrationForm = () => {
  const dispatch = useDispatch();
  const regState = useSelector((state) => state.regForm.isHidden);
  const [email, setEmail] = useState("");
  let resultEmal;
  const [pass, setPass] = useState("");
  const [passCheck, setPassCheck] = useState("");

  const swipeRef = useRef();
  const emailRef = useRef();
  const emailPlch = useRef();
  const emailPlchSpan = useRef();
  const passRef = useRef();
  const passPlch = useRef();
  const passlPlchSpan = useRef();
  const passCheckRef = useRef();
  const passChecklPlch = useRef();
  const passChecklPlchSpan = useRef();

  useEffect(() => {
    swipeRef.current.addEventListener("swiped-down", () => {
      dispatch(hideRegForm());
    });
    return swipeRef.current.removeEventListener("swiped-down", () => {
      dispatch(hideRegForm());
    });
  }, [dispatch]);

  useEffect(() => {
    emailPlch.current.addEventListener("focus", () => {
      emailPlch.current.placeholder = "";
      emailPlchSpan.current.style.display = "";
    });
    emailPlch.current.addEventListener("focusout", () => {
      emailPlch.current.placeholder = "Электронная почта";
      emailPlchSpan.current.style.display = "none";
    });
    return () => {
      emailPlch.current.removeEventListener("focus", () => {
        emailPlch.current.placeholder = "";
        emailPlchSpan.current.style.display = "";
      });
      emailPlch.current.removeEventListener("focusout", () => {
        emailPlch.current.placeholder = "Электронная почта";
        emailPlchSpan.current.style.display = "none";
      });
    };
  }, [emailPlch]);

  useEffect(() => {
    passPlch.current.addEventListener("focus", () => {
      passPlch.current.placeholder = "";
      passlPlchSpan.current.style.display = "";
    });
    passPlch.current.addEventListener("focusout", () => {
      passPlch.current.placeholder = "Пароль";
      passlPlchSpan.current.style.display = "none";
    });
    return () => {
      passPlch.current.removeEventListener("focus", () => {
        passPlch.current.placeholder = "";
        passlPlchSpan.current.style.display = "";
      });
      passPlch.current.removeEventListener("focusout", () => {
        passPlch.current.placeholder = "Пароль";
        passlPlchSpan.current.style.display = "none";
      });
    };
  }, [passPlch]);

  useEffect(() => {
    passChecklPlch.current.addEventListener("focus", () => {
      passChecklPlch.current.placeholder = "";
      passChecklPlchSpan.current.style.display = "";
    });
    passChecklPlch.current.addEventListener("focusout", () => {
      passChecklPlch.current.placeholder = "Подтверждение пароля";
      passChecklPlchSpan.current.style.display = "none";
    });
    return () => {
      passChecklPlch.current.removeEventListener("focus", () => {
        passChecklPlch.current.placeholder = "";
        passChecklPlchSpan.current.style.display = "";
      });
      passChecklPlch.current.removeEventListener("focusout", () => {
        passChecklPlch.current.placeholder = "Подтверждение пароля";
        passChecklPlchSpan.current.style.display = "none";
      });
    };
  }, [passChecklPlch]);

  // --------------------

  const wrongInput = {
    display: "",
    border: "#FF97C3 1px solid",
    backgroundColor: "#FFDEEC",
  };
  let hidden = {};
  let hiddenWrong = {
    display: "none",
  };

  const checkEmail = () => {
    resultEmal = validateEmail(email);
    if (resultEmal) {
      emailRef.current.style.display = "none";
      emailPlch.current.style.backgroundColor = "";
      emailPlch.current.style.border = "";
      console.log(resultEmal);
    } else {
      console.log("else");
      emailRef.current.style.display = "";
      emailPlch.current.style.backgroundColor = "#FFDEEC";
      emailPlch.current.style.border = "#FF97C3 1px solid";
    }
  };

  const checkPass = () => {
    if (pass && passCheck) {
      if (pass == passCheck) {
        passRef.current.style.display = "none";
        passPlch.current.style.backgroundColor = "";
        passPlch.current.style.border = "";
        passCheckRef.current.style.display = "none";
        passChecklPlch.current.style.backgroundColor = "";
        passChecklPlch.current.style.border = "";
        console.log("Your password is: " + pass);
      }
    } else {
      passRef.current.style.display = "";
      passPlch.current.style.backgroundColor = "#FFDEEC";
      passPlch.current.style.border = "#FF97C3 1px solid";
      passCheckRef.current.style.display = "";
      passChecklPlch.current.style.backgroundColor = "#FFDEEC";
      passChecklPlch.current.style.border = "#FF97C3 1px solid";
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
            <img src="src/public/assets/imgs/closeBtn.svg" alt="close" />
          </div>
          <legend>Регистрация</legend>
        </div>

        <label htmlFor="email" id="email_label"></label>
        <input
          type="email"
          name="email"
          id="email_reg"
          placeholder="Электронная почта"
          ref={emailPlch}
          style={hidden}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span
          className={style.emali_plchold_reg}
          ref={emailPlchSpan}
          style={hiddenWrong}
        >
          Электронная почта
        </span>
        <span className={style.email_p} style={hiddenWrong} ref={emailRef}>
          Адрес не валиден
        </span>
        <label htmlFor="password" id="pass_label"></label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          ref={passPlch}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <span
          className={style.pass_plchold_reg}
          ref={passlPlchSpan}
          style={hiddenWrong}
        >
          Пароль
        </span>
        <span className={style.pass_p_reg} style={hiddenWrong} ref={passRef}>
          Пароль не верный
        </span>
        <label htmlFor="password" id="passCheck_label"></label>
        <input
          type="password"
          name="passCheck"
          id="passCheck"
          placeholder="Потдверждение пароля"
          ref={passChecklPlch}
          value={passCheck}
          onChange={(e) => setPassCheck(e.target.value)}
        />
        <span
          className={style.passCheck_plchold}
          style={hiddenWrong}
          ref={passChecklPlchSpan}
        >
          Подтверждение пароля
        </span>
        <span
          className={style.passCheck_p_reg}
          style={hiddenWrong}
          ref={passCheckRef}
        >
          Пароль не верный
        </span>

        <button
          className={style.register_button}
          type="button"
          onClick={() => {
            checkEmail(), checkPass();
          }}
        >
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
