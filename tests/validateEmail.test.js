import { assert } from 'chai';
import validateEmail from '../src/assets/validateEmail.js';

describe('Функция валидации почты', function () {
  it('Валидный простой имейл', function () {
    const expectedResult = true;
    const result = validateEmail('example@example.com');
    assert.equal(expectedResult, result);
  });

  it('Почта без @', function () {
    const expectedResult = false;
    const result = validateEmail('example.com');
    assert.equal(expectedResult, result);
  });

  it('Почта без слов перед доменом электронного адреса', function () {
    const expectedResult = false;
    const result = validateEmail('example@.com');
    assert.equal(expectedResult, result);
  });

  it('Парвильная почта с доп. парметрами', function () {
    const expectedResult = true;
    const result = validateEmail('example.name@example.com');
    assert.equal(expectedResult, result);
  });

  it('Домен без точки', function () {
    const expectedResult = false;
    const result = validateEmail('example@com');
    assert.equal(expectedResult, result);
  });

  it('Почат без домена', function () {
    const expectedResult = false;
    const result = validateEmail('example@');
    assert.equal(expectedResult, result);
  });

  it('Просто слово', function () {
    const expectedResult = false;
    const result = validateEmail('example');
    assert.equal(expectedResult, result);
  });

  it('Два @ в почте', function () {
    const expectedResult = false;
    const result = validateEmail('example.something@@mail.ru');
    assert.equal(expectedResult, result);
  });
});
