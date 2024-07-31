export default function validateEmail(email) {
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
    if (part.length > 1 && part.includes('.') && part[0] !== '.') {
      result = true;
    } else if (part.length < 2) {
      result = false;
    }
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
