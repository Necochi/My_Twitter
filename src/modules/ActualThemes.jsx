import style from "../styles/ActualThemes.module.css";
const ActualThemes = () => {
  return (
    <div className={style.themes_div}>
      <h4>Актуальные темы</h4>
      <div className={style.themes}>
        <div className={style.theme}>
          <p>#javascript</p>
          <span>2 941 сообщение</span>
        </div>
        <div className={style.theme}>
          <p>#python3</p>
          <span>29 718 сообщений</span>
        </div>
        <div className={style.theme}>
          <p>#ruby</p>
          <span>958 186 сообщение</span>
        </div>
        <div className={style.theme}>
          <p>#как_научиться_коду?</p>
          <span>4 185 сообщение</span>
        </div>
        <div className={style.theme}>
          <p>#помогите_с_кодом</p>
          <span>482 сообщения</span>
        </div>
      </div>
    </div>
  );
};

export default ActualThemes;
