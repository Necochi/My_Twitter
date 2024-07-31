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
  let resultEmal;
  const [pass, setPass] = useState("");
  const [truePass, setTruePass] = useState(false);
  const [passCheck, setPassCheck] = useState("");
  const [succsessRegistr, setSuccsessRegistr] = useState();

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
  const sendBtn = useRef();
  const registrTrue = useRef();
  const registrFalse = useRef();


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

  useEffect(() => {
    sendBtn.current.addEventListener("click", createUser);
    return () => {
      sendBtn.current.removeEventListener("click", createUser);
    };
  }, [sendBtn, pass, email, trueEmail, truePass, succsessRegistr]);

  useEffect(() => {
    if (succsessRegistr) {
      registrTrue.current.style.visibility = 'visible';
      registrFalse.current.style.visibility = 'hidden';
    }
    else if (succsessRegistr === false) {
      registrFalse.current.style.visibility = 'visible';
      registrTrue.current.style.visibility = 'hidden';
    }
  }, [succsessRegistr])

  const createUser = () => {
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
            setSuccsessRegistr(false)
          });
        }
    } catch (error) {
      console.log(error);
      console.log("something wrong");
    }
  };

  // --------------------

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
      setTrueEmail(true);
    } else {
      console.log("wrong Email");
      emailRef.current.style.display = "";
      emailPlch.current.style.backgroundColor = "#FFDEEC";
      emailPlch.current.style.border = "#FF97C3 1px solid";
      setTrueEmail(false);
      setSuccsessRegistr(false);
    }
  };

  const checkPass = () => {
    console.log(pass, passCheck);
    if ((pass && passCheck) && (pass === passCheck)) {
      passRef.current.style.display = "none";
      passPlch.current.style.backgroundColor = "";
      passPlch.current.style.border = "";
      passCheckRef.current.style.display = "none";
      passChecklPlch.current.style.backgroundColor = "";
      passChecklPlch.current.style.border = "";
      console.log("Your password is: " + pass);
      setTruePass(true);
    } else {
      passRef.current.style.display = "";
      passPlch.current.style.backgroundColor = "#FFDEEC";
      passPlch.current.style.border = "#FF97C3 1px solid";
      passCheckRef.current.style.display = "";
      passChecklPlch.current.style.backgroundColor = "#FFDEEC";
      passChecklPlch.current.style.border = "#FF97C3 1px solid";
      console.log("wrong Pass");
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
          ref={sendBtn}
          className={style.register_button}
          type="button"
          onClick={() => {
            checkEmail();
            checkPass();
          }}
        >
          Зарегестрироваться
        </button>
      </form>
      <div
      ref={registrTrue}
      className={style.registrationTrue}>
        <p>Успешная регистрация!</p>
      </div>
      <div
      ref={registrFalse}
      className={style.registrationFalse}>
        <p>Если ошибок нет, то пользователь уже существует</p>
      </div>
    </div>
  );
};

export default RegistrationForm;
