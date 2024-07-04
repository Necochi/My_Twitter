import { useDispatch, useSelector } from "react-redux";
import RegSignButtonsUp from "./modules/RegSignButtonsUp";
import LastMsgs from "./modules/LastMsgs";
import Statistic from "./modules/Statistic";
import RegSignButtonsDown from "./modules/RegSignButtonsDown";
import RegistrationForm from "./modules/RegistrationForm";
import AuthorizationForm from "./modules/AuthorizationForm";
import "./App.css";
import { hideRegForm } from "./store/slices/regFormSlice";
import { hideSignForm } from "./store/slices/signFormSlice";
import ActualThemes from "./modules/ActualThemes";
import Blogers from "./modules/Blogers";

const App = () => {
  const dispatch = useDispatch();
  const regState = useSelector((state) => state.regForm.isHidden);
  const signState = useSelector((state) => state.signForm.isHidden);
  let hidden = {};
  if (!regState || !signState) {
    document.body.classList.add("stop_scrolling");
  } else {
    document.body.classList.remove("stop_scrolling");
    hidden.display = "none";
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
        <LastMsgs />
        <div className="themes_blogers">
        <ActualThemes className="themes_module"/>
        <Blogers className="blogers_module"/>
        </div>
      </div>
      <RegSignButtonsDown />
      <RegistrationForm />
      <AuthorizationForm />
    </>
  );
};

export default App;
