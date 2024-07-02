import style from '../styles/PreloadLastMsgs.module.css'
const PreloadLastMsgs = () => {
  return (
    <div className={style.preload_div}>
        <div className={style.msgs_div}>
          <div className={style.msg_div}>
            <div className={style.icon_name_pre}>
              <div className={style.icon_div}></div>
              <div className={style.preload_nick_name}>
                <div className={style.pre_nickname}></div>
                <div className={style.pre_name}></div>
              </div>
            </div>
            <div className={style.pre_text}>
              <div className={style.pre1}></div>
              <div className={style.pre2}></div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default PreloadLastMsgs;
