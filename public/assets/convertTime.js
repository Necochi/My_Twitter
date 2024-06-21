export default function convertTime(postDate, currentDate) {
  const time = Number(postDate) - Number(currentDate);
  let minutes = Number(String(time).slice(1, String(time).length - 3)) / 60;
  let result;
  let stringTime;
  let stringTimeTwoLast;
  let numberSTimeEnd;
  let numberStringTwoLast;

  function makingVar() {
    stringTime = String(minutes);
    stringTimeTwoLast = stringTime.slice(stringTime.length - 2, stringTime.length);
    numberSTimeEnd = Number(stringTime[stringTime.length - 1]);
    numberStringTwoLast = Number(stringTimeTwoLast);
  }

  if (minutes >= 525600) {
    minutes = Math.round(minutes / (60 * 24 * 365));
    makingVar();
    if (stringTime.length === 1) {
      if (minutes === 1) {
        result = `${minutes} год назад`;
      } else if (minutes >= 2 && minutes < 5) {
        result = `${minutes} года назад`;
      } else if (minutes >= 5) {
        result = `${minutes} лет назад`;
      }
    } else if (stringTime.length >= 2) {
      if (numberStringTwoLast < 21) {
        if (minutes === 1) {
          result = `${minutes} год назад`;
        } else if (minutes >= 2 && minutes < 5) {
          result = `${minutes} года назад`;
        } else if (minutes >= 5) {
          result = `${minutes} лет назад`;
        }
      } else if (numberStringTwoLast > 20) {
        if (numberSTimeEnd === 1) {
          result = `${minutes} год назад`;
        } else if (numberSTimeEnd > 1
        && numberSTimeEnd < 5) {
          result = `${minutes} года назад`;
        } else if (numberSTimeEnd >= 5) {
          result = `${minutes} лет назад`;
        }
      }
    }
  } else if (minutes >= 1440 && minutes < 525600) {
    minutes = Math.round(minutes / (60 * 24));
    makingVar();
    if (stringTime.length === 1) {
      if (minutes === 1) {
        result = `${minutes} день назад`;
      } else if (minutes >= 2 && minutes < 5) {
        result = `${minutes} дня назад`;
      } else if (minutes >= 5) {
        result = `${minutes} дней назад`;
      }
    } else if (stringTime.length >= 2) {
      if (numberStringTwoLast < 21) {
        if (minutes === 1) {
          result = `${minutes} день назад`;
        } else if (minutes >= 2 && minutes < 5) {
          result = `${minutes} дня назад`;
        } else if (minutes >= 5) {
          result = `${minutes} дней назад`;
        }
      } else if (numberStringTwoLast > 20) {
        if (numberSTimeEnd === 1) {
          result = `${minutes} день назад`;
        } else if (numberSTimeEnd > 1
        && numberSTimeEnd < 5) {
          result = `${minutes} дня назад`;
        } else if (numberSTimeEnd >= 5) {
          result = `${minutes} дней назад`;
        }
      }
    }
  } else if (minutes >= 61 && minutes < 1440) {
    minutes = Math.round(minutes / 60);
    makingVar();
    if (stringTime.length === 1) {
      if (minutes === 1) {
        result = `${minutes} час назад`;
      } else if (minutes > 1 && minutes < 5) {
        result = `${minutes} часа назад`;
      } else if (minutes >= 5) {
        result = `${minutes} часов назад`;
      }
    } else if (stringTime.length >= 2) {
      if (numberStringTwoLast < 21) {
        if (minutes === 1) {
          result = `${minutes} час назад`;
        } else if (minutes >= 2 && minutes < 5) {
          result = `${minutes} часа назад`;
        } else if (minutes >= 5) {
          result = `${minutes} часов назад`;
        }
      } else if (numberStringTwoLast > 20) {
        if (numberSTimeEnd === 1) {
          result = `${minutes} час назад`;
        } else if (numberSTimeEnd > 1
        && numberSTimeEnd < 5) {
          result = `${minutes} часа назад`;
        }
      }
    }
  } else if (minutes < 61) {
    minutes = Math.round(minutes);
    makingVar();
    if (stringTime.length === 1) {
      if (minutes === 1) {
        result = `${minutes} минуту назад`;
      } else if (minutes >= 2 && minutes < 5) {
        result = `${minutes} минуты назад`;
      } else if (minutes >= 5) {
        result = `${minutes} минут назад`;
      }
    } else if (stringTime.length >= 2) {
      if (numberStringTwoLast < 21) {
        if (minutes === 1) {
          result = `${minutes} минуту назад`;
        } else if (minutes >= 2 && minutes < 5) {
          result = `${minutes} минуты назад`;
        } else if (minutes >= 5) {
          result = `${minutes} минут назад`;
        }
      } else if (numberStringTwoLast > 20) {
        if (numberSTimeEnd === 1) {
          result = `${minutes} минуту назад`;
        } else if (numberSTimeEnd > 1
        && numberSTimeEnd < 5) {
          result = `${minutes} минуты назад`;
        } else if (numberSTimeEnd === 0
          || numberSTimeEnd >= 5) {
          result = `${minutes} минут назад`;
        }
      }
    }
  }

  return result;
}
