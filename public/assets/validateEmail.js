export default function validateEmail(email) {
  const domens = [
    '.ru',
    '.com',
  ];
  let count = 0;
  let indexA = 0;
  let firstPart = '';
  let secondPart = '';
  let result;

  email.split('').forEach((val) => {
    if (val === '@') {
      count += 1;
    }
  });

  function isEmailBroken(part) {
    domens.forEach((val, ind) => {
      if (part.endsWith(val) && part.length > val.length) {
        result = true;
      } else if (part.endsWith(val) && ind === domens.length - 1) {
        result = false;
      }
    });
  }

  if (email.includes('@')) {
    indexA = email.indexOf('@');
    firstPart = email.slice(0, indexA);
    secondPart = email.slice(indexA + 1, email.length);
    isEmailBroken(secondPart);
    if (result === true && firstPart.length > 0 && count === 1) {
      result = true;
    } else {
      result = false;
    }
  } else {
    result = false;
  }
  return result;
}
