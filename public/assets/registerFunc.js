import validateEmail from './validateEmail.js';

export default function registration() {
  const regBtn = document.querySelector('.register_button');

  regBtn.addEventListener('click', () => {
    const userEmail = document.querySelector('#email_reg');
    const validation = validateEmail(userEmail.value);
    const emailWrong = document.querySelector('.email_p');
    const userPassReg = document.querySelector('#password');
    const userPassRegCheck = document.querySelector('#passCheck');
    const wrongPass = document.querySelector('.pass_p_reg');
    const wrongPassCheck = document.querySelector('.passCheck_p_reg');

    if (validation) {
      emailWrong.classList.add('hidden');
      userEmail.classList.remove('wrong_border');
      console.log(userEmail.value);
    } else if (!validation) {
      console.log('wrong email');
      emailWrong.classList.remove('hidden');
      userEmail.classList.add('wrong_border');
    }

    if (userPassReg.value === userPassRegCheck.value
      && ((userPassReg.value !== '' || userPassRegCheck.value !== ''))) {
      userPassReg.classList.remove('wrong_border');
      userPassRegCheck.classList.remove('wrong_border');
      wrongPass.classList.add('hidden');
      wrongPassCheck.classList.add('hidden');
      console.log(userPassReg.value);
      console.log(userPassRegCheck.value);
    } else {
      userPassRegCheck.classList.add('wrong_border');
      userPassReg.classList.add('wrong_border');
      wrongPass.classList.remove('hidden');
      wrongPassCheck.classList.remove('hidden');
      console.log('wrong pass or passCheck');
    }
  });
}
