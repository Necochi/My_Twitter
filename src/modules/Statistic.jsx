import style from "../styles/Statistic.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getStatistic } from "../store/slices/statisticSlice";
import { useEffect } from "react";
const Statistic = () => {
  const dispatch = useDispatch();
  const statistic = useSelector((state) => state.statistic);
  let usersRegistr;
  let writMessages;
  let writToday;
  useEffect(() => {
    dispatch(getStatistic());
  }, [dispatch]);
  if (statistic.isLoading) {
    usersRegistr = "";
    writMessages = "";
    writToday = "";
  } else {
    usersRegistr = statistic.data["usersRegistr"];
    writMessages = statistic.data["writMessages"];
    writToday = statistic.data["writToday"];
  }

  return (
    <div className={style.statistic}>
      <div className={style.block}>
        <div className={style.registers}>
          <p className={style.big_p}>{usersRegistr}</p>
          <p>Пользователей зарегестрировано</p>
        </div>
        <div className={style.msg}>
          <p className={style.big_p}>{writMessages}</p>
          <p>Сообщений написано</p>
        </div>
        <div className={style.today_msg}>
          <p className={style.big_p}>{writToday}</p>
          <p>Написано сегодня</p>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
