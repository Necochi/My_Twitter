
import style from "../styles/Blogers.module.css";
const Blogers = () => {
  return (
    <div className={style.main_div}>
      <h4>Интересные блогеры</h4>
      <div className={style.blogers}>
        <div className={style.bloger}>
          <div className={style.name_img}>
            <img src="/imgs/bloger1.png"alt="icon1" />
            <div className={style.name}>
              <p>Хабр Научпоп</p>
              <span>@habr_popsci</span>
            </div>
          </div>
          <a href="#">Читать</a>
        </div>
        <div className={style.bloger}>
          <div className={style.name_img}>
            <img src="/imgs/bloger2.png" alt="icon2" />
            <div className={style.name}>
              <p>Матч ТВ</p>
              <span>@MatchTV</span>
            </div>
          </div>
          <a href="#">Читать</a>
        </div>
        <div className={style.bloger}>
          <div className={style.name_img}>
            <img src="/imgs/bloger3.png" alt="icon3" />
            <div className={style.name}>
              <p>Популярная меха...</p>
              <span>@PopMechanica</span>
            </div>
          </div>
          <a href="#">Читать</a>
        </div>
      </div>
    </div>
  );
};

export default Blogers;
