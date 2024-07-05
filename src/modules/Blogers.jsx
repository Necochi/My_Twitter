
import bloger1 from "../public/assets/imgs/bloger1.png"
import bloger2 from "../public/assets/imgs/bloger2.png"
import bloger3 from "../public/assets/imgs/bloger3.png"
import style from "../styles/Blogers.module.css";
const Blogers = () => {
  return (
    <div className={style.main_div}>
      <h4>Интересные блогеры</h4>
      <div className={style.blogers}>
        <div className={style.bloger}>
          <div className={style.name_img}>
            <img src={bloger1} alt="icon1" />
            <div className={style.name}>
              <p>Хабр Научпоп</p>
              <span>@habr_popsci</span>
            </div>
          </div>
          <a href="#">Читать</a>
        </div>
        <div className={style.bloger}>
          <div className={style.name_img}>
            <img src={bloger2} alt="icon2" />
            <div className={style.name}>
              <p>Матч ТВ</p>
              <span>@MatchTV</span>
            </div>
          </div>
          <a href="#">Читать</a>
        </div>
        <div className={style.bloger}>
          <div className={style.name_img}>
            <img src={bloger3} alt="icon3" />
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
