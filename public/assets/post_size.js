export default function postSize(msg) {
  const domens = [
    '.org',
    '.com',
    '.ru',
    '.net',
    '.xyz',
    '.info',
    '.de',
    '.cn',
    '.uk',
    '.fr',
  ];
  const protocols = ['http://', 'https://', 'www.'];
  let result = 0;
  const arr = [];
  const arrMsg = [];
  let count = 0;

  msg.split(' ').forEach((value) => {
    arrMsg.push(value);
  });

  msg.split(' ').forEach((value, index) => {
    count = 0;
    protocols.forEach((val, ind) => {
      if (value.startsWith(val)) {
        domens.forEach((v, i) => {
          if (!value.includes(v) && !arr.includes(value)
          && i === domens.length - 1 && count === 0) {
            arr.push(value);
            arrMsg[index] = '';
          } else if (value.includes(v)) {
            count += 1;
          }
        });
      } else if (!value.startsWith(val) && ind === protocols.length - 1) {
        domens.forEach((v, i) => {
          if (!value.includes(v) && !arr.includes(value)
          && i === domens.length - 1 && count === 0) {
            arr.push(value);
            arrMsg[index] = '';
          } else if (value.includes(v)) {
            count += 1;
          }
        });
      }
    });
  });

  arr.forEach((value) => {
    result += value.length;
  });

  arrMsg.forEach((value) => {
    if (value.endsWith(',') || value.endsWith('.')) {
      result += 1;
    }
  });

  result += arrMsg.length - 1;

  return result;
}
