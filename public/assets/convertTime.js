export default function convertTime(minutes) {
  let time;
  let result;
  let stringTime;
  let stringTimeTwoLast;
  let numberSTimeEnd;
  let numberStringTwoLast;

  function makingVar() {
    stringTime = String(time);
    stringTimeTwoLast = stringTime.slice(stringTime.length - 2, stringTime.length);
    numberSTimeEnd = Number(stringTime[stringTime.length - 1]);
    numberStringTwoLast = Number(stringTimeTwoLast);
  }

  if (minutes >= 525600) {
    time = Math.round(minutes / (60 * 24 * 365));
    makingVar();
    if (stringTime.length === 1) {
      if (time === 1) {
        result = `${time} год назад`;
      } else if (time >= 2 && time < 5) {
        result = `${time} года назад`;
      } else if (time >= 5) {
        result = `${time} лет назад`;
      }
    } else if (stringTime.length >= 2) {
      if (numberStringTwoLast < 21) {
        if (time === 1) {
          result = `${time} год назад`;
        } else if (time >= 2 && time < 5) {
          result = `${time} года назад`;
        } else if (time >= 5) {
          result = `${time} лет назад`;
        }
      } else if (numberStringTwoLast > 20) {
        if (numberSTimeEnd === 1) {
          result = `${time} год назад`;
        } else if (numberSTimeEnd > 1
        && numberSTimeEnd < 5) {
          result = `${time} года назад`;
        } else if (numberSTimeEnd >= 5) {
          result = `${time} лет назад`;
        }
      }
    }
  } else if (minutes >= 1440 && minutes < 525600) {
    time = Math.round(minutes / (60 * 24));
    makingVar();
    if (stringTime.length === 1) {
      if (time === 1) {
        result = `${time} день назад`;
      } else if (time >= 2 && time < 5) {
        result = `${time} дня назад`;
      } else if (time >= 5) {
        result = `${time} дней назад`;
      }
    } else if (stringTime.length >= 2) {
      if (numberStringTwoLast < 21) {
        if (time === 1) {
          result = `${time} день назад`;
        } else if (time >= 2 && time < 5) {
          result = `${time} дня назад`;
        } else if (time >= 5) {
          result = `${time} дней назад`;
        }
      } else if (numberStringTwoLast > 20) {
        if (numberSTimeEnd === 1) {
          result = `${time} день назад`;
        } else if (numberSTimeEnd > 1
        && numberSTimeEnd < 5) {
          result = `${time} дня назад`;
        } else if (numberSTimeEnd >= 5) {
          result = `${time} дней назад`;
        }
      }
    }
  } else if (minutes >= 61 && minutes < 1440) {
    time = Math.round(minutes / 60);
    makingVar();
    if (stringTime.length === 1) {
      if (time === 1) {
        result = `${time} час назад`;
      } else if (time > 1 && time < 5) {
        result = `${time} часа назад`;
      } else if (time >= 5) {
        result = `${time} часов назад`;
      }
    } else if (stringTime.length >= 2) {
      if (numberStringTwoLast < 21) {
        if (time === 1) {
          result = `${time} час назад`;
        } else if (time >= 2 && time < 5) {
          result = `${time} часа назад`;
        } else if (time >= 5) {
          result = `${time} часов назад`;
        }
      } else if (numberStringTwoLast > 20) {
        if (numberSTimeEnd === 1) {
          result = `${time} час назад`;
        } else if (numberSTimeEnd > 1
        && numberSTimeEnd < 5) {
          result = `${time} часа назад`;
        }
      }
    }
  } else if (minutes < 61) {
    time = minutes;
    makingVar();
    if (stringTime.length === 1) {
      if (time === 1) {
        result = `${time} минуту назад`;
      } else if (time >= 2 && time < 5) {
        result = `${time} минуты назад`;
      } else if (time >= 5) {
        result = `${time} минут назад`;
      }
    } else if (stringTime.length >= 2) {
      if (numberStringTwoLast < 21) {
        if (time === 1) {
          result = `${time} минуту назад`;
        } else if (time >= 2 && time < 5) {
          result = `${time} минуты назад`;
        } else if (time >= 5) {
          result = `${time} минут назад`;
        }
      } else if (numberStringTwoLast > 20) {
        if (numberSTimeEnd === 1) {
          result = `${time} минуту назад`;
        } else if (numberSTimeEnd > 1
        && numberSTimeEnd < 5) {
          result = `${time} минуты назад`;
        } else if (numberSTimeEnd === 0
          || numberSTimeEnd >= 5) {
          result = `${time} минут назад`;
        }
      }
    }
  }

  return result;
}
