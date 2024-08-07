import { useDispatch } from "react-redux";
import style from "../styles/RegSignButtonsUp.module.css";
import { showRegForm } from "../store/slices/regFormSlice.js";
import { showSignForm } from "../store/slices/signFormSlice.js";
const RegSignButtonsUp = () => {
  const dispatch = useDispatch();
  return (
    <div className={style.register_up}>
      <div className={style.logo__buttons}>
        <img
          className={style.icon}
          src="/imgs/dulphin.svg"
          alt="Dulphin icon"
        />
        <p>Оставайся на связи с друзьями, даже когда их нет рядом</p>
        <div className={style.buttons}>
          <button
            className={style.register}
            type="button"
            onClick={() => dispatch(showRegForm())}
          >
            Зарегестрироваться
          </button>
          <button
            className={style.sign_in}
            type="button"
            onClick={() => dispatch(showSignForm())}
          >
            Войти
          </button>
        </div>
      </div>
      <img
        className={style.img1}
        src="https://static.tildacdn.com/tild3837-6466-4162-b232-356330623436/toa-heftiba-x9I-6yoX.jpg"
        alt="Group of people"
      />
    </div>
  );
};

export default RegSignButtonsUp;
