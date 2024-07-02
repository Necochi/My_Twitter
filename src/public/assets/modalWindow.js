export default function modalWindow() {
  const swipeLineReg = document.querySelector('.swipe_line_reg');
  const swipeLineSign = document.querySelector('.swipe_line_sign');
  const modalReg = document.querySelector('.hidden_reg');
  const modalSign = document.querySelector('.hidden_sign');
  const blackBlock = document.querySelector('.black_block');
  const emailReg = document.getElementById('email_reg');
  const emailRegPlchld = document.querySelector('.emali_plchold_reg');
  const passwordReg = document.getElementById('password');
  const passwordRegPlchld = document.querySelector('.pass_plchold_reg');
  const passCheckReg = document.getElementById('passCheck');
  const passCheckRegPlchld = document.querySelector('.passCheck_plchold');
  const emailSign = document.getElementById('email_signIn');
  const emailSignPlchld = document.querySelector('.email_plchold_sign');
  const passCheckSign = document.getElementById('passCheck_signIn');
  const passCheckSignPlchld = document.querySelector('.pass_plchold_sign');
  const btnReg = document.querySelector('.reg_up');
  const btnSign = document.querySelector('.sign_up');
  const btnReg2 = document.querySelector('.reg_down');
  const btnSign2 = document.querySelector('.sign_down');

  // ----- Swipe Func ------

  swipeLineSign.addEventListener('swiped-down', () => {
    modalSign.classList.add('hidden');
    blackBlock.classList.add('hidden');
    document.body.classList.remove('stop_scrolling');
  });

  swipeLineReg.addEventListener('swiped-down', () => {
    modalReg.classList.add('hidden');
    blackBlock.classList.add('hidden');
    document.body.classList.remove('stop_scrolling');
  });

  // ---------------- Email Reg Event

  emailReg.addEventListener('focus', () => {
    emailReg.placeholder = '';
    emailRegPlchld.classList.remove('hidden');
  });

  emailReg.addEventListener('focusout', () => {
    emailReg.placeholder = 'Электронная почта';
    emailRegPlchld.classList.add('hidden');
  });

  // ---------------- Pass Reg Event

  passwordReg.addEventListener('focus', () => {
    passwordReg.placeholder = '';
    passwordRegPlchld.classList.remove('hidden');
  });

  passwordReg.addEventListener('focusout', () => {
    passwordReg.placeholder = 'Пароль';
    passwordRegPlchld.classList.add('hidden');
  });

  // ---------------- Pass Check Reg Event

  passCheckReg.addEventListener('focus', () => {
    passCheckReg.placeholder = '';
    passCheckRegPlchld.classList.remove('hidden');
  });

  passCheckReg.addEventListener('focusout', () => {
    passCheckReg.placeholder = 'Подтверждение пароля';
    passCheckRegPlchld.classList.add('hidden');
  });

  // ----------------- Email Sign Event

  emailSign.addEventListener('focus', () => {
    emailSign.placeholder = '';
    emailSignPlchld.classList.remove('hidden');
  });

  emailSign.addEventListener('focusout', () => {
    emailSign.placeholder = 'Электронная почта';
    emailSignPlchld.classList.add('hidden');
  });

  // ----------------- Pass Check Event

  passCheckSign.addEventListener('focus', () => {
    passCheckSign.placeholder = '';
    passCheckSignPlchld.classList.remove('hidden');
  });

  passCheckSign.addEventListener('focusout', () => {
    passCheckSign.placeholder = 'Подтверждение пароля';
    passCheckSignPlchld.classList.add('hidden');
  });

  // ------ Button Reg Event -----

  btnReg.addEventListener('click', () => {
    modalReg.classList.remove('hidden');
    blackBlock.classList.remove('hidden');
    document.body.classList.add('stop_scrolling');
  });

  btnSign.addEventListener('click', () => {
    modalSign.classList.remove('hidden');
    blackBlock.classList.remove('hidden');
    document.body.classList.add('stop_scrolling');
  });

  btnReg2.addEventListener('click', () => {
    modalReg.classList.remove('hidden');
    blackBlock.classList.remove('hidden');
    document.body.classList.add('stop_scrolling');
  });

  btnSign2.addEventListener('click', () => {
    modalSign.classList.remove('hidden');
    blackBlock.classList.remove('hidden');
    document.body.classList.add('stop_scrolling');
  });

  // ------ Black Block Event ------

  blackBlock.addEventListener('click', () => {
    document.body.classList.remove('stop_scrolling');
    modalReg.classList.add('hidden');
    modalSign.classList.add('hidden');
    blackBlock.classList.add('hidden');
  });
}
