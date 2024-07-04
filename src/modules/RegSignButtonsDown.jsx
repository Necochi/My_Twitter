import { useDispatch, useSelector } from "react-redux";
import style from "../styles/RegSignButtonsDown.module.css";
import { showRegForm } from "../store/slices/regFormSlice";
import { showSignForm } from "../store/slices/signFormSlice";
const RegSignButtonsDown = () => {
  const dispatch = useDispatch();
  const regState = useSelector((state) => state.regForm.isHidden);
  const signState = useSelector((state) => state.signForm.isHidden);
  let newColor = {};

  if (!regState || !signState) {
    newColor = {
      background: "linear-gradient(#00000000, #626262)",
    };
  }

  return (
    <>
      <div className={style.blur_div}
      style={newColor}></div>
      <div className={style.register_up}>
        <p>Зарегистрируйтесь и узнайте обо всём первым</p>
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
    </>
  );
};

export default RegSignButtonsDown;
