export default function convertDate(date) {
  let timeArr = [];
  let convertedTime;
  let aTime = '';

  date.split('').forEach((v, i) => {
    if (!Number.isNaN(Number(v)) && v !== ' ' && i !== date.length - 1) {
      aTime += v;
    } else if (i === date.length - 1) {
      aTime += v;
      timeArr.push(Number(aTime));
      timeArr[1] -= 1;
      convertedTime = new Date(
        timeArr[2],
        timeArr[1],
        timeArr[0],
        timeArr[3],
        timeArr[4],
      );
      aTime = '';
      timeArr = [];
    } else if (aTime.length < 2) {
      aTime = `0${aTime}`;
      timeArr.push(Number(aTime));
      aTime = '';
    } else {
      timeArr.push(Number(aTime));
      aTime = '';
    }
  });
  return convertedTime;
}
